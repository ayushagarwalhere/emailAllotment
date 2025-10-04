import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(otp) {
  const { data, error } = await resend.emails.send({
    from: "Anurag Singh <send@anuragcode.me>",
    to: ["24bcs108@nith.ac.in"],
    subject: "OTP",
    html: `<strong>OTP is ${otp}</strong>`,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
}
