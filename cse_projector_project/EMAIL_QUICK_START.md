# Quick Start: Email Integration

## 1. Install Nodemailer
```bash
cd backend
npm install nodemailer
```

## 2. Configure Email in .env

Add these to your `backend/.env` file:

```env
# Gmail Example
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
EMAIL_FROM=your-email@gmail.com
ADMIN_EMAIL=admin@example.com
```

### Getting Gmail App Password:
1. Enable 2-Factor Authentication on Gmail
2. Go to: https://myaccount.google.com/apppasswords
3. Create app password for "Mail"
4. Copy the 16-character password

## 3. Restart Server
```bash
npm run dev
```

## 4. Test It!

### Test Registration Email:
- Register a new user
- Check email inbox for welcome message

### Test Booking Email:
- Create a booking
- Check email for booking confirmation

### Test Check-In/Out:
- Check in/out a projector
- Check email for notifications

## Email Triggers

| Action | Email Sent | Recipient |
|--------|------------|-----------|
| User Registration | Welcome Email | New User |
| User Registration | Admin Notification | Admin |
| Create Booking | Booking Confirmation | Booking User |
| Check-In Projector | Check-In Notification | Current User |
| Check-Out Projector | Check-Out Notification | Current User |

## Files Modified

✅ `backend/config/email.js` - Email config
✅ `backend/services/email.service.js` - Email templates & sending
✅ `backend/controllers/auth.controller.js` - Welcome emails
✅ `backend/controllers/booking.controller.js` - Booking emails
✅ `backend/controllers/projector.controller.js` - Check-in/out emails
✅ `backend/package.json` - Added nodemailer
✅ `backend/.env.example` - Email variables

## Need Help?

See `EMAIL_SETUP_GUIDE.md` for detailed instructions and troubleshooting.
