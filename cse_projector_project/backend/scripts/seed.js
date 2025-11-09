import mongoose from 'mongoose';
import dotenv from 'dotenv';
import crypto from 'crypto';
import User from '../models/User.model.js';
import Projector from '../models/Projector.model.js';
import Activity from '../models/Activity.model.js';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing data
    await User.deleteMany({});
    await Projector.deleteMany({});
    await Activity.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create users
    const users = await User.create([
      {
        name: 'Dr. Satya Nikhil',
        email: 'nikhil@cse.edu',
        password: crypto.randomBytes(12).toString('base64url'),
        role: 'admin',
        designation: 'Professor & Developer',
        department: 'Computer Science and Engineering'
      },
      {
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh@cse.edu',
        password: crypto.randomBytes(12).toString('base64url'),
        role: 'faculty',
        designation: 'Associate Professor',
        department: 'Computer Science and Engineering'
      },
      {
        name: 'Dr. Priya Sharma',
        email: 'priya@cse.edu',
        password: crypto.randomBytes(12).toString('base64url'),
        role: 'faculty',
        designation: 'Assistant Professor',
        department: 'Computer Science and Engineering'
      },
      {
        name: 'Dr. Arun Verma',
        email: 'arun@cse.edu',
        password: crypto.randomBytes(12).toString('base64url'),
        role: 'faculty',
        designation: 'Professor',
        department: 'Computer Science and Engineering'
      }
    ]);
    console.log('✅ Created users');

    // Create projectors (EPSON and WZATCO - Real CSE Department Projectors)
    const projectors = await Projector.create([
      {
        name: 'EPSON Projector',
        brand: 'EPSON',
        model: 'EB-X05',
        serialNumber: 'EPSON-CSE-001',
        status: 'available',
        location: 'CSE Department Store Room',
        specifications: {
          resolution: '1024 x 768 (XGA)',
          brightness: '3300 lumens',
          connectivity: ['HDMI', 'VGA', 'USB']
        }
      },
      {
        name: 'WZATCO Projector',
        brand: 'WZATCO',
        model: 'T6',
        serialNumber: 'WZATCO-CSE-002',
        status: 'available',
        location: 'CSE Department Store Room',
        specifications: {
          resolution: '1920 x 1080 (Full HD)',
          brightness: '7500 lumens',
          connectivity: ['HDMI', 'VGA', 'USB', 'WiFi', 'Bluetooth']
        }
      }
    ]);
    console.log('✅ Created projectors (EPSON & WZATCO)');

    // Create sample activities
    await Activity.create([
      {
        user: users[0]._id,
        projector: projectors[0]._id,
        action: 'created',
        notes: 'Added EPSON Projector to CSE Department inventory'
      },
      {
        user: users[0]._id,
        projector: projectors[1]._id,
        action: 'created',
        notes: 'Added WZATCO Projector to CSE Department inventory'
      }
    ]);
    console.log('✅ Created activities');

  console.log('\n🎉 Database seeded successfully!');
  console.log('\n� Demo login credentials have been removed.');
  console.log('Use the email OTP flow to authenticate seeded accounts or create new verified users.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
