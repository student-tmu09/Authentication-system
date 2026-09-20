require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});


transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});


const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Ayush Kumar singh" <${process.env.EMAIL_USER}>`, // sender address
      to,
      subject,
      text,
      html,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
const sendotpemail=async(email,otpCode)=>{
const appName="Flipmart"
const mailSubject = `${appName} - Email Verification OTP Code`;
const mailText = `Namaste,

${appName} registration ke liye aapka One-Time Password (OTP) niche diya gaya hai:

OTP Code: ${otpCode}

Yeh code 5 minute ke liye valid hai. 

Suraksha alert: Yeh OTP kisi ke saath share na karein. Agar aapne yeh request nahi kiya hai, toh is email ko ignore karein.

Dhanyawad,
${appName} Team`;


const mailHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; }
    .container { max-width: 480px; background: #ffffff; padding: 30px; border-radius: 8px; margin: 0 auto; border: 1px solid #e1e4e8; }
    .title { font-size: 20px; font-weight: bold; color: #333333; margin-bottom: 15px; }
    .otp-box { background: #f3f4f6; text-align: center; padding: 15px; border-radius: 6px; font-size: 30px; font-weight: bold; letter-spacing: 6px; color: #111827; margin: 20px 0; }
    .text { color: #4b5563; font-size: 14px; line-height: 1.6; margin: 10px 0; }
    .footer { font-size: 12px; color: #6b7280; border-top: 1px solid #eee; padding-top: 15px; margin-top: 25px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="title">${appName}</div>
    <p class="text">Namaste,</p>
    <p class="text">${appName} registration ke liye aapka One-Time Password (OTP) niche diya gaya hai:</p>
    
    <div class="otp-box">${otpCode}</div>
    
    <p class="text">Yeh code <strong>5 minute</strong> ke liye valid hai.</p>

    <div class="footer">
      <p><strong>Suraksha alert:</strong> Yeh OTP kisi ke saath share na karein. Agar aapne yeh request nahi kiya hai, toh is email ko ignore karein.</p>
      <p style="margin-top: 15px;">Dhanyawad,<br><strong>${appName} Team</strong></p>
    </div>
  </div>
</body>
</html>`;

await sendEmail(email,mailSubject,mailText,mailHtml)
}

const sendregistrationEmail=async(name,email)=>{
    const html=`<div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; max-width: 500px;">
    <h2 style="color: #333;">Welcome, ${name}! 🎉</h2>
    <p style="color: #555; line-height: 1.5;">
    Aapka account successfully setup ho gaya hai (<strong>${email}</strong>).
    </p>
    <div style="margin: 20px 0;">
    <a href="#" style="background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Login Now</a>
    </div>
    <p style="color: #888; font-size: 12px; margin-top: 20px;">
    Agar aapne registration nahi kiya tha, toh is email ko ignore karein.
    </p>
    </div>`
    const text=`  Aapka account successfully setup ho gaya hai , Agar aapne registration nahi kiya tha, toh is email ko ignore karein.`
    const subject=`Welcome to flipmart`

await sendEmail(email,subject,text,html)
}
const sendResetPasswordEmail = async (email, resetLink) => {
  const appName = "Flipmart";

  const mailSubject = `${appName} - Reset Your Password`;

  const mailText = `Namaste,

Aapne apne ${appName} account ka password reset karne ki request ki hai.

Password reset karne ke liye niche diye gaye link par click karein:

Reset Password: ${resetLink}

Yeh link 10 minute ke liye valid hai.

Suraksha alert: Agar aapne password reset ki request nahi ki hai, toh is email ko ignore karein. Apna reset link kisi ke saath share na karein.

Dhanyawad,
${appName} Team`;

  const mailHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f9;
      margin: 0;
      padding: 20px;
    }

    .container {
      max-width: 480px;
      background: #ffffff;
      padding: 30px;
      border-radius: 8px;
      margin: 0 auto;
      border: 1px solid #e1e4e8;
    }

    .title {
      font-size: 20px;
      font-weight: bold;
      color: #333333;
      margin-bottom: 15px;
    }

    .text {
      color: #4b5563;
      font-size: 14px;
      line-height: 1.6;
      margin: 10px 0;
    }

    .button {
      display: inline-block;
      background-color: #2563eb;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: bold;
      margin: 20px 0;
    }

    .link {
      word-break: break-all;
      color: #2563eb;
      font-size: 12px;
    }

    .footer {
      font-size: 12px;
      color: #6b7280;
      border-top: 1px solid #eee;
      padding-top: 15px;
      margin-top: 25px;
    }
  </style>
</head>

<body>
  <div class="container">

    <div class="title">${appName}</div>

    <p class="text">Namaste,</p>

    <p class="text">
      Aapne apne ${appName} account ka password reset karne ki request ki hai.
    </p>

    <p class="text">
      Password reset karne ke liye niche diye gaye button par click karein:
    </p>

    <div style="text-align: center;">
      <a href="${resetLink}" class="button">
        Reset Password
      </a>
    </div>

    <p class="text">
      Yeh link <strong>10 minute</strong> ke liye valid hai.
    </p>

    <p class="text">
      Agar button kaam nahi kar raha hai, toh ye link browser me open karein:
    </p>

    <p class="link">
      ${resetLink}
    </p>

    <div class="footer">
      <p>
        <strong>Suraksha alert:</strong>
        Agar aapne password reset ki request nahi ki hai,
        toh is email ko ignore karein.
        Apna reset link kisi ke saath share na karein.
      </p>

      <p style="margin-top: 15px;">
        Dhanyawad,<br>
        <strong>${appName} Team</strong>
      </p>
    </div>

  </div>
</body>
</html>`;

  // Yahan apne transporter se email send karo
  await transporter.sendMail({
    from: `"${appName}" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: mailSubject,
    text: mailText,
    html: mailHtml
  });
};


module.exports={sendregistrationEmail,sendotpemail,sendResetPasswordEmail}