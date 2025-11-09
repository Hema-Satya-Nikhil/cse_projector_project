import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '../config/database.js';
import User from '../models/User.model.js';
import OtpToken from '../models/OtpToken.model.js';

dotenv.config();

const [, , rawEmail, ...flags] = process.argv;

if (!rawEmail) {
  console.error('Usage: node scripts/send-test-verification.js <email> [--otp]');
  process.exit(1);
}

const useOtp = flags.includes('--otp');
const normalizeEmail = (email) => email.toLowerCase().trim();

const frontendBaseUrl = () =>
  (process.env.APP_BASE_URL || process.env.CORS_ORIGIN || `http://localhost:${process.env.PORT || 5000}`).replace(/\/$/, '');

const generateVerificationToken = (userId) =>
  jwt.sign({ id: userId, type: 'verify' }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_VERIFY_EXPIRE || '1d',
  });

const generateOtpCode = () => Math.floor(100000 + Math.random() * 900000).toString();

(async () => {
  try {
    await connectDB();

    const email = normalizeEmail(rawEmail);
    const user = await User.findOne({ email });

    if (!user) {
      console.error(`User not found for email: ${email}`);
      process.exit(1);
    }

    if (!useOtp) {
      const token = generateVerificationToken(user._id);
      const verificationUrl = `${frontendBaseUrl()}/verify-email?token=${token}`;

      console.log('--- Verification Link Preview ---');
      console.log('User:       ', user.name || user.email);
      console.log('Email:      ', user.email);
      console.log('Expires In: ', process.env.JWT_VERIFY_EXPIRE || '1d');
      console.log('URL:        ', verificationUrl);
    } else {
      const otp = generateOtpCode();
      const otpHash = await bcrypt.hash(otp, 10);
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await OtpToken.findOneAndUpdate(
        { email, type: 'verify' },
        {
          email,
          type: 'verify',
          otpHash,
          attempts: 0,
          verified: false,
          expiresAt,
        },
        { upsert: true, new: true }
      );

      console.log('--- Verification OTP Preview ---');
      console.log('User:       ', user.name || user.email);
      console.log('Email:      ', user.email);
      console.log('OTP:        ', otp);
      console.log('Expires At: ', expiresAt.toISOString());
    }

    process.exit(0);
  } catch (error) {
    console.error('Failed to generate verification payload:', error.message);
    process.exit(1);
  }
})();
