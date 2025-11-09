# 🚀 Demo Server Running - Quick Guide

## ✅ Both Servers Are Running!

### Backend Demo Server
- **URL:** http://localhost:5000/api
- **Status:** ✅ Running in Demo Mode
- **Database:** Using mock data (no MongoDB required)

### Frontend Server
- **URL:** http://localhost:5173/
- **Status:** ✅ Running

---

## 🔑 Demo Login Credentials

Use these credentials to login and test the application:

### Demo Users Available:

#### 1. Faculty User
- **Email:** `nikhil@cse.edu`
- **Password:** `password123`
- **Role:** Faculty

#### 2. Admin User
- **Email:** `admin@cse.edu`
- **Password:** `admin123`
- **Role:** Admin

#### 3. Another Faculty User
- **Email:** `rajesh@cse.edu`
- **Password:** `password123`
- **Role:** Faculty

---

## 🎯 What You Can Test

### As Faculty User:
- ✅ View available projectors
- ✅ Book projectors
- ✅ Check-in projectors
- ✅ Check-out projectors
- ✅ View booking history
- ✅ View activity feed

### As Admin User:
- ✅ All faculty features
- ✅ Add new projectors
- ✅ Edit projector details
- ✅ Delete projectors
- ✅ View all user bookings
- ✅ Manage system settings

---

## 📝 How to Use

1. **Open your browser:** http://localhost:5173/

2. **Login with demo credentials:**
   - Email: `nikhil@cse.edu`
   - Password: `password123`

3. **Explore the features:**
   - Dashboard - View all projectors
   - Create bookings
   - Check-in/out projectors
   - View activity feed
   - Admin panel (if using admin account)

---

## 🔄 To Restart Servers

If you need to restart:

### Backend Demo Server:
```powershell
cd backend
npm run demo
```

### Frontend Server:
```powershell
cd frontend
npm run dev
```

---

## 🛑 To Stop Servers

Press `Ctrl+C` in each terminal window

---

## 📊 Mock Data Available

The demo server includes:

### Projectors:
- Epson EB-X41 (Available)
- BenQ MH535 (Checked-out)
- Sony VPL-DX221 (Available)
- ViewSonic PA503S (Maintenance)
- Optoma HD28HDR (Available)

### Users:
- 3 demo users (see credentials above)

### Bookings:
- Sample active and completed bookings

### Activities:
- Recent check-in/out activities
- Booking history

---

## 💡 Pro Tips

1. **Test Different Users:** Login with different accounts to see different views
2. **Check Admin Panel:** Use admin credentials to access admin features
3. **Test Bookings:** Create, view, and cancel bookings
4. **Check-in/out:** Try checking in and out projectors
5. **View Activities:** See real-time activity feed

---

## 🔧 Making Changes

While the demo server is running:

1. **Edit Frontend Code:** Changes auto-reload (Vite HMR)
2. **Edit Backend Code:** Server auto-restarts (nodemon)
3. **View Changes:** Refresh browser to see updates

---

## 🌐 Access the Application

**Click here or copy to browser:** http://localhost:5173/

---

## ⚠️ Note

- This is **DEMO MODE** - no MongoDB required
- All data is **in-memory** (resets on server restart)
- Email notifications are **disabled** in demo mode
- Perfect for testing and development!

---

**Enjoy testing your CSE Projector Management System!** 🎉
