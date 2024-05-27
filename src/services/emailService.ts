import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendCompletionNotification = async (
  email: string,
  taskDescription: string
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Task Completed",
    text: `The task "${taskDescription}" has been completed.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
