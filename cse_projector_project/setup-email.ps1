# Email Integration - Installation & Testing Script

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  CSE Projector - Email Integration Setup" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Install nodemailer
Write-Host "[Step 1/4] Installing nodemailer..." -ForegroundColor Yellow
Set-Location backend
npm install nodemailer
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Nodemailer installed successfully!" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install nodemailer" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 2: Check for .env file
Write-Host "[Step 2/4] Checking environment configuration..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "✓ .env file exists" -ForegroundColor Green
    Write-Host ""
    Write-Host "IMPORTANT: Add these lines to your .env file:" -ForegroundColor Magenta
    Write-Host "-------------------------------------------" -ForegroundColor Magenta
    Write-Host "EMAIL_HOST=smtp.gmail.com" -ForegroundColor White
    Write-Host "EMAIL_PORT=587" -ForegroundColor White
    Write-Host "EMAIL_USER=your-email@gmail.com" -ForegroundColor White
    Write-Host "EMAIL_PASSWORD=your-app-password" -ForegroundColor White
    Write-Host "EMAIL_FROM=your-email@gmail.com" -ForegroundColor White
    Write-Host "ADMIN_EMAIL=admin@example.com" -ForegroundColor White
    Write-Host "-------------------------------------------" -ForegroundColor Magenta
} else {
    Write-Host "! .env file not found. Creating from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✓ Created .env file. Please configure email settings!" -ForegroundColor Green
    Write-Host "  Edit backend/.env and add your email credentials" -ForegroundColor Cyan
}
Write-Host ""

# Step 3: Verify files exist
Write-Host "[Step 3/4] Verifying integration files..." -ForegroundColor Yellow
$files = @(
    "config/email.js",
    "services/email.service.js"
)

$allExist = $true
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $file missing!" -ForegroundColor Red
        $allExist = $false
    }
}

if ($allExist) {
    Write-Host "✓ All email integration files present!" -ForegroundColor Green
} else {
    Write-Host "✗ Some files are missing!" -ForegroundColor Red
}
Write-Host ""

# Step 4: Instructions
Write-Host "[Step 4/4] Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Configure your email in backend/.env" -ForegroundColor Cyan
Write-Host "  2. Get Gmail App Password:" -ForegroundColor Cyan
Write-Host "     → https://myaccount.google.com/apppasswords" -ForegroundColor Gray
Write-Host "  3. Start the server: npm run dev" -ForegroundColor Cyan
Write-Host "  4. Test emails by:" -ForegroundColor Cyan
Write-Host "     → Registering a new user" -ForegroundColor Gray
Write-Host "     → Creating a booking" -ForegroundColor Gray
Write-Host "     → Checking in/out a projector" -ForegroundColor Gray
Write-Host ""

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  📚 Documentation Files:" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Set-Location ..
Write-Host "  • EMAIL_QUICK_START.md - Quick setup guide" -ForegroundColor White
Write-Host "  • EMAIL_SETUP_GUIDE.md - Detailed instructions" -ForegroundColor White
Write-Host "  • EMAIL_INTEGRATION_SUMMARY.md - Overview" -ForegroundColor White
Write-Host "  • EMAIL_ARCHITECTURE.md - Technical details" -ForegroundColor White
Write-Host ""

Write-Host "✓ Installation complete! Configure .env and start coding!" -ForegroundColor Green
Write-Host ""
