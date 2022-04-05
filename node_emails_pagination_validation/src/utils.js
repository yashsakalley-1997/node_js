const transporter = require("./configs/mail");

const confirmationMail = async ({from,to,firstName,lastName}) => {
  let info = await transporter.sendMail({
    from:from,
    to:to,
    subject: `Welcome to Masai School ${firstName} ${lastName}`,
    text: `Hi ${firstName}. Please confirm your email address`,
    html: `<h1>Hi ${firstName}. Please confirm your email address</h1>`
  })
}

const adminMail = async ({from,to,firstName,lastName}) => {
  let info = await transporter.sendMail({
    from:from,
    to:to.join(","),
    subject: `${firstName} ${lastName}. Has registered with us`,
    text: `Please welcome ${firstName} ${lastName}`,
    html: `<h1>Please welcome ${firstName} ${lastName}</h1>`
  })
}

module.exports = {confirmationMail,adminMail};