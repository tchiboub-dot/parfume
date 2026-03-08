# Production Deploy Script for Windows PowerShell
# Run this file: .\deploy.ps1

Write-Host "🚀 Parfume Deployment Assistant" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow
Write-Host ""

# Check Node.js
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found. Please install from nodejs.org" -ForegroundColor Red
    exit 1
}

# Check Git
$gitVersion = git --version 2>$null
if ($gitVersion) {
    Write-Host "✅ Git: $gitVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Git not found. Please install from git-scm.com" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "🔐 Generating NEXTAUTH_SECRET..." -ForegroundColor Yellow
$secret = node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
Write-Host "✅ Generated Secret: $secret" -ForegroundColor Green
Write-Host "   📝 Save this! You'll need it for Vercel." -ForegroundColor Cyan

Write-Host ""
Write-Host "📝 Checking .env file..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  No .env found. Creating from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Created .env file" -ForegroundColor Green
    Write-Host "   📝 Please edit .env and add your DATABASE_URL and NEXTAUTH_SECRET" -ForegroundColor Cyan
    Write-Host "   💡 For local testing, use: DATABASE_URL='file:./dev.db'" -ForegroundColor Cyan
    notepad .env
} else {
    Write-Host "✅ .env file exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "🗄️  Setting up database..." -ForegroundColor Yellow
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

Write-Host ""
Write-Host "🏗️  Testing production build..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed. Please fix errors before deploying." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📤 Ready to deploy!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Initialize Git (if not done):" -ForegroundColor White
Write-Host "   git init" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Add files:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Gray
Write-Host ""
Write-Host "3. Commit:" -ForegroundColor White
Write-Host "   git commit -m 'Production ready deployment'" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Create main branch:" -ForegroundColor White
Write-Host "   git branch -M main" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Add remote:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/tchiboub-dot/parfume.git" -ForegroundColor Gray
Write-Host ""
Write-Host "6. Push to GitHub:" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "7. Deploy to Vercel:" -ForegroundColor White
Write-Host "   npm install -g vercel" -ForegroundColor Gray
Write-Host "   vercel login" -ForegroundColor Gray
Write-Host "   vercel" -ForegroundColor Gray
Write-Host "   vercel --prod" -ForegroundColor Gray
Write-Host ""
Write-Host "🎉 All done! Your app is ready for deployment!" -ForegroundColor Green
Write-Host "📖 See DEPLOYMENT.md for detailed instructions" -ForegroundColor Cyan