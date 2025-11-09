# 🚀 Deployment Guide - CSE Projector Management System

**Developer:** Satya Nikhil (CSE Department)  
**For Production Deployment**

---

## 📋 Overview

This guide covers deploying the CSE Projector Management System to production environments. Choose the option that best fits your needs.

---

## 🎯 Deployment Options

### Option 1: Simple Local Network (Recommended for College)
Best for: Internal college network usage

### Option 2: Cloud Deployment (Heroku/Render)
Best for: Public access, scalability

### Option 3: VPS Deployment (DigitalOcean/AWS)
Best for: Full control, custom domain

---

## 🏫 Option 1: Local Network Deployment

### Requirements
- Windows/Linux server in college network
- MongoDB installed
- Node.js installed
- Static IP address

### Steps

1. **Setup Server**
   ```bash
   # Install Node.js on server
   # Install MongoDB on server
   # Start MongoDB service
   ```

2. **Configure Backend**
   ```bash
   cd backend
   
   # Edit .env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/cse_projector_db
   JWT_SECRET=<generate-random-secure-string>
   NODE_ENV=production
   CORS_ORIGIN=http://<server-ip>:5173
   ```

3. **Install PM2 (Process Manager)**
   ```bash
   npm install -g pm2
   
   # Start backend
   pm2 start server.js --name cse-backend
   pm2 save
   pm2 startup
   ```

4. **Configure Frontend**
   ```bash
   cd frontend
   
   # Edit .env
   VITE_API_URL=http://<server-ip>:5000/api
   
   # Build
   npm run build
   ```

5. **Serve Frontend**
   ```bash
   # Option A: Use Vite preview
   npm run preview -- --host 0.0.0.0 --port 5173
   
   # Option B: Use nginx/Apache to serve dist folder
   ```

6. **Access Application**
   - From any computer in college network:
   - `http://<server-ip>:5173`

---

## ☁️ Option 2: Cloud Deployment (Render.com)

### Free Tier Available! Perfect for demos

### Backend Deployment (Render)

1. **Create Render Account**
   - Go to https://render.com
   - Sign up (free)

2. **Create MongoDB Atlas Database**
   - Go to https://mongodb.com/cloud/atlas
   - Create free cluster
   - Get connection string

3. **Deploy Backend**
   ```yaml
   # Create new Web Service on Render
   
   Name: cse-projector-backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   
   # Environment Variables:
   MONGODB_URI=<your-atlas-connection-string>
   JWT_SECRET=<random-secure-string>
   NODE_ENV=production
   CORS_ORIGIN=<frontend-url>
   ```

4. **Get Backend URL**
   - Copy your backend URL (e.g., https://cse-backend.onrender.com)

### Frontend Deployment (Render/Vercel/Netlify)

1. **Update Frontend .env**
   ```env
   VITE_API_URL=https://cse-backend.onrender.com/api
   ```

2. **Deploy to Render**
   ```yaml
   Name: cse-projector-frontend
   Environment: Static Site
   Build Command: npm run build
   Publish Directory: dist
   ```

3. **Or Deploy to Vercel**
   ```bash
   npm install -g vercel
   cd frontend
   vercel
   ```

---

## 🖥️ Option 3: VPS Deployment (DigitalOcean)

### Requirements
- DigitalOcean Droplet ($5/month)
- Domain name (optional)

### Steps

1. **Create Droplet**
   - Ubuntu 22.04
   - 1GB RAM minimum
   - SSH access

2. **Install Dependencies**
   ```bash
   # Connect via SSH
   ssh root@<your-ip>
   
   # Update system
   apt update && apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   apt install -y nodejs
   
   # Install MongoDB
   # Follow: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/
   
   # Install nginx
   apt install -y nginx
   
   # Install PM2
   npm install -g pm2
   ```

3. **Upload Project**
   ```bash
   # On your local machine
   scp -r cse_projector_project root@<your-ip>:/var/www/
   ```

4. **Setup Backend**
   ```bash
   cd /var/www/cse_projector_project/backend
   npm install
   
   # Configure .env
   nano .env
   # Set production values
   
   # Start with PM2
   pm2 start server.js --name cse-backend
   pm2 save
   pm2 startup
   ```

5. **Setup Frontend**
   ```bash
   cd /var/www/cse_projector_project/frontend
   npm install
   npm run build
   ```

6. **Configure Nginx**
   ```bash
   nano /etc/nginx/sites-available/cse-projector
   ```

   ```nginx
   # Frontend
   server {
       listen 80;
       server_name <your-domain-or-ip>;
       
       root /var/www/cse_projector_project/frontend/dist;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # Proxy API requests to backend
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   # Enable site
   ln -s /etc/nginx/sites-available/cse-projector /etc/nginx/sites-enabled/
   nginx -t
   systemctl restart nginx
   ```

7. **Setup SSL (Optional but Recommended)**
   ```bash
   # Install Certbot
   apt install -y certbot python3-certbot-nginx
   
   # Get SSL certificate
   certbot --nginx -d <your-domain>
   ```

---

## 🔒 Production Security Checklist

### Environment Variables
- [ ] JWT_SECRET is long random string (min 32 chars)
- [ ] NODE_ENV=production
- [ ] Database credentials secure
- [ ] No .env files in git

### MongoDB
- [ ] Authentication enabled
- [ ] Strong password
- [ ] IP whitelist configured
- [ ] Regular backups enabled

### Backend
- [ ] CORS properly configured
- [ ] Rate limiting added (optional)
- [ ] Helmet.js for security headers (optional)
- [ ] Input sanitization
- [ ] Error logging configured

### Frontend
- [ ] Environment variables use VITE_ prefix
- [ ] API URL points to production
- [ ] Console.log statements removed
- [ ] Source maps disabled in production

### Server
- [ ] Firewall configured
- [ ] SSH key authentication only
- [ ] Regular updates scheduled
- [ ] Monitoring setup

---

## 📊 Monitoring & Maintenance

### PM2 Monitoring
```bash
# View logs
pm2 logs

# Monitor processes
pm2 monit

# Restart app
pm2 restart cse-backend

# View status
pm2 status
```

### MongoDB Monitoring
```bash
# Check database status
mongo --eval "db.stats()"

# View active connections
mongo --eval "db.serverStatus().connections"

# Backup database
mongodump --db cse_projector_db --out /backups/$(date +%Y%m%d)
```

### Nginx Logs
```bash
# Access logs
tail -f /var/log/nginx/access.log

# Error logs
tail -f /var/log/nginx/error.log
```

---

## 🔄 Updates & Rollback

### Updating Application
```bash
# Pull latest code
cd /var/www/cse_projector_project
git pull

# Update backend
cd backend
npm install
pm2 restart cse-backend

# Update frontend
cd ../frontend
npm install
npm run build
```

### Rollback
```bash
# Revert to previous version
git log
git checkout <previous-commit>

# Rebuild and restart
```

---

## 🚨 Troubleshooting Production Issues

### Backend Won't Start
```bash
# Check PM2 logs
pm2 logs cse-backend

# Check MongoDB connection
mongo

# Check port availability
netstat -tulpn | grep 5000
```

### Frontend Not Loading
```bash
# Check nginx status
systemctl status nginx

# Test nginx config
nginx -t

# Check file permissions
ls -la /var/www/cse_projector_project/frontend/dist
```

### Database Issues
```bash
# Check MongoDB status
systemctl status mongod

# Check disk space
df -h

# Check MongoDB logs
tail -f /var/log/mongodb/mongod.log
```

---

## 📈 Scaling Considerations

### When to Scale

- More than 100 concurrent users
- Slow API responses
- Database growing rapidly
- High server load

### Scaling Options

1. **Vertical Scaling**
   - Upgrade server RAM/CPU
   - Optimize database queries
   - Add caching (Redis)

2. **Horizontal Scaling**
   - Load balancer
   - Multiple app instances
   - MongoDB replica set
   - CDN for frontend

---

## 💰 Cost Estimation

### Option 1: Local Network
- **Cost:** Free (using existing infrastructure)
- **Maintenance:** IT department

### Option 2: Cloud (Render + Atlas)
- **Free Tier:**
  - Backend: Free (spins down after inactivity)
  - Database: Free (512MB storage)
  - Frontend: Free
- **Paid:**
  - $7/month (no sleep)
  - $9/month (more database)

### Option 3: VPS (DigitalOcean)
- **Basic:** $5/month (1GB RAM)
- **Recommended:** $12/month (2GB RAM)
- **Domain:** $10-15/year (optional)
- **Total:** ~$60-144/year

---

## 📝 Post-Deployment Checklist

- [ ] Application accessible from internet/network
- [ ] All features working
- [ ] Database seeded with initial data
- [ ] Admin account created
- [ ] SSL certificate installed (if public)
- [ ] Monitoring configured
- [ ] Backups scheduled
- [ ] Documentation updated
- [ ] Team trained on usage
- [ ] Support contact shared

---

## 🎓 Recommended for College Use

**Best Option:** Local Network Deployment

**Why:**
- ✅ Free (no ongoing costs)
- ✅ Fast (local network speeds)
- ✅ Secure (not exposed to internet)
- ✅ Full control
- ✅ No data leaving premises

**Requirements:**
- Dedicated PC/Server in CSE department
- MongoDB installed
- Node.js installed
- Server running 24/7

---

## 📞 Support Resources

### Documentation
- Node.js: https://nodejs.org/docs
- MongoDB: https://docs.mongodb.com
- React: https://react.dev
- Nginx: https://nginx.org/en/docs/

### Community
- Stack Overflow
- GitHub Issues
- Reddit (r/node, r/reactjs)

### Developer Contact
- **Name:** Satya Nikhil
- **Email:** satya.nikhil@example.com
- **Department:** CSE

---

<div align="center">

## 🎉 Ready for Production!

**CSE Projector Management System**

*Developed with ❤️ by Satya Nikhil*

For questions or support, contact the developer

</div>
