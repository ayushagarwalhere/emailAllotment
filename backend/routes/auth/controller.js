import * as authService from './service.js';

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const result = await authService.signup(name, email, password);
        res.status(201).json({ message: 'User signed up', result });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await authService.login(email);
        res.status(200).json({ message: 'OTP sent', result });
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({ error: error.message });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const result = await authService.verifyOtp(email, otp);
        res.status(200).json({ message: 'OTP verified', result });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(400).json({ error: error.message });
    }
};
