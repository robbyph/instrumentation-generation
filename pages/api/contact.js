export default function (req, res) {
    require('dotenv').config()

    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: 'instrumentationgen.feedback@gmail.com',
        pass: process.env.password,
      },
      secure: true,
    })  
    
    const mailData = {
        from: 'instrumentationgen.feedback@gmail.com',
        to: 'robbyphoover@gmail.com',
        subject: `[Instrumentation Generation Feedback]: ${req.body.email}`,
        text: `${req.body.subject}`,
        html: `<div>${req.body.message}</div><p>from ${req.body.subject}</p>`
    }  
    
    transporter.sendMail(mailData, function(err, info) {
        console.log('subject: ' + req.body.subject)
        if(err)
        console.log(err)
      else
        console.log(info)
    
    })  
    res.status(200)
    res.send('success')
  }