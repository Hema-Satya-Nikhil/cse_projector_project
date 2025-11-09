# Quick Test Guide - CSE Projector Management System

## 🌐 Access Application
**URL:** http://localhost:5173

---

## 👤 Login Credentials

### Admin Account
```
Email: nikhil@cse.edu
Password: password123
Role: Admin (Can add, delete, manage all)
```

### Faculty Account
```
Email: rajesh@cse.edu
Password: password123
Role: Faculty (Can checkout, checkin, book)
```

---

## ✉️ Email Verification Flow

Use this flow for any newly registered account. Registration now keeps accounts inactive until the email owner confirms the verification link.

### 1. Register a user

```powershell
curl --request POST "http://localhost:5000/api/auth/register" \
  --header "Content-Type: application/json" \
  --data '{"name":"Test Faculty","email":"test.faculty@cse.edu","password":"Password@123","designation":"Assistant Professor"}'
```

- ✅ Response includes `verificationEmailSent` and (when SMTP is disabled) a `verificationUrl` you can copy.
- ⚠️ When `EMAIL_USER` or `EMAIL_PASSWORD` are missing, the verification link is printed in the backend console under the tag `[EmailService] Verification link ...`.

### 2. Verify the email

```powershell
curl --request GET "http://localhost:5000/api/auth/verify-email?token=<PASTE_TOKEN_HERE>"
```

Expect `"message": "Email verified successfully"` on first use. Subsequent hits return `"Email already verified"`.

### 3. Login (after verification)

```powershell
curl --request POST "http://localhost:5000/api/auth/login" \
  --header "Content-Type: application/json" \
  --data '{"identifier":"test.faculty@cse.edu","password":"Password@123"}'
```

Unverified accounts will be blocked with HTTP 403 (`Please verify your email before logging in.`).

### Postman quick start

1. **Register:** New POST request → `http://localhost:5000/api/auth/register` → Body → `raw (JSON)` with the payload above. Send and note the token or console link.
2. **Verify:** Duplicate the request → change to GET → URL `http://localhost:5000/api/auth/verify-email?token=<token>` → Send. Store the 200 response.
3. **Login:** New POST request → `http://localhost:5000/api/auth/login` → Body → `{"identifier":"test.faculty@cse.edu","password":"Password@123"}` → Send to receive JWT.

💡 Keep the verification token handy for QA. Tokens expire after 24 hours (`exp: 1d`), so request a fresh registration if the link becomes invalid.

---

## ✅ Test Case 1: Checkout-Checkin Ownership

### Step 1: Login as Admin
- Email: `nikhil@cse.edu`
- Password: `password123`
- Click "Login"

### Step 2: Checkout Projector
- Go to **Dashboard**
- Find "Epson EB-X05" projector
- Click **"Check Out"** button
- Add note (optional): "For my lecture"
- Click **"Confirm"**
- ✅ Should see: "✅ Demo: Projector checked out!"
- ✅ Status changes to: 🔴 **In Use**
- ✅ Shows "Current User: Dr. Satya Nikhil (nikhil@cse.edu)"

### Step 3: View History
- On the projector card, click **"History (1)"**
- ✅ Should see entry:
  - Action: check-out
  - Status: in-use
  - User: nikhil@cse.edu
  - Timestamp: just now

### Step 4: Logout and Login as Faculty
- Click profile → **Logout**
- Login with: `rajesh@cse.edu` / `password123`
- Go to **Dashboard**

### Step 5: Try to Checkin (Should FAIL)
- Find "Epson EB-X05" (should be 🔴 In Use)
- Click **"Check In"** button (if visible for faculty)
- ❌ Should see: "❌ Only Dr. Satya Nikhil can check in this projector"
- ✅ Projector is still in use ← OWNERSHIP PROTECTED

### Step 6: Logout and Login as Admin to Checkin
- Logout as Dr. Rajesh
- Login as `nikhil@cse.edu` again
- On "Epson EB-X05", click **"Check In"**
- Add note: "Class complete"
- Click **"Confirm"**
- ✅ Should see: "✅ Demo: Projector checked in!"
- ✅ Status changes to: 🟢 **Available**

---

## ✅ Test Case 2: Admin-Only Delete

### Step 1: Login as Faculty
- Email: `rajesh@cse.edu`
- Password: `password123`

### Step 2: Go to Admin Panel
- Click **"Admin Panel"** in navigation
- ❌ Should see: "Access denied. Admin only."
- Redirects to Dashboard

### Step 3: Login as Admin
- Logout and login as `nikhil@cse.edu`
- Click **"Admin Panel"** in navigation
- ✅ Page loads with projectors table

### Step 4: Delete Projector
- Find projector row
- Click **"Delete"** button
- Confirm deletion in popup
- ✅ Should see: "✅ Demo: Projector deleted!"
- ✅ Projector removed from list
- ✅ Activity log shows deletion

---

## ✅ Test Case 3: Status Tracking

### Step 1: Dashboard View
- All projectors show status badges:
  - 🟢 **Available** - Ready to checkout
  - 🔴 **In Use** - Currently checked out
  - 🟡 **Booked** - Reserved

### Step 2: Checkout Projector
- Click "Check Out" on available projector
- Status → 🔴 **In Use**
- Current user visible
- Cannot checkout again (button disabled)

### Step 3: Checkin Projector
- Click "Check In" on in-use projector
- Status → 🟢 **Available**
- Current user cleared
- Checkout button available again

---

## ✅ Test Case 4: History Panel

### Step 1: Any Dashboard
- Scroll to any projector card
- Click **"History (X)"** button

### Step 2: View History
- ✅ Should show expandable panel with entries:
  ```
  check-out - in-use
  nikhil@cse.edu
  For my lecture
  Nov 07, 2024 12:30 PM
  ```

### Step 3: Multiple Actions
- Checkout projector
- Checkin projector
- History now shows: **History (2)**
- Both entries visible with timestamps

---

## ✅ Test Case 5: Admin Panel Features

### Step 1: Statistics
- View dashboard stats:
  - Total Activities
  - Total Check-outs
  - Total Check-ins
  - Total Bookings

### Step 2: Projectors Table
- Shows all 2 projectors (Epson, Ozar)
- Status column displays:
  - Available
  - In Use
  - Booked
- Delete buttons only visible to admin

### Step 3: Recent Activity Log
- Shows last 20 activities
- Columns:
  - User (who did action)
  - Action (check-out, check-in, etc)
  - Projector (which projector)
  - Notes
  - Time

---

## 🎯 Expected Behavior Summary

| Feature | Expected Result |
|---------|-----------------|
| Checkout | ✅ Status → In Use, show current user |
| Checkin by owner | ✅ Status → Available, clear current user |
| Checkin by non-owner | ❌ Error: "Only [Name] can check in" |
| Delete by admin | ✅ Success, activity logged |
| Delete by faculty | ❌ Error: "Only admins can delete" |
| History expand | ✅ Shows all actions with details |
| Status badges | ✅ 🟢 Available, 🔴 In Use, 🟡 Booked |
| Admin panel access | ✅ Admin only, faculty redirected |

---

## 🐛 Troubleshooting

### Can't see "Check In" button
- **Reason:** You're not the one who checked it out
- **Fix:** Only original checkout person can check in

### Delete button not showing
- **Reason:** You're not logged in as admin
- **Fix:** Login with `nikhil@cse.edu` (admin account)

### History not showing
- **Reason:** Click the "History (X)" button to expand
- **Fix:** Look for history button below projector details

### Projectors showing wrong status
- **Reason:** Need to checkout/checkin to update
- **Fix:** Perform action, status updates immediately

---

## 📱 College Information

**Institution:** SRINIVASA INSTITUTE OF ENGINEERING AND TECHNOLOGY  
**Department:** Computer Science and Engineering  
**System:** Projector Management System  
**Developer:** Dr. Satya Nikhil  

---

## ✨ Key Features Demonstrated

✅ Ownership-based checkout/checkin  
✅ Real-time status tracking  
✅ Complete activity history  
✅ Admin-only operations  
✅ User email display and validation  
✅ College branding and developer credit  
✅ 2 projectors (Epson, Ozar)  

**Demo mode working perfectly without MongoDB!** 🎉
