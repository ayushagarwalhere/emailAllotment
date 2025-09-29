import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "7d";

function parseDuration(duration) {
  const match = duration.match(/^(\d+)([smhd])$/);
  if (!match) throw new Error("Invalid duration format");
  const value = parseInt(match[1], 10);
  const unit = match[2];
  switch (unit) {
    case "s":
      return value * 1000;
    case "m":
      return value * 60 * 1000;
    case "h":
      return value * 60 * 60 * 1000;
    case "d":
      return value * 24 * 60 * 60 * 1000;
    default:
      throw new Error("Invalid duration unit");
  }
}

export function generateTokens(user) {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role.role,
  };
  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  const refreshToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
  return { accessToken, refreshToken };
}

// Store refresh token in database
export async function storeRefreshToken(userId, refreshToken) {
  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
  await prisma.refreshToken.upsert({
    where: { userId },
    update: {
      token: hashedRefreshToken,
      expiresAt: new Date(Date.now() + parseDuration(REFRESH_TOKEN_EXPIRES_IN)),
    },
    create: {
      id: crypto.randomUUID(),
      token: refreshToken,
      userId,
      expiresAt: new Date(Date.now() + parseDuration(REFRESH_TOKEN_EXPIRES_IN)),
    },
  });
}

export function setRefreshTokenCookie(res, token) {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
    maxAge: parseDuration(REFRESH_TOKEN_EXPIRES_IN),
  });
}

export function setAccessTokenCookie(res, token) {
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
    maxAge: parseDuration(JWT_EXPIRES_IN),
  });
}

export async function handleOtpVerification(email, otpKey, dataKey) {
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