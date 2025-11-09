# 🚀 Quick Start Guide - CSE Projector Management System

**Developer: Satya Nikhil (CSE Department)**

## ⚡ Quick Setup (5 Minutes)

### Step 1: Install MongoDB

**Option A - Local Installation (Recommended for Development):**
1. Download MongoDB Community Edition: https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB will start automatically on Windows

**Option B - MongoDB Atlas (Cloud):**
1. Sign up at: https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Update `backend/.env` with your connection string

### Step 2: Configure Environment Variables

Both `.env` files are already created. Just verify:

**Backend** (`backend/.env`):
- ✅ MongoDB URI is set correctly
- ✅ JWT_SECRET is configured
- ✅ PORT is 5000

**Frontend** (`frontend/.env`):
- ✅ API URL points to http://localhost:5000/api

### Step 3: Seed the Database

Open terminal in the `backend` folder:

```bash
cd backend
npm run seed
```

You should see:
```
✅ MongoDB Connected
✅ Created users
✅ Created projectors
✅ Created activities
🎉 Database seeded successfully!
```

### Step 4: Start the Backend

In the same terminal:

```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📡 API: http://localhost:5000/api
💻 Developer: Satya Nikhil (CSE Department)
```

### Step 5: Start the Frontend

Open a NEW terminal in the `frontend` folder:

```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

### Step 6: Access the Application

1. Open browser: http://localhost:5173
2. Use the OTP login flow with an official CSE email address that you control.
3. After OTP verification you can optionally set a password from the credentials pane.
4. The seeded database includes realistic projector history featuring faculty like Dr. Satya Nikhil and Dr. Rajesh Kumar so the dashboard and activity feed have immediate context for demos—no shared credentials are provided.

---

## 📋 What to Test

### As Faculty User:
1. ✅ View all projectors on dashboard
2. ✅ Check out an available projector
3. ✅ Check in a projector you've checked out
4. ✅ Book a projector for future use
5. ✅ View activity feed in real-time

### As Admin User:
1. ✅ Access admin panel
2. ✅ Add new projector
3. ✅ View statistics
4. ✅ See all activity logs
5. ✅ Delete projectors
       - By default the seeded dataset designates Dr. Satya Nikhil as the admin; request an OTP for that address if it routes to your inbox or update the admin email in the database to one you own before testing.

---

## 🛠️ Development Commands

### Backend Commands
```bash
cd backend

npm start         # Production mode
npm run dev       # Development mode (auto-reload)
npm run seed      # Seed database with sample data
```

### Frontend Commands
```bash
cd frontend

npm run dev       # Development server
npm run build     # Build for production
npm run preview   # Preview production build
```

---

## ❗ Common Issues & Solutions

### Issue: "MongoDB connection failed"
**Solution:**
- Check if MongoDB service is running
- Windows: Services → MongoDB → Start
- Verify MONGODB_URI in backend/.env

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Kill the process using port 5000
# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
```

### Issue: "Cannot GET /api/..."
**Solution:**
- Make sure backend server is running
- Check if VITE_API_URL in frontend/.env is correct

### Issue: "Module not found"
**Solution:**
```bash
# Reinstall dependencies
cd backend
rm -rf node_modules
npm install

cd ../frontend
rm -rf node_modules
npm install
```

---

## 🎨 Project Features

### ✅ Implemented Features
- Faculty authentication (JWT)
- Projector check-out/check-in
- Real-time activity feed
- Booking system with validation
- Admin panel with statistics
- Responsive design (mobile-friendly)
- Toast notifications
- Activity logging

### 🚀 Future Enhancements (Optional)
- QR code scanning
- Email notifications
- Export to PDF/Excel
- Mobile app
- SMS alerts
- Multi-department support

---

## 📱 How to Use

### Checking Out a Projector
1. Go to Dashboard
2. Find available projector (🟢 Available)
3. Click "Check Out"
4. Add optional note
5. Click "Confirm"

### Booking a Projector
1. Click "Book" on available projector
2. Select start and end time
3. Add purpose/notes
4. Click "Book Now"

### Checking In a Projector
1. Find projector you checked out
2. Click "Check In"
3. Add optional note
4. Click "Confirm"

### Admin - Adding Projector
1. Login as admin (nikhil@cse.edu)
2. Go to Admin Panel
3. Click "Add Projector"
4. Fill in details
5. Click "Add Projector"

---

## 🏗️ Project Architecture

```
┌─────────────┐
│   Browser   │
│ (React App) │
└──────┬──────┘
       │ HTTP/AJAX
       ↓
┌─────────────┐
│   Vite Dev  │
│   Server    │
│  Port 5173  │
└──────┬──────┘
       │ Proxy
       ↓
┌─────────────┐
│  Express.js │
│   Backend   │
│  Port 5000  │
└──────┬──────┘
       │ Mongoose
       ↓
┌─────────────┐
│   MongoDB   │
│  Database   │
│  Port 27017 │
└─────────────┘
```

---

## 📊 Database Schema

### Users Collection
- name, email, password (hashed)
- role (faculty/admin)
- department, designation

### Projectors Collection
- name, brand, model, serialNumber
- status (available/checked-out/booked)
- currentUser, lastUsedBy
- location, specifications

### Bookings Collection
- projector, user
- startTime, endTime
- purpose, notes, status

### Activities Collection
- user, projector
- action (check-out/check-in/booked)
- notes, timestamp

---

## 🎓 Learning Outcomes

This project demonstrates:
1. ✅ Full-stack development (MERN)
2. ✅ RESTful API design
3. ✅ JWT authentication
4. ✅ React hooks and context
5. ✅ MongoDB database design
6. ✅ Responsive UI with Tailwind CSS
7. ✅ Real-time data updates
8. ✅ Form validation
9. ✅ Error handling
10. ✅ Professional code structure

---

## 💻 Developer Notes

**Developed by:** Satya Nikhil  
**Department:** Computer Science and Engineering  
**Tech Stack:** MERN (MongoDB, Express, React, Node.js)  
**Purpose:** Digital solution for college projector management

**Design Philosophy:**
- Clean, modern UI
- User-friendly interface
- Real-time updates
- Mobile-responsive
- Professional branding

---

## 📞 Support

If you encounter any issues:

1. Check the [Common Issues](#-common-issues--solutions) section
2. Review the README.md for detailed documentation
3. Contact: satya.nikhil@example.com

---

## ⭐ Next Steps

After successfully running the project:

1. ✅ Explore all features
2. ✅ Test with different user roles
3. ✅ Check responsive design on mobile
4. ✅ Review the code structure
5. ✅ Customize for your needs
6. ✅ Deploy to production (optional)

---

<div align="center">

### 🎉 You're All Set!

**Enjoy using the CSE Projector Management System**

Made with ❤️ by Satya Nikhil | CSE Department

</div>
