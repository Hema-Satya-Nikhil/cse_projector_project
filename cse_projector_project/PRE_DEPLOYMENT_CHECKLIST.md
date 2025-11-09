# ✅ Pre-Deployment Checklist

## Backend (Render)
- [x] package.json has correct start script: `"start": "node index.js"`
- [x] Server listens on PORT from environment variable
- [x] CORS configured for production
- [x] MongoDB connection uses environment variable
- [x] JWT secret uses environment variable
- [x] No hardcoded credentials in code
- [x] .gitignore includes .env
- [x] .env.example provided
- [x] Health check endpoint exists (/api/health)
- [ ] All environment variables ready for Render
- [ ] render.yaml created (optional)

## Frontend (Vercel)
- [x] vercel.json configuration created
- [x] Build command works: `npm run build`
- [x] API calls use environment variable (VITE_API_URL)
- [x] .env.example updated with production example
- [x] React Router configured for SPA
- [x] No CORS issues expected
- [ ] VITE_API_URL environment variable ready for Vercel

## Database (MongoDB Atlas)
- [x] MongoDB Atlas cluster created
- [x] Database user created
- [x] Network access configured (allow all IPs: 0.0.0.0/0)
- [x] Connection string tested
- [ ] Data seeded if needed

## Security
- [x] .env files in .gitignore
- [x] No sensitive data committed to Git
- [x] Strong JWT secret
- [x] MongoDB credentials secure
- [ ] Update JWT secret for production
- [ ] Update admin password for production

## Testing
- [ ] All features work locally
- [ ] Login/Register functional
- [ ] Dashboard loads correctly
- [ ] Admin panel accessible
- [ ] PDF export works
- [ ] Projector logs page works
- [ ] API endpoints respond correctly

## Post-Deployment
- [ ] Update CORS_ORIGIN in Render with Vercel URL
- [ ] Test deployed backend health endpoint
- [ ] Test deployed frontend loads
- [ ] Test login on production
- [ ] Verify all API calls work
- [ ] Check browser console for errors
- [ ] Monitor Render logs for issues
- [ ] Seed production database if needed

---

## Quick Deployment Steps:

### 1. Deploy Backend to Render (15 min)
1. Create Web Service on Render
2. Connect GitHub repo
3. Set root directory: `cse_projector_project/backend`
4. Add all environment variables
5. Deploy and copy URL

### 2. Deploy Frontend to Vercel (10 min)
1. Import project to Vercel
2. Set root directory: `cse_projector_project/frontend`
3. Add VITE_API_URL environment variable (with Render URL)
4. Deploy and copy URL

### 3. Update CORS (2 min)
1. Go back to Render
2. Update CORS_ORIGIN with Vercel URL
3. Save (auto-redeploys)

### 4. Test Everything (5 min)
1. Visit Vercel URL
2. Try login
3. Test all features
4. Check console for errors

**Total Time: ~30 minutes**

---

## Environment Variables Quick Reference:

### Render (Backend):
```
NODE_ENV=production
PORT=10000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secure_secret
JWT_EXPIRE=7d
CORS_ORIGIN=https://your-app.vercel.app
ADMIN_EMAIL=your_email
ADMIN_PASSWORD=your_password
EMAIL_USER=your_email
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=Your Name <your_email>
```

### Vercel (Frontend):
```
VITE_API_URL=https://your-backend.onrender.com/api
```

---

*Ready to deploy? Follow DEPLOYMENT_GUIDE.md for detailed instructions!*
