import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import OtpToken from "../models/OtpToken.model.js";
import * as emailService from "../services/email.service.js";

const VERIFY_TOKEN_EXPIRY = process.env.JWT_VERIFY_EXPIRE || "1d";
const RESEND_LIMIT_PER_HOUR = parseInt(process.env.VERIFICATION_RESEND_LIMIT || "3", 10);
const OTP_EXPIRY_MS = 10 * 60 * 1000;
const isProduction = process.env.NODE_ENV === "production";
const devAutoVerify = process.env.NODE_ENV === "development" && process.env.DEV_AUTO_VERIFY === "true";

/* --------------------------- Helper Utilities --------------------------- */
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });

const generateVerificationToken = (userId) =>
  jwt.sign({ id: userId, type: "verify" }, process.env.JWT_SECRET, {
    expiresIn: VERIFY_TOKEN_EXPIRY,
  });

const generateOtpCode = () => Math.floor(100000 + Math.random() * 900000).toString();

const generateRandomString = (length = 10) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789@#$";
  let output = "";
  for (let i = 0; i < length; i += 1) {
    output += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return output;
};

const buildUsernameFromEmail = async (email) => {
  const localPart = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const base = localPart || "user";
  let suffix = 0;

  while (true) {
    const username = suffix === 0 ? base : `${base}${suffix}`;
    // eslint-disable-next-line no-await-in-loop
    const existing = await User.findOne({ username });
    if (!existing) return username;
    suffix += 1;
  }
};

const resolveDisplayName = (payloadName, email, existingUser) => {
  if (payloadName && payloadName.trim().length > 0) return payloadName.trim();
  if (existingUser && existingUser.name) return existingUser.name;
  return email.split("@")[0];
};

const frontendBaseUrl = () =>
  (process.env.APP_BASE_URL || process.env.CORS_ORIGIN || `http://localhost:${process.env.PORT || 5000}`).replace(/\/$/, "");

const buildVerificationUrl = (token) => `${frontendBaseUrl()}/verify-email?token=${token}`;

const ensureVerificationTracking = (user) => {
  if (!user.verificationResend) {
    user.verificationResend = { count: 0, lastReset: null };
  }
};

const resetVerificationTracking = (user) => {
  user.verificationResend = { count: 0, lastReset: null };
};

const registerVerificationAttempt = (user) => {
  ensureVerificationTracking(user);
  const now = new Date();
  if (!user.verificationResend.lastReset || now - user.verificationResend.lastReset >= 60 * 60 * 1000) {
    user.verificationResend.lastReset = now;
    user.verificationResend.count = 0;
  }
  user.verificationResend.count += 1;
};

const withinResendLimit = (user) => {
  ensureVerificationTracking(user);
  const now = new Date();
  if (!user.verificationResend.lastReset || now - user.verificationResend.lastReset >= 60 * 60 * 1000) {
    user.verificationResend.lastReset = now;
    user.verificationResend.count = 0;
  }
  return user.verificationResend.count < RESEND_LIMIT_PER_HOUR;
};

const dispatchVerificationEmail = async (user) => {
  const token = generateVerificationToken(user._id);
  const verificationUrl = buildVerificationUrl(token);
  const emailResult = await emailService.sendVerificationEmail(user.email, user.name, verificationUrl);
  return { token, verificationUrl, emailResult };
};

const maskOtp = (otp) => `${otp.slice(0, 3)}***`;

/* --------------------------- OTP Login Flow --------------------------- */
export const requestOtp = async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    const displayName = resolveDisplayName(name, normalizedEmail, user);

    const otpCode = generateOtpCode();
    const otpHash = await bcrypt.hash(otpCode, 10);

    await OtpToken.findOneAndUpdate(
      { email: normalizedEmail, type: "login" },
      {
        email: normalizedEmail,
        type: "login",
        otpHash,
        attempts: 0,
        verified: false,
        expiresAt: new Date(Date.now() + OTP_EXPIRY_MS),
      },
      { upsert: true, new: true }
    );

    const emailResult = await emailService.sendOtpEmail(normalizedEmail, displayName, otpCode);
    if (!emailResult.success && !emailResult.fallback) {
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email. Check credentials.",
        error: emailResult.error,
      });
    }

    if (emailResult.fallback && !isProduction) {
      console.log(`[OTP Login] Dev fallback OTP for ${normalizedEmail}: ${otpCode}`);
    }

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      email: normalizedEmail,
      expiresIn: OTP_EXPIRY_MS / 1000,
      otpPreview: !isProduction && emailResult.fallback ? maskOtp(otpCode) : undefined,
    });
  } catch (error) {
    console.error("requestOtp error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp, name } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const tokenEntry = await OtpToken.findOne({ email: normalizedEmail, type: "login" });

    if (!tokenEntry) {
      return res
        .status(400)
        .json({ success: false, message: "No OTP request found for this email." });
    }

    if (tokenEntry.expiresAt < new Date()) {
      await OtpToken.deleteOne({ email: normalizedEmail, type: "login" });
      return res.status(400).json({ success: false, message: "OTP has expired." });
    }

    if (tokenEntry.attempts >= 5) {
      return res
        .status(429)
        .json({ success: false, message: "Too many incorrect attempts. Request new OTP." });
    }

    const isMatch = await bcrypt.compare(otp, tokenEntry.otpHash);
    if (!isMatch) {
      tokenEntry.attempts += 1;
      await tokenEntry.save();
      return res.status(400).json({ success: false, message: "Invalid OTP. Try again." });
    }

    tokenEntry.verified = true;
    await tokenEntry.save();
    await OtpToken.deleteOne({ email: normalizedEmail, type: "login" });

    let user = await User.findOne({ email: normalizedEmail }).select("+password");
    const displayName = resolveDisplayName(name, normalizedEmail, user);
    const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || "Nikhil@9515";

    let generatedUsername;
    let generatedPassword;
    let credentialsGenerated = false;

    if (!user) {
      generatedUsername = await buildUsernameFromEmail(normalizedEmail);
      generatedPassword = normalizedEmail === adminEmail ? adminPassword : generateRandomString(10);
      user = await User.create({
        name: displayName,
        email: normalizedEmail,
        username: generatedUsername,
        password: generatedPassword,
        role: normalizedEmail === adminEmail ? "admin" : "faculty",
        isVerified: true,
        verifiedAt: new Date(),
      });
      credentialsGenerated = true;
    } else {
      if (!user.username) {
        generatedUsername = await buildUsernameFromEmail(normalizedEmail);
        user.username = generatedUsername;
      } else {
        generatedUsername = user.username;
      }

      generatedPassword = normalizedEmail === adminEmail ? adminPassword : generateRandomString(10);
      if (normalizedEmail === adminEmail) user.role = "admin";

      user.password = generatedPassword;
      user.name = displayName;
      user.isVerified = true;
      user.verifiedAt = user.verifiedAt || new Date();
      await user.save();
      credentialsGenerated = true;
    }

    const token = generateToken(user._id);

    if (credentialsGenerated) {
      await emailService.sendCredentialsEmail(normalizedEmail, displayName, {
        username: generatedUsername,
        password: generatedPassword,
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        designation: user.designation,
        department: user.department,
        username: user.username,
        isVerified: user.isVerified,
        verifiedAt: user.verifiedAt,
      },
      credentials: credentialsGenerated
        ? { username: generatedUsername, password: generatedPassword }
        : null,
    });
  } catch (error) {
    console.error("verifyOtp error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* --------------------------- Registration --------------------------- */
export const register = async (req, res) => {
  try {
    const { name, email, password, role, designation } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      role: role || "faculty",
      designation,
      isVerified: devAutoVerify,
      verifiedAt: devAutoVerify ? new Date() : null,
    });

    let verificationInfo = null;
    if (!devAutoVerify) {
      const dispatch = await dispatchVerificationEmail(user);
      const { emailResult, verificationUrl } = dispatch;

      if (!emailResult.success && !emailResult.fallback) {
        return res.status(500).json({
          success: false,
          message: "Failed to dispatch verification email",
          error: emailResult.error,
        });
      }

      user.verificationResend = {
        count: 1,
        lastReset: new Date(),
      };
      await user.save();
      verificationInfo = { emailResult, verificationUrl };
    }

    res.status(201).json({
      success: true,
      message: devAutoVerify
        ? "User registered and auto-verified (development mode)."
        : verificationInfo?.emailResult.fallback
          ? "User registered. Verification link logged to server console."
          : "User registered. Verification email sent.",
      verificationSent: !devAutoVerify,
      verificationEmailSent: verificationInfo ? !verificationInfo.emailResult.fallback : false,
      verificationEmailFallback: Boolean(verificationInfo?.emailResult.fallback),
      verificationUrl:
        verificationInfo && verificationInfo.emailResult.fallback && !isProduction
          ? verificationInfo.verificationUrl
          : undefined,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        designation: user.designation,
        department: user.department,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("register error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* --------------------------- Email Verification (Link) --------------------------- */
export const verifyEmailLink = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ success: false, message: "Token required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.type !== "verify") {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.isVerified = true;
    await user.save();

    return res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("verifyEmailLink error:", error);
    res.status(400).json({ success: false, message: "Invalid or expired token" });
  }
};

/* --------------------------- Resend Verification --------------------------- */
export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "User already verified" });
    }

    const token = jwt.sign(
      { id: user._id, type: "verify" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_VERIFY_EXPIRE || "1d" }
    );

    const verifyLink = `${process.env.APP_BASE_URL || "http://localhost:5173"}/verify-email?token=${token}`;

    const result = await emailService.sendVerificationEmail(
      user.email,
      user.name || "Faculty",
      verifyLink
    );

    return res.status(200).json({
      success: true,
      message: "Verification email sent",
      ...(process.env.NODE_ENV !== "production" ? { link: verifyLink } : {}),
      result,
    });
  } catch (error) {
    console.error("resendVerification error:", error);
    res
      .status(500)
      .json({ success: false, message: `Server error: ${error.message}` });
  }
};

/* --------------------------- Verification OTP (Fallback) --------------------------- */
export const requestVerificationOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(200).json({ success: true, message: "Email already verified", alreadyVerified: true });
    }

    const otpCode = generateOtpCode();
    const otpHash = await bcrypt.hash(otpCode, 10);

    await OtpToken.findOneAndUpdate(
      { email: normalizedEmail, type: "verify" },
      {
        email: normalizedEmail,
        type: "verify",
        otpHash,
        attempts: 0,
        verified: false,
        expiresAt: new Date(Date.now() + OTP_EXPIRY_MS),
      },
      { upsert: true, new: true }
    );

    const emailResult = await emailService.sendOtpEmail(user.email, user.name, otpCode);
    const fallbackProvided = emailResult.fallback || !emailResult.success;

    if (!emailResult.success && !emailResult.fallback) {
      return res.status(500).json({
        success: false,
        message: "Failed to deliver verification OTP",
        error: emailResult.error,
      });
    }

    if (fallbackProvided && !isProduction) {
      console.log(`[Verification OTP] Dev fallback OTP for ${normalizedEmail}: ${otpCode}`);
    }

    return res.status(200).json({
      success: true,
      message: fallbackProvided
        ? "Verification OTP logged to console for development testing."
        : "Verification OTP sent successfully.",
      verificationOtpSent: true,
      otpPreview: !isProduction ? maskOtp(otpCode) : undefined,
    });
  } catch (error) {
    console.error("requestVerificationOtp error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const tokenEntry = await OtpToken.findOne({ email: normalizedEmail, type: "verify" });

    if (!tokenEntry) {
      return res.status(400).json({ success: false, message: "No verification OTP found for this email." });
    }

    if (tokenEntry.expiresAt < new Date()) {
      await OtpToken.deleteOne({ email: normalizedEmail, type: "verify" });
      return res.status(400).json({ success: false, message: "Verification OTP has expired." });
    }

    if (tokenEntry.attempts >= 5) {
      return res.status(429).json({ success: false, message: "Too many incorrect attempts." });
    }

    const isMatch = await bcrypt.compare(otp, tokenEntry.otpHash);
    if (!isMatch) {
      tokenEntry.attempts += 1;
      await tokenEntry.save();
      return res.status(400).json({ success: false, message: "Invalid verification OTP." });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      await OtpToken.deleteOne({ email: normalizedEmail, type: "verify" });
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.isVerified = true;
    user.verifiedAt = new Date();
    resetVerificationTracking(user);
    await user.save();

    await OtpToken.deleteOne({ email: normalizedEmail, type: "verify" });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully via OTP",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        designation: user.designation,
        department: user.department,
        isVerified: user.isVerified,
        verifiedAt: user.verifiedAt,
      },
    });
  } catch (error) {
    console.error("verifyEmailOtp error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* --------------------------- Credential Login --------------------------- */
export const login = async (req, res) => {
  try {
    const { password } = req.body;
    const identifier = (req.body.identifier || req.body.email || req.body.username || "").trim();

    if (!identifier || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide username/email and password" });
    }

    const normalizedEmail = identifier.toLowerCase();
    const user = await User.findOne({
      $or: [{ email: normalizedEmail }, { username: normalizedEmail }],
    }).select("+password");

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    if (!user.isActive) {
      return res.status(401).json({ success: false, message: "Your account has been deactivated" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        designation: user.designation,
        department: user.department,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* --------------------------- Current User --------------------------- */
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
