import express from 'express';
import * as authController from './controller.js';
import { validateSignup, validateLogin, validateVerifyOtp } from './validator.js';

const router = express.Router();
router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateLogin, authController.login);
router.post('/verify-otp', validateVerifyOtp, authController.verifyOtp);

export default router;
