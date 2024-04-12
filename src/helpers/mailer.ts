import User from "@/models/user.models";
import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs'

export const sendmail = async ({ email, emailType, userId }) => {
  try {
    const hashedToken=await bcryptjs.hash(userId.toString(),10);
    if(emailType==='VERIFY' ){
      await User.findByIdAndUpdate(userId,{
        verifyToken:hashedToken,
        verifyTokenExpiry: Date.now()+3600000
      })

    }else if(emailType ==="RESET"){
      await User.findByIdAndUpdate(userId,{
        forgotPasswordToken:hashedToken,
        forgotPasswordTokenExpiry: Date.now()+3600000
      })
    }
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "a9721da24a331d",//🔥❌
        pass: "db58997394a955"
      }
    });
    const mailOptions = {
      from: 'dhimangourav2020@gmail.com', 
      to: email, 
      subject: emailType==='VERIFY' ? "Verify your email":"Reset your Password", 
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
      or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`
    };


    const mailResponse = await transporter.sendMail(mailOptions);
    console.log(mailResponse);
    return mailResponse;
    
  } catch (error:any) {
    throw new Error(error.message);
  }
};
