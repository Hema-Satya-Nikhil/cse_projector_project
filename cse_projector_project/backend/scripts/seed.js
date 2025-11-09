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

    // Create projectors
    const projectors = await Projector.create([
      {
        name: 'Epson EB-X05',
        brand: 'Epson',
        model: 'EB-X05',
        serialNumber: 'EPS-001-2024',
        status: 'available',
        location: 'CSE Department Store',
        specifications: {
          resolution: '1024 x 768 (XGA)',
          brightness: '3300 lumens',
          connectivity: ['HDMI', 'VGA', 'USB']
        }
      },
      {
        name: 'BenQ MH535A',
        brand: 'BenQ',
        model: 'MH535A',
        serialNumber: 'BNQ-002-2024',
        status: 'available',
        location: 'CSE Department Store',
        specifications: {
          resolution: '1920 x 1080 (Full HD)',
          brightness: '3600 lumens',
          connectivity: ['HDMI', 'VGA', 'USB', 'Wireless']
        }
      },
      {
        name: 'Sony VPL-DX221',
        brand: 'Sony',
        model: 'VPL-DX221',
        serialNumber: 'SNY-003-2024',
        status: 'checked-out',
        currentUser: users[1]._id,
        checkedOutAt: new Date(),
        location: 'Room 301',
        specifications: {
          resolution: '1024 x 768 (XGA)',
          brightness: '2800 lumens',
          connectivity: ['HDMI', 'VGA']
        }
      },
      {
        name: 'ViewSonic PA503S',
        brand: 'ViewSonic',
        model: 'PA503S',
        serialNumber: 'VWS-004-2024',
        status: 'available',
        lastUsedBy: users[2]._id,
        lastUsedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        location: 'CSE Department Store',
        specifications: {
          resolution: '800 x 600 (SVGA)',
          brightness: '3600 lumens',
          connectivity: ['HDMI', 'VGA', 'USB']
        }
      }
    ]);
    console.log('✅ Created projectors');

    // Create sample activities
    await Activity.create([
      {
        user: users[0]._id,
        projector: projectors[0]._id,
        action: 'created',
        notes: 'Added Epson EB-X05 to inventory'
      },
      {
        user: users[0]._id,
        projector: projectors[1]._id,
        action: 'created',
        notes: 'Added BenQ MH535A to inventory'
      },
      {
        user: users[2]._id,
        projector: projectors[3]._id,
        action: 'check-out',
        notes: 'Checked out for Data Structures lecture'
      },
      {
        user: users[2]._id,
        projector: projectors[3]._id,
        action: 'check-in',
        notes: 'Returned after lecture'
      },
      {
        user: users[1]._id,
        projector: projectors[2]._id,
        action: 'check-out',
        notes: 'Checked out for Database Management Systems lab'
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
