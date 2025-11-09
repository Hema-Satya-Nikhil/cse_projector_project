# 📧 Email Integration for CSE Projector Management System

## Overview

This email integration adds automated email notifications to your projector management system. Users receive professional HTML emails for all important events.

## 🎯 Features

| Feature | Description | Status |
|---------|-------------|--------|
| Welcome Emails | Sent when users register | ✅ Ready |
| Booking Confirmations | Sent when bookings are created | ✅ Ready |
| Check-In Notifications | Sent when projectors are checked in | ✅ Ready |
| Check-Out Notifications | Sent when projectors are checked out | ✅ Ready |
| Admin Alerts | Notify admins of new registrations | ✅ Ready |
| Booking Reminders | Template ready for future use | ✅ Ready |

## 🚀 Quick Setup (3 minutes)

### Option 1: Automated Setup (Windows)
```powershell
.\setup-email.ps1
```

### Option 2: Manual Setup

**Step 1:** Install nodemailer
```bash
cd backend
npm install nodemailer
```

**Step 2:** Configure environment variables in `backend/.env`:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
ADMIN_EMAIL=admin@example.com
```

**Step 3:** Get Gmail App Password
1. Go to https://myaccount.google.com/apppasswords
2. Create app password for "Mail"
3. Copy the 16-character password
4. Use it as `EMAIL_PASSWORD`

**Step 4:** Start server
```bash
npm run dev
```

## 📝 Documentation

| Document | Purpose |
|----------|---------|
| `EMAIL_QUICK_START.md` | 5-minute setup guide |
| `EMAIL_SETUP_GUIDE.md` | Complete setup with troubleshooting |
| `EMAIL_INTEGRATION_SUMMARY.md` | What was integrated and how |
| `EMAIL_ARCHITECTURE.md` | Technical architecture diagrams |

## 📧 Email Examples

### Welcome Email
Sent when user registers:
```
Subject: Welcome to CSE Projector Management System

Dear John Doe,

Welcome to the CSE Projector Management System! 
Your account has been successfully created.

You can now:
• View available projectors
• Book projectors for your events
• Check-in and check-out projectors
• View your booking history
```

### Booking Confirmation
Sent when booking is created:
```
Subject: Booking Confirmation - Epson EB-X41

Dear John Doe,

Your projector booking has been confirmed:

Projector: Epson EB-X41
Start Time: March 20, 2024 10:00 AM
End Time: March 20, 2024 12:00 PM
Purpose: Department Seminar
```

### Check-In Notification
Sent when checking in:
```
Subject: Check-In Confirmed - Epson EB-X41

Dear John Doe,

You have successfully checked in the projector: Epson EB-X41

Time: March 20, 2024 10:05 AM

Please remember to check out when you're done.
```

## 🧪 Testing

### Test 1: Registration Email
```bash
# Register a new user via frontend or API
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "designation": "Professor"
  }'

# Check test@example.com inbox for welcome email
```

### Test 2: Booking Email
```bash
# Create a booking (requires authentication)
# Check user's email for booking confirmation
```

### Test 3: Check-In Email
```bash
# Check in a projector via frontend
# Check user's email for check-in notification
```

## 🗂️ Files Added/Modified

### New Files
```
backend/
├── config/
│   └── email.js                    ← Email configuration
├── services/
│   └── email.service.js            ← Email templates & logic
└── setup-email.ps1                 ← Installation script

root/
├── EMAIL_QUICK_START.md            ← Quick guide
├── EMAIL_SETUP_GUIDE.md            ← Detailed guide
├── EMAIL_INTEGRATION_SUMMARY.md    ← Integration overview
├── EMAIL_ARCHITECTURE.md           ← Technical docs
└── EMAIL_README.md                 ← This file
```

### Modified Files
```
backend/
├── controllers/
│   ├── auth.controller.js          ← + Welcome & admin emails
│   ├── booking.controller.js       ← + Booking confirmation
│   └── projector.controller.js     ← + Check-in/out emails
├── .env.example                    ← + Email variables
└── package.json                    ← + nodemailer dependency
```

## 🎨 Email Themes

Each email type has a unique color theme:

| Email Type | Color | Hex Code |
|------------|-------|----------|
| Welcome | Purple | #4F46E5 |
| Booking Confirmation | Blue | #4F46E5 |
| Check-In | Green | #10B981 |
| Check-Out | Red | #EF4444 |
| Admin Alert | Orange | #F59E0B |
| Reminder | Purple | #8B5CF6 |

## 🔧 Customization

### Change Email Templates
Edit `backend/services/email.service.js`:

```javascript
// Example: Customize welcome email
async sendWelcomeEmail(userEmail, userName) {
  const subject = 'Welcome!'; // Change subject
  const html = `
    <h1>Custom HTML here</h1>
  `;
  return await this.sendEmail(userEmail, subject, html);
}
```

### Add New Email Type
```javascript
// In email.service.js, add new method:
async sendCustomEmail(userEmail, data) {
  const subject = 'Custom Subject';
  const html = `Your custom HTML template`;
  return await this.sendEmail(userEmail, subject, html);
}

// In your controller:
import emailService from '../services/email.service.js';

await emailService.sendCustomEmail(user.email, { data });
```

## 🔒 Security

- ✅ Credentials stored in environment variables
- ✅ `.env` file in `.gitignore`
- ✅ Recommends App Passwords over regular passwords
- ✅ Error handling prevents credential leakage
- ✅ Non-blocking email sending (app continues if email fails)

## 🐛 Troubleshooting

### Emails not sending?

**Check 1:** Console logs
```bash
# Look for error messages in terminal
Failed to send email: {error details}
```

**Check 2:** Verify .env configuration
```bash
# Make sure all EMAIL_* variables are set
cat backend/.env | grep EMAIL
```

**Check 3:** Test credentials
```bash
# Try sending a test email
node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransporter({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});
transporter.sendMail({
  from: 'your-email@gmail.com',
  to: 'test@example.com',
  subject: 'Test',
  text: 'Test email'
}, (err, info) => {
  if (err) console.error(err);
  else console.log('Success:', info);
});
"
```

### Emails go to spam?
- Use a verified sender email
- Avoid spam trigger words
- Set up SPF/DKIM records for your domain

### Rate limiting?
- Gmail: 500 emails/day for free accounts
- Consider using SendGrid/Mailgun for production

## 📊 Email Statistics

Track email usage in your app:

```javascript
// Add to email.service.js
async sendEmail(to, subject, html) {
  try {
    const info = await this.transporter.sendMail({...});
    
    // Log to database
    await EmailLog.create({
      to,
      subject,
      status: 'sent',
      messageId: info.messageId,
      sentAt: new Date()
    });
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    // Log failure
    await EmailLog.create({
      to,
      subject,
      status: 'failed',
      error: error.message,
      sentAt: new Date()
    });
    
    return { success: false, error: error.message };
  }
}
```

## 🌟 Production Tips

### Use Professional Email Service
For production, use:
- **SendGrid** - 100 emails/day free
- **Mailgun** - 1000 emails/month free
- **Amazon SES** - Pay as you go
- **Postmark** - Transactional email specialist

### Example: SendGrid Integration
```javascript
// In config/email.js
const emailConfig = {
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
};
```

### Add Email Queue
For high volume, use a queue:
```bash
npm install bull redis
```

```javascript
// Create email queue
const Queue = require('bull');
const emailQueue = new Queue('emails');

emailQueue.process(async (job) => {
  const { to, subject, html } = job.data;
  await emailService.sendEmail(to, subject, html);
});

// Add to queue instead of direct send
emailQueue.add({ to, subject, html });
```

## 📈 Future Enhancements

Possible additions:
- [ ] Email preferences per user
- [ ] Scheduled reminder emails (cron jobs)
- [ ] Email templates in database
- [ ] Email analytics dashboard
- [ ] Multi-language support
- [ ] PDF attachments (booking receipts)
- [ ] QR codes for check-in
- [ ] Bulk email functionality
- [ ] Email verification on signup
- [ ] Password reset emails

## 🤝 Support

Need help?
1. Check the documentation files
2. Review console error messages
3. Verify .env configuration
4. Test with Gmail first (easiest)

## 📜 License

This integration is part of the CSE Projector Management System.

## 👨‍💻 Credits

Email integration developed for CSE Projector Management System.

---

**Ready to start?** Run `.\setup-email.ps1` or follow the Quick Setup guide!
