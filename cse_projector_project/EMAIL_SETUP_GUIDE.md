# Email Integration Setup Guide

## Overview
This guide will help you integrate email sending functionality into your CSE Projector Management System. The system now sends automated emails for:

- 📧 **Booking Confirmations** - When users book a projector
- ✅ **Check-In Notifications** - When users check in a projector
- 🔄 **Check-Out Notifications** - When users check out a projector
- 👋 **Welcome Emails** - When new users register
- 🔔 **Admin Notifications** - When new users register (sent to admin)

## Files Created

### 1. Configuration Files
- `backend/config/email.js` - Email SMTP configuration
- `backend/services/email.service.js` - Email service with all email templates

### 2. Updated Controllers
- `backend/controllers/booking.controller.js` - Added booking confirmation emails
- `backend/controllers/projector.controller.js` - Added check-in/out notifications
- `backend/controllers/auth.controller.js` - Added welcome emails

### 3. Configuration
- `backend/package.json` - Added nodemailer dependency
- `backend/.env.example` - Added email configuration variables

## Setup Instructions

### Step 1: Install Dependencies

Run this command in the `backend` folder:

```bash
npm install nodemailer
```

Or if you already have a package-lock.json:

```bash
npm install
```

### Step 2: Configure Email Settings

#### Option A: Using Gmail (Recommended for Testing)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Create an App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the generated 16-character password

3. **Update your `.env` file**:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
EMAIL_FROM=your-gmail@gmail.com
ADMIN_EMAIL=admin@example.com
```

#### Option B: Using Outlook/Hotmail

```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
EMAIL_FROM=your-email@outlook.com
```

#### Option C: Using Yahoo Mail

```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=your-email@yahoo.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-email@yahoo.com
```

#### Option D: Using Custom SMTP Server

```env
EMAIL_HOST=your-smtp-server.com
EMAIL_PORT=587
EMAIL_USER=your-username
EMAIL_PASSWORD=your-password
EMAIL_FROM=noreply@yourdomain.com
```

### Step 3: Update Your Existing .env File

If you already have a `.env` file, add these lines:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
ADMIN_EMAIL=admin@example.com
```

### Step 4: Restart Your Server

```bash
npm run dev
```

## Email Templates

The system includes these email templates:

### 1. Booking Confirmation
Sent when a user creates a new booking. Includes:
- Projector name
- Start and end time
- Purpose of booking

### 2. Check-In Notification
Sent when a user checks in a projector. Includes:
- Projector name
- Check-in timestamp

### 3. Check-Out Notification
Sent when a user checks out a projector. Includes:
- Projector name
- Check-out timestamp

### 4. Welcome Email
Sent to new users upon registration. Includes:
- Welcome message
- List of available features

### 5. Admin Notification
Sent to admin when new users register. Includes:
- New user details
- Registration timestamp

## Testing Email Functionality

### Test 1: Registration Email
1. Register a new user
2. Check the user's email inbox for welcome message
3. Check admin email for new user notification (if ADMIN_EMAIL is set)

### Test 2: Booking Confirmation
1. Login and create a new booking
2. Check email for booking confirmation

### Test 3: Check-In/Out Notifications
1. Check in a projector
2. Verify check-in notification email
3. Check out the projector
4. Verify check-out notification email

## Troubleshooting

### Problem: Emails not sending

**Solution 1**: Check console logs
- Look for error messages like "Failed to send email"
- Verify SMTP credentials are correct

**Solution 2**: Gmail-specific issues
- Make sure 2FA is enabled
- Use App Password, not regular password
- Allow "Less secure app access" (if not using App Password)

**Solution 3**: Port issues
- Try port 465 with `secure: true` for SSL
- Try port 587 with `secure: false` for TLS

**Solution 4**: Firewall/Network
- Check if your network blocks SMTP ports
- Try from a different network

### Problem: Emails go to spam

**Solutions**:
- Add proper SPF/DKIM records if using custom domain
- Use a verified email address
- Avoid spam trigger words in subject lines
- Add your domain to email whitelist

### Problem: Rate limiting

**Solutions**:
- Gmail: Max 500 emails/day for free accounts
- Consider using email service like SendGrid, Mailgun for production
- Implement email queuing system

## Production Recommendations

### 1. Use Professional Email Service
For production, consider using:
- **SendGrid** - Free tier: 100 emails/day
- **Mailgun** - Free tier: 1000 emails/month
- **Amazon SES** - Very cheap, highly reliable
- **Postmark** - Transactional email specialist

### 2. Implement Email Queue
Use a queue system like:
- **Bull** (Redis-based)
- **Agenda** (MongoDB-based)
- **RabbitMQ**

### 3. Add Email Logging
Log all sent emails to database for:
- Audit trails
- Debugging
- Analytics

### 4. Template Management
Consider moving templates to:
- Database for easy editing
- Separate template files (Handlebars/Pug)
- Email template service (MJML)

### 5. Error Handling
- Implement retry logic
- Set up error monitoring (Sentry)
- Create fallback mechanisms

## Email Service API Reference

### Available Methods

```javascript
const emailService = require('../services/email.service.js');

// Send booking confirmation
await emailService.sendBookingConfirmation(userEmail, userName, {
  projectorName: 'Epson EB-X41',
  startTime: '2024-03-20T10:00:00',
  endTime: '2024-03-20T12:00:00',
  purpose: 'Seminar'
});

// Send check-in notification
await emailService.sendCheckInNotification(userEmail, userName, projectorName);

// Send check-out notification
await emailService.sendCheckOutNotification(userEmail, userName, projectorName);

// Send welcome email
await emailService.sendWelcomeEmail(userEmail, userName);

// Send admin notification
await emailService.sendAdminNewUserNotification(adminEmail, userData);

// Send booking reminder
await emailService.sendBookingReminder(userEmail, userName, bookingDetails);

// Send custom email
await emailService.sendEmail(to, subject, htmlContent);
```

## Advanced Features (Future Enhancements)

### 1. Email Preferences
Allow users to:
- Opt-out of certain notifications
- Choose email frequency
- Select notification types

### 2. Email Scheduling
- Send reminder emails 1 hour before booking
- Daily digest of activities
- Weekly reports

### 3. Email Analytics
Track:
- Open rates
- Click rates
- Bounce rates

### 4. Multi-language Support
- Detect user language
- Send emails in preferred language

## Environment Variables Reference

```env
# Required
EMAIL_HOST=smtp.gmail.com          # SMTP server hostname
EMAIL_PORT=587                     # SMTP port (587 for TLS, 465 for SSL)
EMAIL_USER=your-email@gmail.com    # SMTP username
EMAIL_PASSWORD=your-password       # SMTP password or app password
EMAIL_FROM=your-email@gmail.com    # From email address

# Optional
ADMIN_EMAIL=admin@example.com      # Admin notification email
```

## Security Best Practices

1. **Never commit `.env` file** - Add to `.gitignore`
2. **Use App Passwords** - Don't use actual account passwords
3. **Rotate credentials** - Change passwords periodically
4. **Limit email rate** - Prevent abuse
5. **Validate email addresses** - Before sending
6. **Use HTTPS** - For email links
7. **Sanitize content** - Prevent injection attacks

## Support

If you encounter issues:
1. Check the console logs for detailed error messages
2. Verify all environment variables are set correctly
3. Test with a simple email first
4. Check your email provider's documentation

## Credits

Email integration developed for CSE Projector Management System by Satya Nikhil
