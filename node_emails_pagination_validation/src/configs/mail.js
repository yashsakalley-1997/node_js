const nodemailer = require("nodemailer");
module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "cb3cfe6f8a64ba", // generated ethereal user
      pass: "96df08e4c5ce0a", // generated ethereal password
    },
  });
  