# 🚀 Quick Deploy Commands - Copy & Paste

## 📋 Prerequisites
```powershell
# Check Node.js version (should be 18+)
node --version

# Check Git version
git --version

# Install dependencies
npm install
```

---

## 🔐 Generate Auth Secret
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
**📝 Copy the output - you'll need it!**

---

## 📝 Create .env File
```powershell
# Copy template
cp .env.example .env

# Edit with your values
notepad .env
```

**Paste this template:**
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="paste-generated-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 🗄️ Setup Database
```powershell
# Generate Prisma Client
npm run prisma:generate

# Create tables
npm run prisma:migrate

# Add sample data (admin + 8 products)
npm run prisma:seed
```

---

## 🧪 Test Locally
```powershell
# Run dev server
npm run dev

# Test build
npm run build
```

**Visit:** http://localhost:3000  
**Admin Login:** admin@parfumeluxe.com / admin123

---

## 📤 Git Commands (First Time)
```powershell
# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: Production-ready parfume platform"

# Create main branch
git branch -M main

# Add your GitHub repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/parfume.git

# Push to GitHub
git push -u origin main
```

---

## 📤 Git Commands (Updates)
```powershell
# See changes
git status

# Add all changes
git add .

# Commit with message
git commit -m "Your update description"

# Push to GitHub
git push origin main
```

---

## 🔗 Connect to Existing GitHub Repo
```powershell
# If you already have a repo
git remote add origin https://github.com/tchiboub-dot/parfume.git

# If you need to change remote
git remote set-url origin https://github.com/tchiboub-dot/parfume.git

# Push
git push -u origin main
```

---

## 🌐 Vercel Deployment
```powershell
# Install Vercel CLI globally
npm install -g vercel

# Login (opens browser)
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## ⚙️ Environment Variables for Vercel

**Add these in Vercel Dashboard → Settings → Environment Variables:**

```env
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
NEXTAUTH_SECRET=your-generated-secret-from-above
NEXTAUTH_URL=https://your-app-url.vercel.app
```

**🎯 Get DATABASE_URL from:**
- Vercel Postgres (in Vercel dashboard)
- Neon.tech (free tier)
- Supabase (free tier)

---

## 🗄️ Production Database Setup
```powershell
# After deploying to Vercel and setting DATABASE_URL:

# Push schema to production database
npm run prisma:push

# Seed production database
npm run prisma:seed
```

---

## 🔄 Complete Workflow Example

### First Deployment:
```powershell
# 1. Setup
npm install
git init

# 2. Local test
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev

# 3. Git
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tchiboub-dot/parfume.git
git push -u origin main

# 4. Deploy
vercel login
vercel
vercel --prod
```

### Future Updates:
```powershell
# 1. Make changes
# 2. Test locally
npm run dev

# 3. Git
git add .
git commit -m "Updated feature X"
git push origin main

# 4. Deploy
vercel --prod
```

---

## 🐛 Quick Fixes

### Reset Local Database:
```powershell
rm prisma\dev.db
npm run prisma:migrate
npm run prisma:seed
```

### Regenerate Prisma Client:
```powershell
npm run prisma:generate
```

### View Database (Prisma Studio):
```powershell
npm run prisma:studio
```
Opens at: http://localhost:5555

### Clear Next.js Cache:
```powershell
rm -r .next
npm run build
```

---

## 📊 Useful Commands

```powershell
# Check Vercel logs
vercel logs

# List deployments
vercel ls

# Check build locally
npm run build

# Lint code
npm run lint

# Open Vercel dashboard
vercel open
```

---

## 🎯 URLs After Deployment

- **Live Site:** https://parfume-xxxxx.vercel.app
- **Admin Panel:** https://parfume-xxxxx.vercel.app/en/admin
- **Shop:** https://parfume-xxxxx.vercel.app/en/shop
- **Vercel Dashboard:** https://vercel.com/your-username/parfume

---

## ✅ Checklist

**Before Deployment:**
- [ ] All dependencies installed (`npm install`)
- [ ] Local build successful (`npm run build`)
- [ ] Database seeded (`npm run prisma:seed`)
- [ ] Tested locally (`npm run dev`)
- [ ] Environment variables configured
- [ ] Secrets generated (NEXTAUTH_SECRET)
- [ ] No .env file in git (check .gitignore)

**After Deployment:**
- [ ] Vercel environment variables set
- [ ] Production database created
- [ ] Schema pushed (`npm run prisma:push`)
- [ ] Production database seeded
- [ ] NEXTAUTH_URL updated to production URL
- [ ] Admin login works
- [ ] All pages load correctly
- [ ] Admin password changed from default

---

**🎉 That's it! Your app should be live!**

**Need help?** See DEPLOYMENT.md for detailed instructions.