const Queue = require('bull');
const nodemailer = require('nodemailer');
require('dotenv').config();

const emailQueue = new Queue('email', process.env.REDIS_URL);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

emailQueue.process(async (job) => {
  const { to, subject, text, html } = job.data;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
  } catch (err) {
    console.error('Failed to send email:', err);
    throw err;
  }
});

emailQueue.on('completed', (job) => {
  console.log(`Job completed: ${job.id}`);
});

emailQueue.on('failed', (job, err) => {
  console.error(`Job failed: ${job.id}`, err);
});
