@'
import nodemailer from 'nodemailer';

const EMAIL_USER = process.env.EMAIL_USER || '';
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || '';
const EMAIL_FROM = process.env.EMAIL_FROM || 'no-reply@example.com';
const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';
const EMAIL_PORT = process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : 587;

let transporter = null;
let warned = false;

function getTransporter() {
  if (transporter) return transporter;

  if (!EMAIL_USER || !EMAIL_PASSWORD) {
    if (!warned) {
      console.warn('[EmailService] EMAIL_USER or EMAIL_PASSWORD missing. Emails will be logged to console.');
      warned = true;
    }
    transporter = {
      sendMail: async (mailOptions) => {
        console.log('[EmailService] (dev-fallback) Email would be sent to:', mailOptions.to);
        console.log('[EmailService] (dev-fallback) Subject:', mailOptions.subject);
        if (mailOptions.html) {
          const match = String(mailOptions.html).match(/https?:\/\/[^\s"']+/);
          if (match) console.log('[EmailService] (dev-fallback) Link:', match[0]);
        } else if (mailOptions.text) {
          const match = String(mailOptions.text).match(/https?:\/\/[^\s"']+/);
          if (match) console.log('[EmailService] (dev-fallback) Link:', match[0]);
        }
        return { accepted: [mailOptions.to], response: 'DEV-FALLBACK' };
      }
    };
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_PORT === 465,
    auth: { user: EMAIL_USER, pass: EMAIL_PASSWORD }
  });

  transporter.verify((err) => {
    if (err) {
      console.warn('[EmailService] transporter.verify error:', err.message || err);
    } else {
      console.log('[EmailService] SMTP transport verified.');
    }
  });

  return transporter;
}

export const sendVerificationEmail = async (to, name, link) => {
  const transporterInstance = getTransporter();
  const mailOptions = {
    from: EMAIL_FROM,
    to,
    subject: 'Verify your SMART PROJECTOR MANAGER account',
    html: `<p>Hello ${name || 'User'},</p>
           <p>Click to verify your email:</p>
           <p><a href="${link}">${link}</a></p>
           <p>If you didn't request this, ignore this message.</p>`
  };

  try {
    const result = await transporterInstance.sendMail(mailOptions);
    return { success: true, info: result };
  } catch (err) {
    console.error('[EmailService] sendVerificationEmail error:', err.message || err);
    return { success: false, error: err.message || err };
  }
};

export const sendOtpEmail = async (to, name, otp) => {
  const transporterInstance = getTransporter();
  const mailOptions = {
    from: EMAIL_FROM,
    to,
    subject: 'Your SMART PROJECTOR MANAGER OTP',
    text: `Hello ${name || 'User'},\n\nYour OTP is: ${otp}\nIt expires in 10 minutes.`
  };

  try {
    const result = await transporterInstance.sendMail(mailOptions);
    return { success: true, info: result };
  } catch (err) {
    console.error('[EmailService] sendOtpEmail error:', err.message || err);
    return { success: false, error: err.message || err };
  }
};

// default export (keeps old default-style imports working)
export default {
  sendVerificationEmail,
  sendOtpEmail
};
'@ > .\services\email.service.js
