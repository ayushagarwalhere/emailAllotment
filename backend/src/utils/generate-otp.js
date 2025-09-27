import bcrypt from 'bcryptjs';

export async function generateOtp() { 
  const otp = Math.floor(100000 + Math.random() * 900000);
  const hashedOTP = await bcrypt.hash(otp.toString(), 10);
  return {hashedOTP, otp};
}
