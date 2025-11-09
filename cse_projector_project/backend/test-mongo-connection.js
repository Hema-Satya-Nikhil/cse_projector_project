// MongoDB Connection Test Script
// Run this with: node test-mongo-connection.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const testConnection = async () => {
  console.log('\n🔍 Testing MongoDB Connection...\n');
  console.log('Connection String:', process.env.MONGODB_URI ? 
    process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@') : 
    'NOT FOUND IN .env');
  console.log('');

  try {
    // Attempt to connect
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
    });

    console.log('✅ SUCCESS! MongoDB Connected\n');
    console.log('Host:', conn.connection.host);
    console.log('Database:', conn.connection.name);
    console.log('Port:', conn.connection.port);
    console.log('Connection State:', conn.connection.readyState === 1 ? 'Connected' : 'Disconnected');
    console.log('\n📊 Collections in database:');
    
    const collections = await conn.connection.db.listCollections().toArray();
    if (collections.length === 0) {
      console.log('  (No collections yet - database is empty)');
    } else {
      collections.forEach(col => {
        console.log(`  - ${col.name}`);
      });
    }

    // Close connection
    await mongoose.connection.close();
    console.log('\n✅ Connection test completed successfully!');
    console.log('\nYour MongoDB is ready to use! 🎉\n');
    process.exit(0);

  } catch (error) {
    console.log('❌ CONNECTION FAILED!\n');
    console.log('Error:', error.message);
    console.log('\n🔧 Troubleshooting Steps:\n');
    
    if (error.message.includes('bad auth')) {
      console.log('  1. Check your database password in .env file');
      console.log('  2. Make sure to replace <db_password> with your actual password');
      console.log('  3. Password should not contain < or > characters');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('timeout')) {
      console.log('  1. Check your internet connection');
      console.log('  2. Verify the MongoDB connection string');
      console.log('  3. For Atlas: Check IP whitelist in Network Access');
    } else if (error.message.includes('MONGODB_URI')) {
      console.log('  1. Make sure .env file exists in backend folder');
      console.log('  2. Add MONGODB_URI to .env file');
      console.log('  3. Example: MONGODB_URI=mongodb://localhost:27017/cse_projector_db');
    } else {
      console.log('  1. Check if MongoDB is running (for local installation)');
      console.log('  2. Verify your connection string in .env file');
      console.log('  3. See MONGODB_SETUP_GUIDE.md for detailed help');
    }
    
    console.log('\n');
    process.exit(1);
  }
};

testConnection();
