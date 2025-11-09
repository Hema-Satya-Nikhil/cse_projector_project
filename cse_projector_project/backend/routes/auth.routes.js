import express from "express";
import {
	register,
	login,
	getMe,
	requestOtp,
	verifyOtp,
	resendVerification,
	verifyEmailLink,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// AUTH ROUTES
router.post("/register", register);
router.post("/login", login);
router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtp);
router.get("/me", protect, getMe);

// ✅ EMAIL VERIFICATION ROUTES
router.post("/resend-verification", resendVerification);
router.get("/verify-email", verifyEmailLink);

export default router;
