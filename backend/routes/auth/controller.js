import * as authService from './service.js';

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await authService.signup(name, email, password);
        res.status(201).json({ message: 'Signup successful', user });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        await authService.login(email, password);
        res.status(200).json({ message: 'Password verified, OTP sent to email' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({ error: error.message });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await authService.verifyOtp(email, otp);
        res.status(200).json({ message: 'OTP verified', user });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(400).json({ error: error.message });
    }
};
