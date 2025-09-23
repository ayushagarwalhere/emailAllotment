import { prisma, setAsync, getAsync, delAsync } from "../../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  signupschema,
  signinschema,
  verifyOtpschema,
} from "../zod-schema/auth.js";

const OTP_EXPIRATION = parseInt(process.env.OTP_EXPIRATION) || 300;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

// Generate a 6-digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


function parseDuration(duration) {
  const match = duration.match(/^(\d+)([smhd])$/);
  if (!match) throw new Error("Invalid duration format");
  const value = parseInt(match[1], 10);
  const unit = match[2];
  switch (unit) {
    case 's': return value * 1000;
    case 'm': return value * 60 * 1000;
    case 'h': return value * 60 * 60 * 1000;
    case 'd': return value * 24 * 60 * 60 * 1000;
    default: throw new Error("Invalid duration unit");
  }
}

// Generate access and refresh tokens
function generateTokens(user) {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role.role
  };
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
  return { accessToken, refreshToken };
}

// Store refresh token in database
async function storeRefreshToken(userId, refreshToken) {
  await prisma.refreshToken.upsert({
    where: { userId },
    update: {
      token: refreshToken,
      expiresAt: new Date(Date.now() + parseDuration(REFRESH_TOKEN_EXPIRES_IN))
    },
    create: {
      id: crypto.randomUUID(),
      token: refreshToken,
      userId,
      expiresAt: new Date(Date.now() + parseDuration(REFRESH_TOKEN_EXPIRES_IN))
    }
  });
}


function setRefreshTokenCookie(res, token) {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development',
    sameSite: 'Strict',
    maxAge: parseDuration(REFRESH_TOKEN_EXPIRES_IN)
  });
}

// OTP verification used for both signup and login
async function handleOtpVerification(email, otpKey, dataKey) {
  const storedOtp = await getAsync(otpKey);
  if (!storedOtp || storedOtp !== email.otp) {
    throw new Error("Invalid or expired OTP");
  }
  const dataStr = await getAsync(dataKey);
  if (!dataStr) {
    throw new Error("Data expired or not found");
  }
  await delAsync(otpKey);
  await delAsync(dataKey);
  return JSON.parse(dataStr);
}

// Signup handler
export const signup = async (req, res) => {
  const isValid = signupschema.safeParse(req.body);
  if (!isValid.success) {
    return res.status(400).json({ error: isValid.error.issues[0].message });
  }
  const { name, email, password } = isValid.data;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }
    const otp = generateOtp();
    const signupData = JSON.stringify({ name, email, password });
    await setAsync(`signup:${email}`, signupData, OTP_EXPIRATION);
    await setAsync(`signup-otp:${email}`, otp, OTP_EXPIRATION);
    console.log(`Signup OTP for ${email}: ${otp}`);
    res.status(200).json({ message: "OTP sent to your email for signup verification." });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(400).json({ error: error.message });
  }
};


// Signup OTP verification
export const verifySignupOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
  const signupData = await handleOtpVerification(email, `signup-otp:${email}`, `signup:${email}`);
    const role = await prisma.role.findUnique({ where: { role: "STUDENT" } });
    if (!role) {
      return res.status(500).json({ error: "Student role not found" });
    }
    const hashedPassword = await bcrypt.hash(signupData.password, 10);
    const user = await prisma.user.create({
      data: {
        name: signupData.name,
        email: signupData.email,
        password: hashedPassword,
        roleId: role.id,
        emailVerified: true
      },
      include: { role: true }
    });
    const { accessToken, refreshToken } = generateTokens(user);
    await storeRefreshToken(user.id, refreshToken);
    setRefreshTokenCookie(res, refreshToken);
    res.status(200).json({ message: "Signup OTP verified, account created", user, accessToken });
  } catch (error) {
    console.error("Signup OTP verification error:", error);
    res.status(400).json({ error: error.message });
  }
};

// Login handler
export const login = async (req, res) => {
  const isValid = signinschema.safeParse(req.body);
  if (!isValid.success) {
    return res.status(400).json({ error: isValid.error.issues[0].message });
  }
  const { email, password } = isValid.data;
  try {
    const user = await prisma.user.findUnique({ where: { email }, include: { role: true } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const otp = generateOtp();
    await setAsync(`login-otp:${email}`, otp, OTP_EXPIRATION);
    console.log(`Login OTP for ${email}: ${otp}`);
    res.status(200).json({ message: "Password verified, OTP sent to email." });
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).json({ error: error.message });
  }
};

// Login OTP verification
export const verifyOtp = async (req, res) => {
  const isValid = verifyOtpschema.safeParse(req.body);
  if (!isValid.success) {
    return res.status(400).json({ error: isValid.error.issues[0].message });
  }
  const { email, otp } = isValid.data;
  try {
  const storedOtp = await getAsync(`login-otp:${email}`);
    if (!storedOtp || storedOtp !== otp) {
      return res.status(401).json({ error: "Invalid or expired OTP" });
    }
  await delAsync(`login-otp:${email}`);
    const user = await prisma.user.update({
      where: { email },
      data: { emailVerified: true },
      include: { role: true }
    });
    const { accessToken, refreshToken } = generateTokens(user);
    await storeRefreshToken(user.id, refreshToken);
    setRefreshTokenCookie(res, refreshToken);
    res.status(200).json({ message: "OTP verified", user, accessToken });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(400).json({ error: error.message });
  }
};
