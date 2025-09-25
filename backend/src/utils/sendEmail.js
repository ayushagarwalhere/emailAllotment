import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.YOUR_EMAIL_ID,
    pass: process.env.YOUR_EMAIL_PASSWORD, 
  }
});

export default sendMail = async(toWhom, subject, message)=> {
  const info = await transporter.sendMail({
    from: process.env.YOUR_EMAIL_ID,
    to: toWhom,
    subject,
    html: `<h3>${message.title}</h3><p>${message.message}</p>`,
  });

  console.log('Email sent: %s', info.messageId);
}


