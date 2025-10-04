import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(otp, email) {
  const { data, error } = await resend.emails.send({
    from: "Anurag Singh <send@anuragcode.me>",
    to: [email],
    subject: "OTP",
    html: `<strong>OTP is ${otp}</strong>`,
  });

  if (error) {
    return console.error({ error });
  }
  return {message: "send successfully"}
  console.log({ data });
}
