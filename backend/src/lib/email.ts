import nodemailer from "nodemailer";
import { env } from "../config/env";

const transporter = nodemailer.createTransport({
  host: "send.one.com",
  port: 587,
  secure: false,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});
export const sendWelcomeEmail = async (email: string, fullName: string) => {
  await transporter.sendMail({
    from: `"Dr-xaadle" <${env.EMAIL_USER}>`,
    to: email,
    subject: "Welcome to Dr-xaadle",
    html: `
      <div style="margin:0;padding:20px;background:#f5f7fb;font-family:Arial,sans-serif;">
        <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;padding:35px 28px;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.06);">
          <h1 style="margin:0;font-size:28px;font-weight:800;color:#1e2b3c;">
            Welcome to Dr-xaadle
          </h1>

          <p style="margin:20px 0;font-size:16px;line-height:1.6;color:#6b7280;">
            Dear ${fullName}, your account has been created successfully.
          </p>

          <p style="font-size:15px;line-height:1.6;color:#6b7280;">
            You can now book doctor appointments, manage your profile, and receive appointment updates.
          </p>

          <p style="margin-top:28px;font-size:14px;color:#9aa4b2;">
            Thank you for choosing Dr-xaadle.
          </p>
        </div>
      </div>
    `,
  });
};

export const sendResetCodeEmail = async (email: string, code: string) => {
  await transporter.sendMail({
    from: `"Dr-xaadle" <${env.EMAIL_USER}>`,
    to: email,
    subject: "Dr-xaadle Password Reset Verification Code",
    html: `
      <div style="margin:0;padding:20px;background:#f5f7fb;font-family:Arial,sans-serif;">
        <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;padding:40px 30px;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.06);">
          <h1 style="margin:0;font-size:30px;font-weight:800;color:#1e2b3c;">
            Dr-xaadle OTP Verification
          </h1>

          <p style="margin:20px 0 35px;font-size:16px;line-height:1.6;color:#6b7280;">
            Dear Patient, use the code below to reset your password.
          </p>

          <div style="font-size:42px;font-weight:800;letter-spacing:10px;color:#1e2b3c;margin-bottom:30px;">
            ${code}
          </div>

          <p style="font-size:14px;color:#9aa4b2;margin:0;">
            This code expires in 10 minutes.
          </p>
        </div>
      </div>
    `,
  });
};
