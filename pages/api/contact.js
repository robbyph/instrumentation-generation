export default async (req, res) => {
  require("dotenv").config();

  let nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true, //ssl
    auth: {
      EMAIL: process.env.EMAIL,
      EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    },
  });

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  const mailData = {
    from: {
      name: req.body.name,
      address: process.env.EMAIL,
    },
    to: "robbyphoover@gmail.com",
    subject: `[Instrumentation Generation Feedback] ${req.body.subject}`,
    html: `<div>${req.body.message}</div><p>From: ${req.body.name}</p>${req.body.email}`,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });

  res.status(200).json({ status: "OK" });
};
