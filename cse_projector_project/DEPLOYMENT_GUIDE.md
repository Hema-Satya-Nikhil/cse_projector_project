# 🚀 Deployment Guide - CSE Projector Management System

This guide will help you deploy your application to **Render** (Backend) and **Vercel** (Frontend).

---

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ GitHub account with your code pushed
- ✅ Vercel account (sign up at https://vercel.com)
- ✅ Render account (sign up at https://render.com)
- ✅ MongoDB Atlas account (your database is already set up)

---

## 🎯 Part 1: Deploy Backend to Render

### Step 1: Create New Web Service on Render

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `Hema-Satya-Nikhil/cse_projector_project`
4. Configure the service:

   ```
   Name: cse-projector-backend
   Region: Choose closest to you (e.g., Singapore, Oregon)
   Branch: main
   Root Directory: cse_projector_project/backend
   Runtime: Node
   Build Command: npm install
   Start Command: node index.js
   Instance Type: Free (or paid for better performance)
   ```

### Step 2: Add Environment Variables on Render

In the **Environment** section, add these variables:

```bash
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://varshinigeddada_db_user:VkrfWMjkBA3l37lp@cluster0.pwvx8fk.mongodb.net/?appName=Cluster0
JWT_SECRET=cse_projector_secret_key_2024_change_this_in_production_please
JWT_EXPIRE=7d
CORS_ORIGIN=https://your-frontend-app.vercel.app
ADMIN_EMAIL=satyanikhil24@gmail.com
ADMIN_PASSWORD=Nikhil@9515
EMAIL_USER=satyanikhil24@gmail.com
EMAIL_PASSWORD=axfbbnpnnhrncrwh
EMAIL_FROM=SMART PROJECTOR MANAGER <satyanikhil24@gmail.com>
```

⚠️ **Important**: Replace `https://your-frontend-app.vercel.app` with your actual Vercel URL after deploying frontend (Step 3 below)

### Step 3: Deploy Backend

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Once deployed, copy your backend URL: `https://cse-projector-backend.onrender.com`
4. Test it by visiting: `https://cse-projector-backend.onrender.com/api/health`

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Prepare Frontend

1. Create a `.env.production` file in `frontend/` directory:

```bash
VITE_API_URL=https://cse-projector-backend.onrender.com/api
```

Replace with your actual Render backend URL from Part 1, Step 3.

### Step 2: Deploy to Vercel

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository: `Hema-Satya-Nikhil/cse_projector_project`
4. Configure the project:

   ```
   Framework Preset: Vite
   Root Directory: cse_projector_project/frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

5. **Add Environment Variables**:
   Click **"Environment Variables"** and add:
   ```
   Name: VITE_API_URL
   Value: https://cse-projector-backend.onrender.com/api
   ```
   (Replace with your actual backend URL)

6. Click **"Deploy"**

### Step 3: Get Frontend URL

1. After deployment completes (2-3 minutes)
2. Copy your frontend URL: `https://your-app.vercel.app`
3. **IMPORTANT**: Go back to Render and update the `CORS_ORIGIN` variable with this URL

---

## 🔄 Part 3: Update CORS Configuration

### Update Backend CORS on Render

1. Go to Render Dashboard → Your Backend Service
2. Click **"Environment"**
3. Update `CORS_ORIGIN` variable:
   ```
   CORS_ORIGIN=https://your-app.vercel.app,https://your-app-custom-domain.com
   ```
4. Click **"Save Changes"**
5. Service will automatically redeploy

---

## ✅ Part 4: Verify Deployment

### Test Backend:
1. Visit: `https://cse-projector-backend.onrender.com/api/health`
2. Should see: `{"success":true,"message":"CSE Projector Management System API - Developed by Satya Nikhil",...}`

### Test Frontend:
1. Visit: `https://your-app.vercel.app`
2. Try to login with: `satyanikhil24@gmail.com` / `Nikhil@9515`
3. Check all features work

---

## 🔧 Troubleshooting

### Issue: Frontend can't connect to backend
**Solution**: 
- Check `VITE_API_URL` in Vercel environment variables
- Verify `CORS_ORIGIN` in Render includes your Vercel URL
- Check browser console for CORS errors

### Issue: "Login Failed" or API errors
**Solution**:
- Verify all environment variables are set correctly on Render
- Check Render logs for errors: Dashboard → Your Service → Logs
- Ensure MongoDB connection string is correct

### Issue: Render service sleeps (free tier)
**Solution**:
- Free tier sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- Upgrade to paid plan for always-on service

---

## 📝 Environment Variables Checklist

### ✅ Render (Backend):
- [ ] NODE_ENV=production
- [ ] PORT=10000
- [ ] MONGODB_URI
- [ ] JWT_SECRET
- [ ] JWT_EXPIRE
- [ ] CORS_ORIGIN (with Vercel URL)
- [ ] ADMIN_EMAIL
- [ ] ADMIN_PASSWORD
- [ ] EMAIL_USER
- [ ] EMAIL_PASSWORD
- [ ] EMAIL_FROM

### ✅ Vercel (Frontend):
- [ ] VITE_API_URL (pointing to Render backend)

---

## 🎯 Post-Deployment Steps

1. **Seed the Database** (if needed):
   ```bash
   # In Render console or locally with production MongoDB URI:
   npm run seed
   ```

2. **Test All Features**:
   - Login/Register
   - View projectors
   - Book projector
   - Admin panel (for admin user)
   - Export PDF
   - Projector logs

3. **Monitor Performance**:
   - Render: Check logs for errors
   - Vercel: Check analytics and logs

4. **Custom Domain** (Optional):
   - Vercel: Settings → Domains → Add custom domain
   - Update `CORS_ORIGIN` on Render with new domain

---

## 🔐 Security Reminders

- ✅ Never commit `.env` files to Git
- ✅ Use strong JWT secrets in production
- ✅ Keep MongoDB credentials secure
- ✅ Regularly update dependencies
- ✅ Monitor Render and Vercel logs for suspicious activity

---

## 📚 Useful Commands

```bash
# Test backend locally with production env
NODE_ENV=production npm start

# Build frontend for production
npm run build

# Preview production build locally
npm run preview

# Check backend logs on Render
# Go to: Dashboard → Your Service → Logs

# Redeploy on Render
# Go to: Dashboard → Your Service → Manual Deploy → Deploy latest commit
```

---

## 🆘 Support Resources

- **Render Documentation**: https://render.com/docs
- **Vercel Documentation**: https://vercel.com/docs
- **MongoDB Atlas**: https://www.mongodb.com/docs/atlas/

---

## 🎉 Deployment URLs (Update after deployment)

- **Backend (Render)**: `https://cse-projector-backend.onrender.com`
- **Frontend (Vercel)**: `https://your-app.vercel.app`
- **MongoDB**: Already hosted on MongoDB Atlas

---

*Developed by Satya Nikhil - CSE Department*
*Srinivasa Institute of Engineering and Technology*
