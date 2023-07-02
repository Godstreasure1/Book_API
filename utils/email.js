const nodemailer = require("nodemailer");

const sendEMail = async (email, subject, text, html) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  try {
    await transporter.sendMail({
      from: `Book_API 😊 <${process.env.SMTP_USER}>`, // sender address
      to: email, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEMail;
