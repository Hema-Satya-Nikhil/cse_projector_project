# Admin Panel Features - CSE Projector Management System

## 📊 Admin Panel Overview

The Admin Panel is exclusively accessible to users with the **admin role** and provides comprehensive management and analytics capabilities.

### Access
- **URL**: `http://localhost:5174/admin`
- **Required Role**: Admin
- **Navigation**: Available in the navbar for admin users

---

## 🎯 Key Features

### 1. **Dashboard Statistics**
Located at the top of the Admin Panel:
- ✅ **Total Activities**: Complete count of all system activities
- ✅ **Total In Use**: Number of projectors currently checked out
- ✅ **Total Made Available**: Number of check-in operations
- ✅ **Total Bookings**: Total number of projector bookings

### 2. **Projector Management**
- ✅ **View All Projectors**: Complete list with details (Name, Brand/Model, Status, Location)
- ✅ **Add New Projectors**: Button to add new projectors to the system
- ✅ **Delete Projectors**: Admin-only ability to remove projectors
- ✅ **Real-time Status**: Live status updates (Available, In Use, Booked)

### 3. **Activity Logs & History**
- ✅ **Recent Activity Table**: Shows last 50 activities
- ✅ **Detailed Information**:
  - User who performed the action
  - Action type (check-out, check-in, booked, etc.)
  - Projector name
  - Notes/Purpose
  - Date & Time (12-hour format with AM/PM)

### 4. **PDF Export Feature** 📄
Located in the Admin Panel's Activity Log section:

**Export Button**: "Export to PDF"
- ✅ Generates comprehensive PDF report of ALL activity logs
- ✅ Includes:
  - Report title and generation timestamp
  - Total activity count
  - Complete activity table with all columns
  - Professional formatting with striped rows
  - Page numbers and footer
  - Automatic file naming: `activity-logs-YYYY-MM-DD.pdf`

### 5. **Detailed Projector Logs Page** 📋
Accessible via the navbar or "View Detailed Logs" button in Admin Panel

**URL**: `http://localhost:5174/logs`

Features:
- ✅ **Advanced Filtering**:
  - Filter by specific projector
  - Filter by date range (start and end dates)
  - Filter by time period (All Time, Today, This Week, This Month)
  
- ✅ **Summary Statistics**:
  - Total activities in selected period
  - Total unique users
  - Total check-outs
  - Total check-ins

- ✅ **PDF Export Options**:
  - Weekly Activity Report
  - Monthly Activity Report
  - Custom filtered report based on current filters

- ✅ **Detailed Activity Table**:
  - User information
  - Action performed
  - Projector details
  - Purpose/Notes
  - Timestamp (12-hour format)

---

## 🚀 Navigation Structure

### For Admin Users:
1. **Dashboard** - Main overview of all projectors
2. **Admin Panel** - Management interface with:
   - Statistics overview
   - Projector management table
   - Recent activity logs (last 50)
   - PDF export button
   - Link to detailed logs
3. **Projector Logs** - Dedicated page for:
   - Advanced filtering
   - Comprehensive activity history
   - Multiple PDF export options
4. **About** - Information page

### Navbar Links (Admin Only):
- Dashboard
- Admin Panel
- Projector Logs (with FileText icon)
- About

---

## 📥 How to Export Activity Logs as PDF

### Option 1: From Admin Panel
1. Navigate to Admin Panel (`/admin`)
2. Scroll to "Recent Activity Log" section
3. Click **"Export to PDF"** button
4. PDF will download automatically with all activities

### Option 2: From Projector Logs Page
1. Navigate to Projector Logs (`/logs`)
2. Apply any filters if needed (projector, date range)
3. Choose export option:
   - **"Export Weekly Report"** - Last 7 days
   - **"Export Monthly Report"** - Last 30 days
   - **PDF button next to filters** - Current filtered view
4. PDF downloads automatically

---

## 📄 PDF Report Contents

Each PDF includes:
- **Header**: Title, generation date/time, activity count
- **Table**: All activities with columns:
  - User Name
  - Action Type
  - Projector Name
  - Notes/Purpose
  - Date & Time (12-hour format)
- **Footer**: Page numbers, system name
- **Formatting**: Professional striped rows, color-coded headers

---

## 🔒 Security Features

- ✅ **Role-Based Access**: Only admin users can access Admin Panel and Logs
- ✅ **Protected Routes**: Automatic redirect for non-admin users
- ✅ **Delete Protection**: Only admins can delete projectors
- ✅ **Activity Tracking**: All actions are logged with user information

---

## 🎨 Features Summary

| Feature | Location | Description |
|---------|----------|-------------|
| Statistics Dashboard | Admin Panel | Overview of system activities |
| Projector Table | Admin Panel | Manage all projectors |
| Add Projector | Admin Panel | Add new projectors to system |
| Delete Projector | Admin Panel | Remove projectors (admin only) |
| Activity Log | Admin Panel | Last 50 recent activities |
| PDF Export (All) | Admin Panel | Export all activities to PDF |
| Detailed Logs | Projector Logs Page | Advanced filtering and viewing |
| Filter by Projector | Projector Logs Page | Filter activities by specific projector |
| Filter by Date | Projector Logs Page | Custom date range filtering |
| Weekly PDF Export | Projector Logs Page | Export last 7 days |
| Monthly PDF Export | Projector Logs Page | Export last 30 days |
| 12-Hour Time Format | All Pages | AM/PM time display |
| Purpose Field | Booking Modal | Required field for bookings |

---

## 💡 Usage Tips

1. **Regular Monitoring**: Check Admin Panel daily for activity overview
2. **Detailed Analysis**: Use Projector Logs page for in-depth filtering
3. **Record Keeping**: Export monthly PDFs for archival purposes
4. **Projector Tracking**: Use filters to monitor specific projector usage
5. **User Activity**: Track which users are most active in the system

---

## 📱 Responsive Design

All admin features are fully responsive and work on:
- ✅ Desktop computers
- ✅ Tablets
- ✅ Mobile devices (with optimized layout)

---

## 🎯 Quick Access

- **Admin Panel**: Click "Admin Panel" in navbar
- **Projector Logs**: Click "Projector Logs" in navbar (with FileText icon)
- **Export PDF**: Available in both Admin Panel and Projector Logs page

---

*Developed by Satya Nikhil - CSE Department*
*SRINIVASA INSTITUTE OF ENGINEERING AND TECHNOLOGY*
