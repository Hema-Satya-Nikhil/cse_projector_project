# 🖥️ SMART PROJECTOR MANAGER

> **Developed with ❤️ by A. Hema Satya Nikhil & G. Sri Varshini (CSE Department)**

A modern full-stack web application for managing departmental projectors, replacing traditional paper register systems with real-time digital tracking.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Backend-Express.js-000000?logo=express&logoColor=white)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Runtime-Node.js-339933?logo=node.js&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Developer](#-developer)
- [License](#-license)

---

## ✨ Features

### 🎯 Core Features
- **Faculty Authentication** - Secure JWT-based login system
- **Real-time Tracking** - Check projector availability instantly
- **Check-out/Check-in** - Digital projector management
- **Booking System** - Reserve projectors with conflict prevention
- **Activity Feed** - Live updates on all projector activities
- **Admin Dashboard** - Comprehensive analytics and management
- **Responsive Design** - Works on desktop, tablet, and mobile

### 📊 Admin Features
- Add/Remove/Edit projectors
- View activity logs and statistics
- Export data (CSV support)
- User management
- System analytics

### 🎨 Design Features
- Modern college-tech theme with Navy Blue (#0047AB) accent
- Smooth animations and transitions
- Toast notifications for user feedback
- Clean, intuitive interface
- Professional typography (Inter font)

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons
- **date-fns** - Date formatting

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

---

## 📁 Project Structure

```
cse_projector_project/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js   # Authentication logic
│   │   ├── projector.controller.js
│   │   ├── booking.controller.js
│   │   ├── activity.controller.js
│   │   └── user.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js   # JWT verification
│   ├── models/
│   │   ├── User.model.js
│   │   ├── Projector.model.js
│   │   ├── Booking.model.js
│   │   └── Activity.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── projector.routes.js
│   │   ├── booking.routes.js
│   │   ├── activity.routes.js
│   │   └── user.routes.js
│   ├── scripts/
│   │   └── seed.js              # Database seeding
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js                # Entry point
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ActivityFeed.jsx
│   │   │   ├── AddProjectorModal.jsx
│   │   │   ├── BookingModal.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── ProjectorCard.jsx
│   │   │   └── StatsCard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── About.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Login.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
  - OR use **MongoDB Atlas** (cloud database) - [Sign Up](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** (comes with Node.js)
- **Git** (optional) - [Download](https://git-scm.com/)

---

## 🚀 Installation

### 1. Clone or Download the Project

```bash
# If using Git
git clone <your-repository-url>
cd cse_projector_project

# Or simply download and extract the ZIP file
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## ⚙️ Configuration

### Backend Configuration

1. **Create `.env` file** in the `backend` folder:

```bash
cd backend
copy .env.example .env   # Windows
# OR
cp .env.example .env     # Mac/Linux
```

2. **Edit `.env` file** with your settings:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/cse_projector_db

# For MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cse_projector_db

# JWT Secret (CHANGE THIS in production!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# JWT Expiration
JWT_EXPIRE=7d

# CORS Origin
CORS_ORIGIN=http://localhost:5173
```

### Frontend Configuration

1. **Create `.env` file** in the `frontend` folder:

```bash
cd frontend
copy .env.example .env   # Windows
# OR
cp .env.example .env     # Mac/Linux
```

2. **Edit `.env` file**:

```env
VITE_API_URL=http://localhost:5000/api
```

### MongoDB Setup

#### Option A: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac (with Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Atlas (Cloud)

1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string and update `MONGODB_URI` in backend `.env`
4. Add your IP to whitelist in Atlas dashboard

---

## 🏃 Running the Application

### Step 1: Start MongoDB

Make sure MongoDB is running (if using local installation)

### Step 2: Seed the Database (First Time Only)

```bash
cd backend
npm run seed
```

This will create:
- 4 sample users (1 admin + 3 faculty)
- 4 sample projectors
- Sample activity logs

**Seed Data Overview:**

- 4 sample users (1 admin + 3 faculty) seeded with unique, randomly generated passwords
- 4 sample projectors
- Sample activity logs
- All users authenticate through the email OTP + verification flow

### Step 3: Start Backend Server

```bash
cd backend
npm run dev
```

✅ Backend should be running on: `http://localhost:5000`

### Step 4: Start Frontend Development Server

Open a **new terminal** window:

```bash
cd frontend
npm run dev
```

✅ Frontend should be running on: `http://localhost:5173`

### Step 5: Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

Use the OTP login flow with a seeded faculty/admin email or create a new account to get started.

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Projectors
- `GET /api/projectors` - Get all projectors
- `GET /api/projectors/:id` - Get single projector
- `POST /api/projectors` - Create projector (Admin)
- `PUT /api/projectors/:id` - Update projector (Admin)
- `DELETE /api/projectors/:id` - Delete projector (Admin)
- `POST /api/projectors/:id/checkout` - Check out projector
- `POST /api/projectors/:id/checkin` - Check in projector

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get single booking
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id/cancel` - Cancel booking

### Activities
- `GET /api/activities/recent` - Get recent activities
- `GET /api/activities/stats` - Get statistics (Admin)
- `GET /api/activities/projector/:id` - Get projector activities
- `GET /api/activities/user/:id` - Get user activities

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update profile

---

## 📸 Screenshots

### Login Page
Guided OTP-first authentication with optional credential fallback once verified.

### Dashboard
- Projector cards with real-time status
- Check-out/Check-in buttons
- Booking functionality
- Live activity feed

### Admin Panel
- Projector management
- Activity logs
- Statistics and analytics
- Add/Remove projectors

### About Page
- Project information
- Technologies used
- Developer profile

---

## 🛠️ Development Scripts

### Backend

```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
npm run seed     # Seed database with sample data
```

### Frontend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error: "MongoServerError: Authentication failed"**
- Check your MongoDB credentials in `.env`
- Ensure MongoDB service is running

**Error: "MongoNetworkError: connect ECONNREFUSED"**
- Start MongoDB service
- Check if MongoDB is running on correct port (27017)

### Port Already in Use

**Error: "Port 5000 is already in use"**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Frontend Build Issues

**Error: "Module not found"**
```bash
cd frontend
rm -rf node_modules
npm install
```

---

## 👥 Developers

### 👨‍💻 A. Hema Satya Nikhil

**Role:** Full Stack Developer (MERN)  
**Department:** Computer Science and Engineering  
**Contribution:** Frontend Development, Backend API, Database Design, Authentication System

**Contact:**
- Email: satyanikhil24@gmail.com
- GitHub: [GitHub Profile]
- LinkedIn: [LinkedIn Profile]

### 👩‍💻 G. Sri Varshini

**Role:** Full Stack Developer (MERN)  
**Department:** Computer Science and Engineering  
**Contribution:** UI/UX Design, Frontend Components, Backend Integration, Database Management

**Contact:**
- Email: varshinigeddada@gmail.com
- GitHub: [GitHub Profile]
- LinkedIn: [LinkedIn Profile]

### 💡 Quote
> "Building digital solutions that simplify everyday college operations and enhance the learning environment through technology."

---

## 📝 Features Roadmap

- [ ] QR Code scanning for quick check-out/in
- [ ] Email notifications for bookings
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Export reports (PDF/Excel)
- [ ] Multi-department support
- [ ] Equipment maintenance tracking
- [ ] SMS notifications

---

## 🤝 Contributing

This is an educational project. If you'd like to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - free for educational and commercial use.

---

## 🙏 Acknowledgments

- Department of Computer Science and Engineering
- Faculty members who provided feedback
- MERN Stack community for excellent documentation
- All open-source contributors

---

## 📞 Support

For issues, questions, or suggestions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Open an issue on GitHub
3. Contact the developer: satya.nikhil@example.com

---

<div align="center">

### Made with ❤️ by A. Hema Satya Nikhil & G. Sri Varshini

**SMART PROJECTOR MANAGER** © 2025

*Smart Digital Tracking for College Projectors*

[⬆ Back to Top](#-smart-projector-manager)

</div>
