# Email Integration Architecture

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     Frontend (React)                             │
│  User performs actions: Register, Book, Check-in, Check-out     │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ HTTP Request
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Backend Controllers                            │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Auth       │  │   Booking    │  │  Projector   │         │
│  │  Controller  │  │  Controller  │  │  Controller  │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
│         │                  │                  │                  │
│         │ import           │ import           │ import          │
│         ▼                  ▼                  ▼                  │
│  ┌──────────────────────────────────────────────────┐          │
│  │        emailService (Singleton)                   │          │
│  │  • sendWelcomeEmail()                            │          │
│  │  • sendAdminNewUserNotification()               │          │
│  │  • sendBookingConfirmation()                    │          │
│  │  • sendCheckInNotification()                    │          │
│  │  • sendCheckOutNotification()                   │          │
│  └────────────────────┬─────────────────────────────┘          │
│                        │                                         │
│                        │ uses                                    │
│                        ▼                                         │
│  ┌──────────────────────────────────────────────────┐          │
│  │       Email Config (email.js)                    │          │
│  │  • Creates Nodemailer Transporter               │          │
│  │  • SMTP Settings from ENV                       │          │
│  └────────────────────┬─────────────────────────────┘          │
└─────────────────────────┼────────────────────────────────────────┘
                          │
                          │ SMTP Connection
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Email Server (SMTP)                            │
│  • Gmail (smtp.gmail.com:587)                                   │
│  • Outlook (smtp-mail.outlook.com:587)                         │
│  • Yahoo (smtp.mail.yahoo.com:587)                             │
│  • Custom SMTP Server                                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ Delivers Email
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    User Email Inbox                              │
│  📧 Receives formatted HTML emails                              │
└─────────────────────────────────────────────────────────────────┘
```

## File Structure

```
backend/
├── config/
│   └── email.js                    [NEW] SMTP configuration
│
├── services/
│   └── email.service.js            [NEW] Email templates & logic
│
├── controllers/
│   ├── auth.controller.js          [MODIFIED] + Welcome & Admin emails
│   ├── booking.controller.js       [MODIFIED] + Booking confirmation
│   └── projector.controller.js     [MODIFIED] + Check-in/out emails
│
├── .env.example                     [MODIFIED] + Email variables
└── package.json                     [MODIFIED] + nodemailer dependency

Root/
├── EMAIL_SETUP_GUIDE.md            [NEW] Detailed setup guide
├── EMAIL_QUICK_START.md            [NEW] Quick reference
└── EMAIL_INTEGRATION_SUMMARY.md    [NEW] Integration overview
```

## Data Flow Examples

### Example 1: User Registration

```
1. User submits registration form
   ↓
2. Frontend → POST /api/auth/register
   ↓
3. auth.controller.js:register()
   ├─→ Create user in DB
   ├─→ Generate JWT token
   ├─→ emailService.sendWelcomeEmail(user.email, user.name)
   │   └─→ Send HTML email via SMTP
   └─→ emailService.sendAdminNewUserNotification(adminEmail, user)
       └─→ Send notification to admin
   ↓
4. Return response to frontend
   ↓
5. User receives welcome email
6. Admin receives new user notification
```

### Example 2: Creating Booking

```
1. User creates booking
   ↓
2. Frontend → POST /api/bookings
   ↓
3. booking.controller.js:createBooking()
   ├─→ Validate projector availability
   ├─→ Create booking in DB
   ├─→ Update projector status
   ├─→ Log activity
   └─→ emailService.sendBookingConfirmation(
         userEmail,
         userName,
         {projectorName, startTime, endTime, purpose}
       )
       └─→ Send confirmation email
   ↓
4. Return booking data to frontend
   ↓
5. User receives booking confirmation email
```

### Example 3: Check-In Projector

```
1. User clicks check-in
   ↓
2. Frontend → POST /api/projectors/:id/checkout
   ↓
3. projector.controller.js:checkOutProjector()
   ├─→ Validate projector is available
   ├─→ Update status to 'checked-out'
   ├─→ Set currentUser
   ├─→ Log activity
   └─→ emailService.sendCheckInNotification(
         userEmail,
         userName,
         projectorName
       )
       └─→ Send notification email
   ↓
4. Return updated projector to frontend
   ↓
5. User receives check-in notification
```

## Environment Variables Flow

```
.env file
  ↓
process.env.EMAIL_HOST ──────┐
process.env.EMAIL_PORT ──────┤
process.env.EMAIL_USER ──────┼──→ config/email.js
process.env.EMAIL_PASSWORD ──┤      ↓
process.env.EMAIL_FROM ──────┘   emailConfig
                                     ↓
                               createTransporter()
                                     ↓
                                 Nodemailer
                                 Transporter
                                     ↓
                              services/email.service.js
                                     ↓
                               Email Templates
                                     ↓
                                 SMTP Server
```

## Email Service Class Structure

```javascript
EmailService
├── constructor()
│   └── Initialize transporter
│
├── sendEmail(to, subject, html)
│   └── Core email sending method
│
├── sendBookingConfirmation(email, name, details)
│   └── Blue-themed booking email
│
├── sendCheckInNotification(email, name, projector)
│   └── Green-themed check-in email
│
├── sendCheckOutNotification(email, name, projector)
│   └── Red-themed check-out email
│
├── sendAdminNewUserNotification(email, userData)
│   └── Orange-themed admin alert
│
├── sendWelcomeEmail(email, name)
│   └── Purple-themed welcome email
│
└── sendBookingReminder(email, name, details)
    └── Purple-themed reminder email
```

## Error Handling Flow

```
Controller calls emailService
  ↓
Try-Catch Block
  ↓
  ├─→ Success
  │   ├─→ Email sent
  │   ├─→ Log: "Email sent: {messageId}"
  │   └─→ Continue with response
  │
  └─→ Failure
      ├─→ Catch error
      ├─→ Log: "Email sending error: {error}"
      └─→ Continue with response (non-blocking)
              ↑
              └─ User still gets success response
                 even if email fails
```

## Email Template Structure

```
HTML Email Template
│
├── DOCTYPE & HTML
│
├── HEAD
│   └── STYLE
│       ├── body (font, color)
│       ├── .container (layout)
│       ├── .header (colored banner)
│       ├── .content (main area)
│       ├── .details (info box)
│       └── .footer (credits)
│
└── BODY
    └── .container
        ├── .header
        │   └── <h1>Email Title</h1>
        │
        ├── .content
        │   ├── <p>Greeting</p>
        │   ├── <p>Message</p>
        │   └── .details
        │       └── Dynamic content
        │
        └── .footer
            └── System info
```

## Color Coding

```
Welcome Email         → Purple (#4F46E5)
Booking Confirmation  → Blue (#4F46E5)
Check-In Notification → Green (#10B981)
Check-Out Notification→ Red (#EF4444)
Admin Notification    → Orange (#F59E0B)
Booking Reminder      → Purple (#8B5CF6)
```

## Integration Points Summary

| Controller | Method | Email Function | When Triggered |
|------------|--------|----------------|----------------|
| auth.controller.js | register() | sendWelcomeEmail() | User signs up |
| auth.controller.js | register() | sendAdminNewUserNotification() | User signs up |
| booking.controller.js | createBooking() | sendBookingConfirmation() | Booking created |
| projector.controller.js | checkOutProjector() | sendCheckInNotification() | User checks in |
| projector.controller.js | checkInProjector() | sendCheckOutNotification() | User checks out |

## Dependencies Graph

```
nodemailer (npm package)
    ↓
config/email.js
    ↓
services/email.service.js
    ↓
    ├─→ controllers/auth.controller.js
    ├─→ controllers/booking.controller.js
    └─→ controllers/projector.controller.js
```

---

This architecture ensures:
- ✅ Separation of concerns
- ✅ Reusable email templates
- ✅ Non-blocking email sending
- ✅ Easy to maintain and extend
- ✅ Environment-based configuration
- ✅ Error handling at all levels
