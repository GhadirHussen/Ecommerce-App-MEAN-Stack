const nodemailer = require('nodemailer');

module.exports = (email, subject, text) => {

  let transporter = nodemailer.createTransport({
    service: 'hotmail',
    port: 587,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    },
  });

  let mailOption = {
      from: process.env.USER,
      to: email, 
      subject: subject, 
      html: `<h3>${text}</h3>`
  }
  transporter.sendMail(mailOption, (err, info) => {
      if(err) {
        return console.log(err);
      } 
  });
}
