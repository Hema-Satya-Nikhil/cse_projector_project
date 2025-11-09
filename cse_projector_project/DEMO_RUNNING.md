# 🚀 CSE Projector Project - RUNNING!

## ✅ Both Servers Are Live!

### 🔙 Backend (Demo Mode)
- **URL:** http://localhost:5000
- **Status:** ✅ Running
- **Mode:** Demo (No MongoDB required)
- **Data:** Using mock in-memory data

### 🎨 Frontend (React + Vite)
- **URL:** http://localhost:5173
- **Status:** ✅ Running
- **Framework:** React + Tailwind CSS

---

## 🔐 Demo Login Credentials

Use these credentials to test the application:

### Admin Account
- **Email:** `admin@cse.edu`
- **Password:** `admin123`
- **Access:** Full admin privileges

### Faculty Account 1
- **Email:** `nikhil@cse.edu`
- **Password:** `password123`
- **Access:** Faculty user

### Faculty Account 2
- **Email:** `rajesh@cse.edu`
- **Password:** `password123`
- **Access:** Faculty user

---

## 🎯 What You Can Test

### 1. **Login/Authentication**
- Try logging in with demo credentials
- Test logout functionality
- Switch between users

### 2. **Dashboard**
- View projector inventory
- See booking statistics
- Check activity feed

### 3. **Projector Management** (Admin)
- Add new projectors
- Edit projector details
- Delete projectors
- Check-in/Check-out projectors

### 4. **Booking System**
- Create new bookings
- View your bookings
- Cancel bookings

### 5. **User Management** (Admin)
- View all users
- Add new users
- Manage user roles

---

## 📝 Demo Data Available

### Projectors
1. **Epson EB-X41** - Available
2. **BenQ MH535A** - Checked Out
3. **Sony VPL-DX221** - Booked
4. **Optoma HD146X** - Available

### Users
- Admin User
- 2 Faculty Users
- Sample bookings and activities

---

## 🔄 Making Changes

### To See Your Edits:

**Frontend Changes:**
- Edit files in `frontend/src/`
- Vite will auto-reload (Hot Module Replacement)
- Changes appear instantly in browser

**Backend Changes:**
- Edit files in `backend/`
- Nodemon will auto-restart server
- Refresh browser to see changes

---

## 🛑 Stop Servers

To stop the servers, press `Ctrl + C` in each terminal:
- Terminal 1: Backend server
- Terminal 2: Frontend server

---

## 🎨 Quick Navigation

- **Homepage:** http://localhost:5173
- **Login Page:** http://localhost:5173 (auto-redirect)
- **Dashboard:** http://localhost:5173/dashboard (after login)
- **Admin Panel:** http://localhost:5173/admin (admin only)
- **API Health:** http://localhost:5000/api/health

---

## 🔧 API Endpoints (Backend)

Test these with tools like Postman or your browser:

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `GET /api/auth/me` - Get current user

### Projectors
- `GET /api/projectors` - Get all projectors
- `POST /api/projectors` - Create projector (admin)
- `POST /api/projectors/:id/checkout` - Check out
- `POST /api/projectors/:id/checkin` - Check in

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create booking

### Activities
- `GET /api/activities` - Get activity logs

---

## 💡 Tips for Testing

1. **Try Admin Features:** Login as admin@cse.edu to access admin panel
2. **Test Booking Flow:** Book a projector → Check-in → Check-out
3. **Check Validation:** Try invalid inputs to test error handling
4. **Responsive Design:** Resize browser to test mobile view
5. **Activity Logs:** All actions are logged in the activity feed

---

## 🎉 Current Status

✅ **Backend Demo Server** - Running on port 5000  
✅ **Frontend Dev Server** - Running on port 5173  
✅ **Demo Data Loaded** - Ready to test  
✅ **Browser Opened** - http://localhost:5173

**You can now:**
- Login and test all features
- Make changes to code and see them live
- Test the UI and functionality
- No MongoDB needed in demo mode!

---

## 📱 What to Check

1. **Login Page** - Does it look good?
2. **Dashboard** - Are projectors showing?
3. **Booking Modal** - Can you create bookings?
4. **Admin Panel** - Can admin add projectors?
5. **Activity Feed** - Are actions being logged?
6. **Responsive Design** - Does it work on mobile?

---

**Happy Testing! 🚀** 

Make your changes and see them live!
