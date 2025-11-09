# MongoDB Quick Reference - User Authentication

## ⚡ Quick Start (3 Steps)

### Step 1: Update Password in `.env`
Open `backend/.env` and replace `<db_password>` with your actual MongoDB Atlas password:

```env
MONGODB_URI=mongodb+srv://listentogether:YOUR_ACTUAL_PASSWORD@listentogether.bbwwxmn.mongodb.net/cse_projector_db?retryWrites=true&w=majority
```

### Step 2: Test Connection
```bash
cd backend
node test-mongo-connection.js
```

### Step 3: Start Server
```bash
npm run dev
```

---

## 🔑 Get Your MongoDB Atlas Password

1. Go to: https://cloud.mongodb.com/
2. Login to your account
3. Click **Database Access** (left sidebar)
4. Find user: `listentogether`
5. Click **Edit** → **Edit Password**
6. Copy the password
7. Update `.env` file

---

## 👤 User Authentication - How It Works

### User Model Fields
```javascript
{
  name: "John Doe",           // Full name
  email: "john@cse.edu",      // Username (unique)
  password: "hashed_password", // Bcrypt hashed
  role: "faculty",            // 'faculty' or 'admin'
  designation: "Professor",   // Job title
  department: "CSE",          // Department
  isActive: true              // Account status
}
```

### Password Security
- ✅ **Automatically hashed** with bcrypt (10 salt rounds)
- ✅ **Never stored in plain text**
- ✅ **Never returned in API responses**
- ✅ **Minimum 6 characters required**

---

## 🧪 Test User Login

### Register New User (PowerShell)
```powershell
$body = @{
    name = "John Doe"
    email = "john@cse.edu"
    password = "password123"
    designation = "Professor"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

### Login with User (PowerShell)
```powershell
$body = @{
    email = "john@cse.edu"
    password = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

### Expected Response
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@cse.edu",
    "role": "faculty",
    "designation": "Professor"
  }
}
```

---

## 📊 Sample Users (After Seeding)

Run: `npm run seed` to create these users:

### Admin Account
- **Email:** `admin@cse.edu`
- **Password:** `admin123`
- **Role:** admin

### Faculty Accounts
- **Email:** `nikhil@cse.edu` | **Password:** `nikhil123`
- **Email:** `rajesh@cse.edu` | **Password:** `rajesh123`

---

## 🔧 MongoDB Connection Options

### Option 1: MongoDB Atlas (Cloud) ⭐ RECOMMENDED
```env
MONGODB_URI=mongodb+srv://listentogether:YOUR_PASSWORD@listentogether.bbwwxmn.mongodb.net/cse_projector_db?retryWrites=true&w=majority
```

**Pros:**
- ✅ No installation needed
- ✅ Free tier available
- ✅ Automatic backups
- ✅ Access from anywhere

**Setup:**
1. Update password in `.env`
2. Whitelist IP in Network Access
3. Test connection

### Option 2: Local MongoDB
```env
MONGODB_URI=mongodb://localhost:27017/cse_projector_db
```

**Pros:**
- ✅ Complete control
- ✅ Faster for development
- ✅ No internet needed

**Setup:**
1. Download: https://www.mongodb.com/try/download/community
2. Install MongoDB
3. Start service: `net start MongoDB`
4. Update `.env` to use localhost

---

## 🎯 Authentication Flow

### Registration
```
Client → POST /api/auth/register
  ↓
Server validates email format
  ↓
Server checks if email exists
  ↓
Password is hashed (bcrypt)
  ↓
User saved to MongoDB
  ↓
JWT token generated
  ↓
Return: { token, user }
```

### Login
```
Client → POST /api/auth/login
  ↓
Server finds user by email
  ↓
Server compares password hash
  ↓
If valid: Generate JWT token
  ↓
Return: { token, user }
```

### Protected Routes
```
Client → Request with JWT token
  ↓
Server validates JWT token
  ↓
If valid: Attach user to request
  ↓
Route handler processes request
```

---

## 📁 Database Collections

Your MongoDB will have these collections:

### 1. **users** - User credentials
- Stores login credentials
- Passwords are hashed
- Email is unique

### 2. **projectors** - Projector inventory
- All projectors in system
- Current status and location

### 3. **bookings** - Projector reservations
- Who booked which projector
- Start and end times

### 4. **activities** - Activity logs
- All user actions
- Audit trail

---

## 🐛 Common Issues

### ❌ "bad auth" Error
**Problem:** Wrong password in connection string
**Solution:**
1. Get password from MongoDB Atlas
2. Update `.env` file
3. Make sure no `<` or `>` characters in password

### ❌ "Connection timeout" Error
**Problem:** Can't reach MongoDB server
**Solution:**
1. Check internet connection
2. Whitelist IP in MongoDB Atlas Network Access
3. Try: 0.0.0.0/0 (Allow from anywhere) for testing

### ❌ "User already exists" Error
**Problem:** Email is already registered
**Solution:**
1. Use a different email
2. Or delete user from database
3. Or use login instead of register

### ❌ "Invalid credentials" Error
**Problem:** Wrong email or password
**Solution:**
1. Check email is correct
2. Check password is correct (case-sensitive)
3. Make sure user exists in database

---

## 🔍 View Database

### Using MongoDB Compass (GUI)
1. Download: https://www.mongodb.com/products/compass
2. Connect with your connection string
3. Browse `cse_projector_db` database
4. View `users` collection

### Using MongoDB Atlas Dashboard
1. Go to: https://cloud.mongodb.com/
2. Click **Browse Collections**
3. Select `cse_projector_db`
4. View all collections

---

## 🚀 Quick Commands

```bash
# Test MongoDB connection
node test-mongo-connection.js

# Seed database with sample users
npm run seed

# Start development server
npm run dev

# Start demo server (in-memory data)
npm run demo
```

---

## 📚 Files Reference

| File | Purpose |
|------|---------|
| `config/database.js` | MongoDB connection logic |
| `models/User.model.js` | User schema with password hashing |
| `controllers/auth.controller.js` | Login/Register endpoints |
| `test-mongo-connection.js` | Test MongoDB connection |
| `.env` | Environment variables (MongoDB URI, JWT secret) |
| `MONGODB_SETUP_GUIDE.md` | Detailed setup instructions |

---

## 🔒 Security Checklist

- [ ] MongoDB password is strong
- [ ] JWT_SECRET is changed from default
- [ ] `.env` file is in `.gitignore`
- [ ] IP whitelist configured in Atlas
- [ ] Passwords are hashed (automatic)
- [ ] HTTPS in production

---

## 💡 Pro Tips

1. **Use MongoDB Compass** - Visual database browser
2. **Enable MongoDB Atlas Alerts** - Get notified of issues
3. **Backup regularly** - Atlas has automatic backups
4. **Monitor slow queries** - Check Atlas Performance tab
5. **Use indexes** - For better query performance

---

## 📞 Need Help?

1. ✅ Check console for error messages
2. ✅ Run `node test-mongo-connection.js`
3. ✅ Verify `.env` file configuration
4. ✅ See `MONGODB_SETUP_GUIDE.md` for details
5. ✅ Check MongoDB Atlas dashboard

---

**Your MongoDB authentication system is ready to use!** 🎉
