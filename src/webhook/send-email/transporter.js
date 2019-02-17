const nodemailer = require('nodemailer')

console.log(process.env.SMTP_HOST);

// TRANSPORTER CONFIGURATION
const {SMTP_HOST, SMTP_PORT, SMTP_AUTH_USER, SMTP_AUTH_PASSWORD} = process.env
let transporterConfiguration = {
    host: SMTP_HOST,
    // port: SMTP_PORT,
    secure: true, // upgrade later with STARTTLS
    auth: {
      user: SMTP_AUTH_USER,
      pass: SMTP_AUTH_PASSWORD
    }
}

let transporter = nodemailer.createTransport(transporterConfiguration)
module.exports = {transporter}
