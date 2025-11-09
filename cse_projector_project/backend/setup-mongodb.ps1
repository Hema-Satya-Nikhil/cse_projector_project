# MongoDB Quick Setup Script for CSE Projector Project

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  MongoDB Connection Setup" -ForegroundColor Cyan
Write-Host "  CSE Projector Management System" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in backend directory
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: Please run this script from the backend directory" -ForegroundColor Red
    Write-Host "   Run: cd backend" -ForegroundColor Yellow
    exit 1
}

# Step 1: Check .env file
Write-Host "[Step 1/4] Checking .env file..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "✓ .env file found" -ForegroundColor Green
} else {
    Write-Host "! .env file not found, creating from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✓ Created .env file" -ForegroundColor Green
}
Write-Host ""

# Step 2: Check MongoDB connection string
Write-Host "[Step 2/4] Checking MongoDB configuration..." -ForegroundColor Yellow
$envContent = Get-Content ".env" -Raw

if ($envContent -match "MONGODB_URI=.*<db_password>") {
    Write-Host "⚠️  WARNING: You need to update your MongoDB password!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Current connection string contains <db_password>" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Choose an option:" -ForegroundColor Cyan
    Write-Host "  1. Use MongoDB Atlas (Cloud) - You need to replace <db_password>" -ForegroundColor White
    Write-Host "  2. Use Local MongoDB - Install MongoDB on your computer" -ForegroundColor White
    Write-Host ""
    
    $choice = Read-Host "Enter your choice (1 or 2)"
    
    if ($choice -eq "1") {
        Write-Host ""
        Write-Host "MongoDB Atlas Setup:" -ForegroundColor Cyan
        Write-Host "  1. Go to https://cloud.mongodb.com/" -ForegroundColor White
        Write-Host "  2. Login to your account" -ForegroundColor White
        Write-Host "  3. Go to Database Access → find user 'listentogether'" -ForegroundColor White
        Write-Host "  4. Click Edit → Edit Password → Copy password" -ForegroundColor White
        Write-Host "  5. Open backend/.env file" -ForegroundColor White
        Write-Host "  6. Replace <db_password> with your actual password" -ForegroundColor White
        Write-Host ""
        $password = Read-Host "Enter your MongoDB Atlas password (or press Enter to skip)"
        
        if ($password) {
            $newContent = $envContent -replace "<db_password>", $password
            Set-Content ".env" $newContent
            Write-Host "✓ Password updated in .env file" -ForegroundColor Green
        }
    } 
    elseif ($choice -eq "2") {
        Write-Host ""
        Write-Host "Switching to Local MongoDB..." -ForegroundColor Cyan
        $newContent = $envContent -replace "MONGODB_URI=mongodb\+srv.*", "# MONGODB_URI=mongodb+srv://listentogether:<db_password>@listentogether.bbwwxmn.mongodb.net/cse_projector_db?retryWrites=true&w=majority`nMONGDB_URI=mongodb://localhost:27017/cse_projector_db"
        Set-Content ".env" $newContent
        Write-Host "✓ Updated to use local MongoDB" -ForegroundColor Green
        Write-Host ""
        Write-Host "Make sure MongoDB is installed and running:" -ForegroundColor Yellow
        Write-Host "  Download: https://www.mongodb.com/try/download/community" -ForegroundColor White
        Write-Host "  Or install: choco install mongodb" -ForegroundColor White
        Write-Host "  Start service: net start MongoDB" -ForegroundColor White
    }
} else {
    Write-Host "✓ MongoDB connection string configured" -ForegroundColor Green
}
Write-Host ""

# Step 3: Test MongoDB connection
Write-Host "[Step 3/4] Testing MongoDB connection..." -ForegroundColor Yellow
Write-Host "Running connection test..." -ForegroundColor Gray
Write-Host ""

node test-mongo-connection.js

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ MongoDB connection successful!" -ForegroundColor Green
    $connectionWorked = $true
} else {
    Write-Host ""
    Write-Host "✗ MongoDB connection failed" -ForegroundColor Red
    Write-Host "  Check the error messages above and fix the connection" -ForegroundColor Yellow
    Write-Host "  See MONGODB_SETUP_GUIDE.md for detailed help" -ForegroundColor Yellow
    $connectionWorked = $false
}
Write-Host ""

# Step 4: Offer to seed database
if ($connectionWorked) {
    Write-Host "[Step 4/4] Database seeding..." -ForegroundColor Yellow
    Write-Host "Would you like to seed the database with sample data?" -ForegroundColor Cyan
    Write-Host "  This will create sample users, projectors, and bookings" -ForegroundColor White
    Write-Host ""
    $seed = Read-Host "Seed database? (y/n)"
    
    if ($seed -eq "y" -or $seed -eq "Y") {
        Write-Host ""
        Write-Host "Seeding database..." -ForegroundColor Gray
        npm run seed
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✓ Database seeded successfully!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Sample Users Created:" -ForegroundColor Cyan
            Write-Host "  Admin:" -ForegroundColor Yellow
            Write-Host "    Email: admin@cse.edu" -ForegroundColor White
            Write-Host "    Password: admin123" -ForegroundColor White
            Write-Host ""
            Write-Host "  Faculty Users:" -ForegroundColor Yellow
            Write-Host "    Email: nikhil@cse.edu | Password: nikhil123" -ForegroundColor White
            Write-Host "    Email: rajesh@cse.edu | Password: rajesh123" -ForegroundColor White
        }
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

if ($connectionWorked) {
    Write-Host "✅ MongoDB is connected and ready!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Start the server: npm run dev" -ForegroundColor White
    Write-Host "  2. Test login with sample users" -ForegroundColor White
    Write-Host "  3. Open frontend and try authentication" -ForegroundColor White
} else {
    Write-Host "⚠️  MongoDB connection needs to be fixed" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Fix MongoDB connection in .env file" -ForegroundColor White
    Write-Host "  2. See MONGODB_SETUP_GUIDE.md for help" -ForegroundColor White
    Write-Host "  3. Run: node test-mongo-connection.js to test again" -ForegroundColor White
}

Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "  • MONGODB_SETUP_GUIDE.md - Complete MongoDB setup guide" -ForegroundColor White
Write-Host "  • test-mongo-connection.js - Test MongoDB connection" -ForegroundColor White
Write-Host ""
