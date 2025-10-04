import bcrypt from "bcryptjs";
import { prisma, setAsync } from "../config/db.js";
import { generateOtp } from "../utils/generate-otp.js";
import {
  signinschema,
  signupschema,
  verifyOtpschema,
} from "../zod-schema/auth.js";
// import { sendEmails } from "../queues/emailQueue.js";
import {
  generateTokens,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  storeRefreshToken,
  verifyOTP_func,
} from "../utils/auth.js";
import { sendEmail } from "../utils/sendEmail.js";
import { validUuid } from "../zod-schema/form.js";

const OTP_EXPIRATION = process.env.OTP_EXPIRATION || 300; //in ms

// Signup handler
export const signup = async (req, res) => {
  const isValid = signupschema.safeParse(req.body);
  if (!isValid.success) {
    return res.status(400).json({ error: isValid.error.issues[0].message });
  }
  const { name, middleName, lastName, email, password, rollNumber, branch } =
    isValid.data;

  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }
    const user = await prisma.user.create({
      data: {
        name,
        middleName,
        lastName,
        email,
        password: hashPassword,
        rollNumber,
        branch: branch,
        emailVerified: false,
        role: {
          connect: { role: "STUDENT" }, // must match Role.role enum value
        },
      },
      select: {
        id: true,
        email: true,
      },
    });
    console.log(user);
    await sendOTP(user);
    res.status(200).json({
      message: "OTP sent to your email for signup verification.",
      id: user.id,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: error.message });
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
    const user = await prisma.user.findFirst({
      where: { email, emailVerified: true },
      select: { id: true, password: true },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    console.log(user.id);
    await sendOTP(user.id);
    return res
      .status(200)
      .json({ message: "Password verified OTP verification left" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const sendOTP = async (user) => {
  const { email, id } = user;
  try {
    const { hashedOTP, otp } = await generateOtp();
    console.log(otp);
    await setAsync(id, hashedOTP, OTP_EXPIRATION);

    const mail = {
      toWhom: email,
      subject: "Your OTP for Login",
      msg: {
        title: "Login OTP",
        message: `Your OTP is ${otp}. It is valid for ${OTP_EXPIRATION / 60} minutes.`,
      },
    };
    const info = await sendEmail(otp, mail.toWhom);

    console.log(
      `OTP email sent successfully to ${email}. Message ID: ${info.message}`,
    );

    return {
      otp,
      message: "OTP sent successfully",
    };
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP");
  }
};

const otpValidation = verifyOtpschema.safeParse(req.body);
if (!otpValidation.success) {
  return res.status(400).json({ error: otpValidation.error.issues[0].message });
}
const userIdValidation = validUuid.safeParse(req.params.id);
if (!userIdValidation.success) {
  return res.status(401).json({ error: userIdValidation.error.message });
}
const { id } = userIdValidation.data;
const { otp } = otpValidation.data;

const user = await prisma.user.update({
  where: { id },
  data: { emailVerified: true },
  select: { id: true, email: true, role: true },
});

