"use server";
import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    console.log("to", to);
    console.log("subject", subject);
    console.log("text", text);
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL, // Your Gmail email address
        pass: process.env.EMAIL_PASSWORD, // Your Gmail password or an App Password if using 2-factor authentication
      },
    });
    const mailOptions = {
      from: process.env.EMAIL, // Your Gmail email address
      to: to, // Your Gmail email address (to send the email to yourself)
      subject: "🚨🚨 " + subject,
      text: `
      ${text}
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};
