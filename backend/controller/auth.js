import * as authService from "../routes/auth/service.js";
import {
  signupschema,
  signinschema,
  verifyOtpschema,
} from "../zod-schema/auth.js";

export const signup = async (req, res) => {
  const isValid = signupschema.safeParse(req.body);
  if (!isValid.success) {
    res.status(400).json({ error: isValid.error.issues[0].message });
    return;
  }
  const { name, email, password } = isValid.data;

  try {
    const user = await authService.signup(name, email, password);
    res.status(201).json({ message: "Signup successful", user });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const isValid = signinschema.safeParse(req.body);
  if (!isValid.success) {
    res.status(400).json({ error: isValid.error.issues[0].message });
    return;
  }
  const { email, password } = isValid.data;
  try {
    await authService.login(email, password);
    res.status(200).json({ message: "Password verified, OTP sent to email" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).json({ error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  const isValid = verifyOtpschema.safeParse(req.body);
  if (!isValid.success) {
    res.status(400).json({ error: isValid.error.issues[0].message });
    return;
  }
  const { email, otp } = isValid.data;
  try {
    const user = await authService.verifyOtp(email, otp);
    res.status(200).json({ message: "OTP verified", user });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(400).json({ error: error.message });
  }
};
