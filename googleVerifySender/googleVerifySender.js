const PASSWORD = process.env["EMAIL_PASSWORD"];
const EMAIL = process.env["EMAIL"];
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: EMAIL,
        pass: PASSWORD,
    },
});

function createMailOptions(userEmail, password){
    return {
        from: EMAIL,
        to: userEmail,
        subject: 'New password',
        text: `Your new password ${password}`,
    };

}

module.exports = {
    transporter,
    createMailOptions
}