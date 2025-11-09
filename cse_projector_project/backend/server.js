import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import projectorRoutes from './routes/projector.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import activityRoutes from './routes/activity.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

// Core middleware
app.use((req, res, next) => {
  console.log('➡️', req.method, req.originalUrl);
  next();
});

// CORS configuration - supports both development and production
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',') 
  : ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projectors', projectorRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/users', userRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'CSE Projector Management System API - Developed by Satya Nikhil',
    timestamp: new Date().toISOString(),
  });
});

app.get('/ping', (req, res) => {
  res.json({
    ok: true,
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌', err.stack || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

export default app;
