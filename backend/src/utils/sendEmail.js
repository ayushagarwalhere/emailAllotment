import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.YOUR_EMAIL_ID,
    pass: process.env.YOUR_EMAIL_PASSWORD, 
  }
});

export const sendMail = async (toWhom, subject, msg) => {
  if (!msg?.title || !msg?.message) {
    throw new Error('Invalid message object. Requires {title, message}');
  }

  const info = await transporter.sendMail({
    from: process.env.YOUR_EMAIL_ID,
    to: toWhom,
    subject,
    html: `<h3>${msg.title}</h3><p>${msg.message}</p>`,
  });

  console.log('Email sent: %s', info.messageId);
  return info;
};

export default sendMail
