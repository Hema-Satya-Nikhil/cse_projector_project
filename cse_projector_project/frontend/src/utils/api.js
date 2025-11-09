import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth API
export const authAPI = {
  requestOtp: (payload) => api.post('/auth/request-otp', payload),
  verifyOtp: (payload) => api.post('/auth/verify-otp', payload),
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
};

// Projector API
export const projectorAPI = {
  getAll: () => api.get('/projectors'),
  getOne: (id) => api.get(`/projectors/${id}`),
  create: (data) => api.post('/projectors', data),
  update: (id, data) => api.put(`/projectors/${id}`, data),
  delete: (id) => api.delete(`/projectors/${id}`),
  checkOut: (id, payload) => {
    const body = typeof payload === 'string' ? { notes: payload } : (payload || {});
    return api.post(`/projectors/${id}/checkout`, body);
  },
  checkIn: (id, payload) => {
    const body = typeof payload === 'string' ? { notes: payload } : (payload || {});
    return api.post(`/projectors/${id}/checkin`, body);
  },
};

// Booking API
export const bookingAPI = {
  getAll: (params) => api.get('/bookings', { params }),
  getOne: (id) => api.get(`/bookings/${id}`),
  create: (data) => api.post('/bookings', data),
  cancel: (id, notes) => api.put(`/bookings/${id}/cancel`, { notes }),
};

// Activity API
export const activityAPI = {
  getRecent: (limit = 50) => api.get('/activities/recent', { params: { limit } }),
  getByProjector: (projectorId) => api.get(`/activities/projector/${projectorId}`),
  getByUser: (userId) => api.get(`/activities/user/${userId}`),
  getStats: () => api.get('/activities/stats'),
};

// User API
export const userAPI = {
  getAll: () => api.get('/users'),
  getMe: () => api.get('/users/me'),
  updateProfile: (data) => api.put('/users/me', data),
};
