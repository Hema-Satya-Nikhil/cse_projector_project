# MongoDB Setup Guide for CSE Projector Management System

## Overview

Your project is configured to use MongoDB for storing user credentials and all application data. This guide will help you set up MongoDB for user authentication.

## Current Setup Status

✅ **MongoDB Connection** - Configured in `config/database.js`
✅ **User Model** - Created with password hashing in `models/User.model.js`
✅ **Authentication Controller** - Login/Register in `controllers/auth.controller.js`
✅ **Environment Variables** - `.env` file exists

## MongoDB Connection Options

You have **two options** for MongoDB:

### Option 1: MongoDB Atlas (Cloud) - **RECOMMENDED**
- Free tier available
- No installation needed
- Accessible from anywhere
- Automatic backups

### Option 2: MongoDB Local (Your Computer)
- Runs on your machine
- Complete control
- Faster for development
- Requires installation

---

## Option 1: MongoDB Atlas Setup (Cloud)

### Step 1: Update Your Connection String

I see you already have an Atlas connection string! Update your `.env` file:

```env
# Replace <db_password> with your actual database password
MONGODB_URI=mongodb+srv://listentogether:<YOUR_ACTUAL_PASSWORD>@listentogether.bbwwxmn.mongodb.net/cse_projector_db?retryWrites=true&w=majority
```

**Important Changes:**
1. Replace `<db_password>` with your actual MongoDB Atlas password
2. Added database name: `cse_projector_db`
3. Added `retryWrites=true&w=majority` for better reliability

### Step 2: Get Your Password

If you don't remember your MongoDB Atlas password:

1. Go to https://cloud.mongodb.com/
2. Login to your account
3. Click on **Database Access** (left sidebar)
4. Find user `listentogether`
5. Click **Edit** → **Edit Password**
6. Set a new password or copy existing one
7. Update your `.env` file

### Step 3: Whitelist Your IP Address

1. In MongoDB Atlas, go to **Network Access**
2. Click **Add IP Address**
3. Choose one:
   - **Add Current IP Address** (your current IP)
   - **Allow Access from Anywhere** (0.0.0.0/0) - For development only!

### Step 4: Test Connection

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected: listentogether.bbwwxmn.mongodb.net
📊 Database: cse_projector_db
🚀 Server running on port 5000
```

---

## Option 2: MongoDB Local Setup

### Step 1: Install MongoDB

**Windows:**
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Complete" installation
4. Install as a Windows Service
5. Install MongoDB Compass (GUI tool)

**Or using Chocolatey:**
```powershell
choco install mongodb
```

### Step 2: Start MongoDB Service

**Windows:**
```powershell
# Start MongoDB service
net start MongoDB

# Or if that doesn't work:
mongod --dbpath "C:\data\db"
```

Create the data directory first:
```powershell
mkdir C:\data\db
```

### Step 3: Update .env File

```env
# Local MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/cse_projector_db
```

### Step 4: Test Connection

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected: localhost
📊 Database: cse_projector_db
🚀 Server running on port 5000
```

---

## User Authentication Setup

Your User model already includes:

### 1. User Schema Fields
```javascript
{
  name: String,           // User's full name
  email: String,          // Unique email (username)
  password: String,       // Hashed password
  role: String,           // 'faculty' or 'admin'
  department: String,     // Department name
  designation: String,    // Job title
  isActive: Boolean       // Account status
}
```

### 2. Password Security
- ✅ **Automatic Hashing** - Passwords are hashed with bcrypt
- ✅ **Salt Rounds** - 10 rounds for security
- ✅ **Comparison Method** - `comparePassword()` for login
- ✅ **Never Exposed** - Password never returned in API responses

### 3. Authentication Flow

```
Registration:
1. User submits: name, email, password
2. Server validates email format
3. Server checks if email already exists
4. Password is hashed (bcrypt)
5. User saved to MongoDB
6. JWT token generated
7. Token returned to client

Login:
1. User submits: email, password
2. Server finds user by email
3. Server compares password hash
4. If valid, JWT token generated
5. Token returned to client
```

---

## Testing User Authentication

### Test 1: Register a New User

Using PowerShell:
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

Expected Response:
```json
{
  "success": true,
  "message": "User registered successfully",
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

### Test 2: Login with User

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

Expected Response:
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

### Test 3: Check Database

**Using MongoDB Compass:**
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017` (local) or your Atlas connection
3. Navigate to `cse_projector_db` → `users`
4. You should see your registered user with hashed password

**Using MongoDB Shell:**
```bash
mongosh

use cse_projector_db
db.users.find()
```

---

## Seed Database with Sample Users

Run the seed script to create sample users:

```bash
npm run seed
```

This creates:
- Admin user: `admin@cse.edu` / `admin123`
- Faculty user: `nikhil@cse.edu` / `nikhil123`
- Faculty user: `rajesh@cse.edu` / `rajesh123`

---

## Environment Variables Reference

### Required for MongoDB:

```env
# MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cse_projector_db?retryWrites=true&w=majority

# OR MongoDB Local
MONGODB_URI=mongodb://localhost:27017/cse_projector_db

# JWT for Authentication
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d
```

### Generate a Secure JWT Secret:

**PowerShell:**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

This generates a random 32-character string. Update your `.env`:
```env
JWT_SECRET=aB3dE7gH2jK5mN8pQ1rS4tU6vW9xY0zA
```

---

## Common Issues & Solutions

### Issue 1: "MongoDB Connection Error"

**Solution:**
- Check if MongoDB is running
- Verify connection string in `.env`
- Check network/firewall settings
- For Atlas: Whitelist your IP address

### Issue 2: "User already exists"

**Solution:**
- Email must be unique
- Use a different email
- Or delete existing user from database

### Issue 3: "Invalid credentials"

**Solution:**
- Check email and password are correct
- Passwords are case-sensitive
- Make sure user exists in database

### Issue 4: "MongoServerError: bad auth"

**Solution:**
- Password in connection string is incorrect
- Update password in MongoDB Atlas
- Update `.env` file with correct password

### Issue 5: "Connection timeout"

**Solution:**
- Check internet connection (for Atlas)
- Verify IP whitelist (for Atlas)
- Check if MongoDB service is running (for local)

---

## Security Best Practices

### 1. Environment Variables
✅ Never commit `.env` file to Git
✅ Use strong JWT secrets
✅ Rotate secrets periodically

### 2. Password Security
✅ Minimum 6 characters (enforced in model)
✅ Automatic hashing with bcrypt
✅ Passwords never stored in plain text
✅ Passwords never returned in responses

### 3. MongoDB Security
✅ Use strong database passwords
✅ Restrict IP access (Atlas)
✅ Use authentication (always)
✅ Regular backups

### 4. JWT Security
✅ Use HTTPS in production
✅ Short expiration times
✅ Store tokens securely on client
✅ Implement token refresh

---

## Database Collections

Your MongoDB database will have these collections:

### 1. `users` - User credentials
```javascript
{
  _id: ObjectId,
  name: "John Doe",
  email: "john@cse.edu",
  password: "$2a$10$hashed_password_here",
  role: "faculty",
  department: "Computer Science and Engineering",
  designation: "Professor",
  isActive: true,
  createdAt: ISODate,
  updatedAt: ISODate
}
```

### 2. `projectors` - Projector inventory
```javascript
{
  _id: ObjectId,
  name: "Epson EB-X41",
  brand: "Epson",
  model: "EB-X41",
  status: "available",
  currentUser: ObjectId (ref: User),
  // ... more fields
}
```

### 3. `bookings` - Projector bookings
```javascript
{
  _id: ObjectId,
  projector: ObjectId (ref: Projector),
  user: ObjectId (ref: User),
  startTime: ISODate,
  endTime: ISODate,
  purpose: "Seminar",
  status: "active"
}
```

### 4. `activities` - Activity logs
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  projector: ObjectId (ref: Projector),
  action: "check-out",
  notes: "Checked out for seminar",
  createdAt: ISODate
}
```

---

## Quick Start Commands

```bash
# 1. Make sure you're in backend directory
cd backend

# 2. Install dependencies (if not already)
npm install

# 3. Create/update .env file with MongoDB connection
# Edit .env and add your MONGODB_URI

# 4. Start the server
npm run dev

# 5. Seed the database with sample data
npm run seed

# 6. Test registration (in new terminal)
# See "Testing User Authentication" section above
```

---

## Monitoring MongoDB

### Using MongoDB Compass (GUI)
1. Download: https://www.mongodb.com/products/compass
2. Connect using your connection string
3. View/edit data visually
4. Run queries
5. Monitor performance

### Using MongoDB Atlas Dashboard
1. Go to https://cloud.mongodb.com/
2. View metrics and monitoring
3. Set up alerts
4. View slow queries
5. Download backups

---

## Next Steps

1. ✅ **Configure MongoDB** - Update `.env` with correct connection string
2. ✅ **Start Server** - Run `npm run dev`
3. ✅ **Seed Database** - Run `npm run seed`
4. ✅ **Test Login** - Use frontend or API testing
5. ✅ **Monitor Database** - Use Compass or Atlas dashboard

---

## Need Help?

### Quick Checklist:
- [ ] MongoDB is running (local) or Atlas account is active
- [ ] `.env` file has correct `MONGODB_URI`
- [ ] `.env` file has `JWT_SECRET` set
- [ ] Server starts without errors
- [ ] Can register a new user
- [ ] Can login with credentials
- [ ] Data appears in MongoDB

### Debugging:
1. Check server console for error messages
2. Verify `.env` file is in `backend/` folder
3. Test MongoDB connection separately
4. Check MongoDB Atlas IP whitelist
5. Verify database password is correct

---

**Your MongoDB setup is ready! Just update the password in `.env` and start coding!** 🚀
