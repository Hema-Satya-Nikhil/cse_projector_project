# ✅ MongoDB User Authentication - Setup Complete!

## What's Been Set Up

Your CSE Projector Management System now has **MongoDB database** configured for user login credentials!

### 🎯 What You Have

1. **MongoDB Connection** - Ready to connect to your database
2. **User Model** - Stores usernames and passwords securely
3. **Password Hashing** - Automatic bcrypt hashing (10 rounds)
4. **Authentication API** - Login and Register endpoints
5. **JWT Tokens** - Secure authentication tokens
6. **Testing Tools** - Scripts to test your connection

---

## 📁 Files Created/Updated

### New Files
```
backend/
├── test-mongo-connection.js    [NEW] - Test MongoDB connection
└── setup-mongodb.ps1            [NEW] - Automated setup script

root/
├── MONGODB_SETUP_GUIDE.md       [NEW] - Complete setup guide
└── MONGODB_QUICK_REFERENCE.md   [NEW] - Quick reference
```

### Updated Files
```
backend/
└── .env                         [UPDATED] - MongoDB connection string configured
```

### Existing Files (Already in your project)
```
backend/
├── config/database.js           - MongoDB connection logic
├── models/User.model.js         - User schema with password hashing
├── controllers/auth.controller.js - Login/Register endpoints
└── scripts/seed.js              - Create sample users
```

---

## 🚀 Next Steps - Choose Your Path

### Path 1: Use MongoDB Atlas (Cloud) ⭐ RECOMMENDED

**Step 1:** Get your MongoDB Atlas password
- Go to: https://cloud.mongodb.com/
- Database Access → User `listentogether` → Edit Password

**Step 2:** Update `backend/.env` file
```env
MONGODB_URI=mongodb+srv://listentogether:YOUR_PASSWORD@listentogether.bbwwxmn.mongodb.net/cse_projector_db?retryWrites=true&w=majority
```
Replace `YOUR_PASSWORD` with your actual password

**Step 3:** Whitelist your IP
- Network Access → Add IP Address → Allow from Anywhere (for development)

**Step 4:** Test & Start
```bash
cd backend
node test-mongo-connection.js
npm run seed
npm run dev
```

### Path 2: Use Local MongoDB

**Step 1:** Install MongoDB
- Download: https://www.mongodb.com/try/download/community
- Or: `choco install mongodb`

**Step 2:** Start MongoDB service
```powershell
net start MongoDB
```

**Step 3:** Update `backend/.env` file
```env
# Comment out Atlas connection:
# MONGODB_URI=mongodb+srv://listentogether:...

# Use local connection:
MONGODB_URI=mongodb://localhost:27017/cse_projector_db
```

**Step 4:** Test & Start
```bash
cd backend
node test-mongo-connection.js
npm run seed
npm run dev
```

---

## 🧪 Test Your Setup

### Option 1: Automated Setup (Recommended)
```powershell
cd backend
.\setup-mongodb.ps1
```

This script will:
- ✅ Check your .env file
- ✅ Help you configure MongoDB
- ✅ Test the connection
- ✅ Offer to seed the database

### Option 2: Manual Testing

**Test 1: Connection**
```bash
node test-mongo-connection.js
```

**Test 2: Seed Database**
```bash
npm run seed
```

**Test 3: Start Server**
```bash
npm run dev
```

**Test 4: Register User (PowerShell)**
```powershell
$body = @{
    name = "Test User"
    email = "test@cse.edu"
    password = "password123"
    designation = "Professor"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

---

## 👤 Sample Users (After Seeding)

After running `npm run seed`, you'll have these users:

| Email | Password | Role |
|-------|----------|------|
| admin@cse.edu | admin123 | admin |
| nikhil@cse.edu | nikhil123 | faculty |
| rajesh@cse.edu | rajesh123 | faculty |

---

## 🔒 How User Authentication Works

### User Data Storage
```javascript
{
  name: "John Doe",
  email: "john@cse.edu",           // Username (unique)
  password: "$2a$10$hash...",       // Bcrypt hashed password
  role: "faculty",                  // User role
  designation: "Professor"
}
```

### Login Flow
```
1. User enters email & password
   ↓
2. Server finds user by email
   ↓
3. Server compares password hash
   ↓
4. If valid: Generate JWT token
   ↓
5. Return token to client
   ↓
6. Client uses token for authenticated requests
```

### Security Features
- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ Passwords never stored in plain text
- ✅ Passwords never returned in API responses
- ✅ JWT tokens for session management
- ✅ Email validation
- ✅ Minimum password length (6 characters)

---

## 📊 MongoDB Collections

Your database (`cse_projector_db`) will have:

### 1. users
Stores user credentials and profile info
```javascript
{
  _id: ObjectId("..."),
  name: "John Doe",
  email: "john@cse.edu",
  password: "$2a$10$...",  // Hashed
  role: "faculty",
  designation: "Professor",
  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
```

### 2. projectors
Stores projector inventory

### 3. bookings
Stores projector reservations

### 4. activities
Stores activity logs

---

## 🛠️ Useful Commands

```bash
# Backend directory
cd backend

# Test MongoDB connection
node test-mongo-connection.js

# Run automated setup
.\setup-mongodb.ps1

# Seed database with sample users
npm run seed

# Start development server
npm run dev

# Start demo server (no database)
npm run demo
```

---

## 📚 Documentation

| Document | Purpose | When to Use |
|----------|---------|-------------|
| `MONGODB_QUICK_REFERENCE.md` | Quick commands & tips | Daily reference |
| `MONGODB_SETUP_GUIDE.md` | Complete setup guide | Initial setup & troubleshooting |
| This file | Overview & next steps | Getting started |

---

## 🐛 Troubleshooting

### MongoDB won't connect?

**Check 1:** Run connection test
```bash
node test-mongo-connection.js
```

**Check 2:** Verify `.env` file
```bash
cat .env | grep MONGODB_URI
```

**Check 3:** For Atlas
- Password is correct (no `<` or `>` characters)
- IP is whitelisted in Network Access
- Internet connection is working

**Check 4:** For Local
- MongoDB service is running: `net start MongoDB`
- Port 27017 is not blocked

### Can't login?

**Check 1:** User exists in database
- Use MongoDB Compass to view users collection
- Or seed database: `npm run seed`

**Check 2:** Password is correct
- Passwords are case-sensitive
- Try sample users: `nikhil@cse.edu` / `nikhil123`

**Check 3:** Server is running
```bash
npm run dev
```

---

## 🔍 View Your Data

### Using MongoDB Compass (GUI)
1. Download: https://www.mongodb.com/products/compass
2. Connect using your connection string
3. Browse `cse_projector_db` → `users`
4. View all registered users

### Using MongoDB Atlas Dashboard
1. Go to: https://cloud.mongodb.com/
2. Click **Browse Collections**
3. Select `cse_projector_db` database
4. View all collections

---

## ✅ Setup Checklist

Complete these steps to get MongoDB working:

- [ ] Choose MongoDB Atlas or Local MongoDB
- [ ] Update `backend/.env` with connection string
- [ ] For Atlas: Replace `<db_password>` with actual password
- [ ] For Atlas: Whitelist IP address
- [ ] For Local: Install and start MongoDB service
- [ ] Test connection: `node test-mongo-connection.js`
- [ ] Seed database: `npm run seed`
- [ ] Start server: `npm run dev`
- [ ] Test login with sample user
- [ ] View data in MongoDB Compass or Atlas

---

## 🎉 What's Next?

Once MongoDB is connected:

1. **Start the frontend** - Users can register and login
2. **Test authentication** - Try logging in with sample users
3. **Create bookings** - Authenticated users can book projectors
4. **Check-in/out** - Users can manage projector usage
5. **View activity** - See all actions in the database

---

## 💡 Quick Tips

1. **Use MongoDB Compass** - It's the easiest way to view your data
2. **Seed the database** - Get sample users to test with
3. **Check console logs** - Server shows connection status
4. **Use sample users** - admin@cse.edu / admin123
5. **Keep .env safe** - Never commit to Git

---

## 🆘 Need Help?

1. Run: `node test-mongo-connection.js` for connection diagnostics
2. Check: `MONGODB_SETUP_GUIDE.md` for detailed instructions
3. View: Server console for error messages
4. Verify: `.env` file has correct connection string

---

## 📞 Quick Reference Card

```
┌─────────────────────────────────────────────────┐
│        MongoDB Connection Setup                  │
├─────────────────────────────────────────────────┤
│ File to Edit: backend/.env                      │
│                                                  │
│ Atlas (Cloud):                                   │
│ MONGODB_URI=mongodb+srv://user:pass@...         │
│                                                  │
│ Local:                                           │
│ MONGODB_URI=mongodb://localhost:27017/db        │
│                                                  │
│ Test Connection:                                 │
│ > node test-mongo-connection.js                 │
│                                                  │
│ Seed Database:                                   │
│ > npm run seed                                   │
│                                                  │
│ Start Server:                                    │
│ > npm run dev                                    │
└─────────────────────────────────────────────────┘
```

---

**Your MongoDB setup is ready! Just update the password in `.env` and you're good to go!** 🚀

Choose Atlas (cloud) or Local MongoDB, configure it, and start building! 🎯
