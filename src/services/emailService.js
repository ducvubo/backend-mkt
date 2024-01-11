require('dotenv').config();
import nodemailer from 'nodemailer'

let sendSimpleEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });


      let info = await transporter.sendMail({
        from: '"Vu Duc Bo 👻" <vminhduc8@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Đăng ký tài khoản", // Subject line
        html:
        `<div>${dataSend.ho}</div>
        <div>${dataSend.ten}</div>
        <div>${dataSend.sodienthoai}</div>
        <div>${dataSend.diachinha}</div>
        <span>Neu cac thong tin kia la dung vui long click vao duong link ben duoi</span>
        <a href=${dataSend.redirectLink} target="_blank">click here</a>
        `

      });
}



module.exports = {
    sendSimpleEmail
}