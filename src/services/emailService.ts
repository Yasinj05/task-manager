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
  recipient: string,
  taskDescription: string
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipient,
    subject: "Task Completed",
    text: `The following task has been completed: ${taskDescription}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};
