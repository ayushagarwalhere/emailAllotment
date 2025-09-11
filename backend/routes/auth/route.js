import express from 'express';
import { signup, login, verifyOtp } from './controller.js';
import { validateSignup, validateLogin, validateVerifyOtp } from './validator.js';

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.post('/verify-otp', validateVerifyOtp, verifyOtp);

export default router;
