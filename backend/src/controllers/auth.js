import bcrypt from "bcryptjs";
import { delAsync, getAsync, prisma, setAsync } from "../config/db.js";
import { generateOtp } from "../utils/generate-otp.js";
import {
  signinschema,
  signupschema,
  verifyOtpschema,
  sendOTPschema,
} from "../zod-schema/auth.js";
import { sendEmails } from "../queues/emailQueue.js";
import { setAccessTokenCookie, setRefreshTokenCookie, handleOtpVerification, storeRefreshToken, generateTokens } from "../utils/auth.js";

const OTP_EXPIRATION = parseInt(process.env.OTP_EXPIRATION) || 300;


// OTP verification used for both signup and login


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
    await prisma.user.create({
      data: {
        name,
        middleName,
        lastName,
        email,
        password: hashPassword,
        rollNumber,
        branch: branch,
        emailVerified: false,
      },
    });
    // Generate and store OTP
    const { hashedOTP, otp } = await generateOtp();
        //sending mail
    const mail = {
      toWhom: email,
      subject: "Your OTP for Login",
      msg: {
        title : "Login OTP",
        message : `Your OTP is ${otp}. It is valid for ${OTP_EXPIRATION/60} minutes.`,
      },
    };
    const job = sendEmails(mail);
    //save to redis with ttl

    res
      .status(200)
      .json({ message: "OTP sent to your email for signup verification." });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Signup OTP verification
export const verifySignupOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const signupData = await handleOtpVerification(
      email,
      `signup-otp:${email}`,
      `signup:${email}`,
    );
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
        emailVerified: true,
      },
      include: { role: true },
    });
    const { accessToken, refreshToken } = generateTokens(user);
    await storeRefreshToken(user.id, refreshToken);
    setRefreshTokenCookie(res, refreshToken);
    res.status(200).json({
      message: "Signup OTP verified, account created",
      user,
      accessToken,
    });
  } catch (error) {
    console.error("Signup OTP verification error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Login handler
export const signin = async (req, res) => {
  const isValid = signinschema.safeParse(req.body);
  if (!isValid.success) {
    return res.status(400).json({ error: isValid.error.issues[0].message });
  }
  const { email, password } = isValid.data;
  try {
    const user = await prisma.user.findUnique({
      where: { email, emailVerified: true },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    sendOTP(email);
    return res.status(200).json({ message: "Password verified" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message });
  }
};

// export const sendOTP = async (req, res) => {
//   const isValid = sendOTPschema.safeParse(req.body);
//   if (!isValid.success) {
//     return res.status(400).json({ error: isValid.error.issues[0].message });
//   }
//   const { email } = isValid.data;
//   try {
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     const {hashedOTP, otp} = await generateOtp();
//     //sending mail
//     const mail = {
//       toWhom: email,
//       subject: "Your OTP for Login",
//       msg: {
//         title : "Login OTP",
//         message : `Your OTP is ${otp}. It is valid for ${OTP_EXPIRATION/60} minutes.`,
//       },
//     };
//     const job = sendEmails();

//     //saving to redis with ttl
//     await setAsync(`login-otp:${email}`, hashedOTP, OTP_EXPIRATION);
//     res.status(200).json({
//       message: "OTP sent to your email for login verification.",
//       job: job.id,
//     });
//   } catch (error) {
//     console.error("OTP sending error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export const sendOTP = async(email)=>{ 
  try {
    const {hashedOTP, otp} = await generateOtp();
    await setAsync(`login-otp:${mail.toWhom}`, hashedOTP, OTP_EXPIRATION);
    const mail = {
      toWhom: email,
      subject: "Your OTP for Login",
      msg: {
        title : "Login OTP",
        message : `Your OTP is ${otp}. It is valid for ${OTP_EXPIRATION/60} minutes.`,
      },
    };
    const job = sendEmails();
    return {
      jodId:job.id, 
      message: "OTP sent successfully"
    };
  } catch (error) {
    console.error("OTP sending error:", error);
    throw new Error("Internal server error");
  }
}

export const verifyOTP_function = async(email, otpEntered)=>{
  const otp = await getAsync(email);
  const isValid = await bcrypt.compare(otpEntered.toSting(), otp);
  if(!isValid || !otp){
    throw new Error("Invalid or expired OTP");
  }
  await delAsync(email);
  return isValid;
}


export const verifyOTP = async(req, res)=>{
  const verifyOTP = verifyOtpschema.safeParse(req.body);
  if(!verifyOTP.success){
    return res.status(400).json({error: verifyOTP.error.issues[0].message});
  }
  const {email, otp} = verifyOTP.data;
  const isValid = await verifyOTP_function(email, otp);
  if(!isValid){
    return res.status(401).json({error: "Invalid or expired OTP"});
  }
  try {
    const user= await prisma.user.findUnique({
      email,
      emailVerified: true,
    })
    const {accessToken, refreshToken} = generateTokens(user);
    await storeRefreshToken(user.id, refreshToken);
    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
    res.status(200).json({message: "OTP verified", user, accessToken});
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({error: error.message} ); 
  }
}



// Login OTP verification
// export const verifyOtp = async (req, res) => {
//   const isValid = verifyOtpschema.safeParse(req.body);
//   if (!isValid.success) {
//     return res.status(400).json({ error: isValid.error.issues[0].message });
//   }
//   const { email, otp } = isValid.data;
//   try {
//     const storedOtpHash = await getAsync(email);
//       if (!storedOtpHash || !(await bcrypt.compare(otp, storedOtpHash))) {
//         return res.status(401).json({ error: "Invalid or expired OTP" });
//       }

//     await delAsync(`login-otp:${email}`);
//     const user = await prisma.user.update({
//       where: { email },
//       data: { emailVerified: true },
//     });
//     const { accessToken, refreshToken } = generateTokens(user);
//     await storeRefreshToken(user.id, refreshToken);
//     setAccessTokenCookie(res, accessToken);
//     setRefreshTokenCookie(res, refreshToken);
//     res.status(200).json({ message: "OTP verified", user, accessToken });
//   } catch (error) {
//     console.error("OTP verification error:", error);
//     res.status(500).json({ error: error.message });
//   }
// };
