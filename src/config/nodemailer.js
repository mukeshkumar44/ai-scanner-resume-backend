const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});
const sendEmail = async (email, message) => {
    await transporter.sendMail({
        from: `"Auth Admin" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '',
        text: message
    });
}
module.exports = sendEmail;
