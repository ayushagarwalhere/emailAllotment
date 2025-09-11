import { prisma, setAsync, getAsync, delAsync } from "../../config/db.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const OTP_EXPIRATION = parseInt(process.env.OTP_EXPIRATION) || 300;

function generateOtp() {
  const buffer = crypto.randomBytes(3);
  const number = parseInt(buffer.toString("hex"), 16) % 1000000;
  return number.toString().padStart(6, "0");
}

export const signup = async (name, email, password) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const role = await prisma.role.findUnique({
    where: { role: "STUDENT" },
  });

  if (!role) {
    throw new Error("Student role not found");
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      roleId: role.id,
      emailVerified: false,
    },
  });

  return user;
};

export const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const otp = generateOtp();
  await setAsync(`otp:${email}`, otp, OTP_EXPIRATION);

  console.log(`Sending OTP to ${email}: ${otp}`);

  return true;
};

export const verifyOtp = async (email, otp) => {
  const storedOtp = await getAsync(`otp:${email}`);

  if (!storedOtp || storedOtp !== otp) {
    throw new Error("Invalid or expired OTP");
  }

  await delAsync(`otp:${email}`);

  const user = await prisma.user.update({
    where: { email },
    data: { emailVerified: true },
  });

  return user;
};
