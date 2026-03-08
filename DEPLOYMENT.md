# 🚀 Complete Deployment Guide - Windows Terminal

## Prerequisites Checklist

- ✅ GitHub account created
- ✅ Vercel account created (sign up at vercel.com)
- ✅ Git installed on Windows
- ✅ Node.js installed (v18 or higher)
- ✅ Database provider chosen (Vercel Postgres, Neon, or Supabase)

---

## 📦 Step 1: Prepare Your Project

### Install dependencies and run initial build

```powershell
npm install
npm run build
```

**Expected output:** `✓ Compiled successfully`

---

## 🗄️ Step 2: Set Up Production Database

### Option A: Vercel Postgres (Recommended)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Create a new project (it will be used later)
3. Click **Storage** → **Create Database** → **Postgres**
4. Copy the `DATABASE_URL` (Prisma format)
5. Save it for Step 4

### Option B: Neon.tech (Free PostgreSQL)

1. Go to [neon.tech](https://neon.tech)
2. Sign up and create a new project
3. Copy the **Connection String** (Prisma format)
4. Save it for Step 4

### Option C: Supabase (Free PostgreSQL)

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to **Settings** → **Database**
4. Copy **Connection string** → **Prisma**
5. Save it for Step 4

---

## 🔐 Step 3: Generate Secrets

Open PowerShell and run:

```powershell
# Generate NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Copy the output** - you'll need it in Step 4.

---

## 📝 Step 4: Configure Environment Variables

Create `.env` file in your project root:

```powershell
notepad .env
```

Paste this template and **replace the values**:

```env
# Database (from Step 2)
DATABASE_URL="postgresql://user:password@host.neon.tech:5432/database?sslmode=require"

# Auth Secret (from Step 3)
NEXTAUTH_SECRET="your-generated-secret-from-step-3"

# This will be updated after Vercel deployment
NEXTAUTH_URL="http://localhost:3000"

# Optional: Stripe keys (if using payments)
# STRIPE_SECRET_KEY="sk_test_or_sk_live_..."
# STRIPE_WEBHOOK_SECRET="whsec_..."
```

Save and close.

---

## 🗃️ Step 5: Initialize Database Schema

```powershell
# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Seed with sample data (admin user + 8 products)
npm run prisma:seed
```

**Expected output:**
```
✅ Admin user created: admin@parfumeluxe.com
✅ Brands created: 5
✅ Categories created: 3
✅ Perfumes created: 8
```

---

## 🧪 Step 6: Test Locally

```powershell
npm run dev
```

Open browser: [http://localhost:3000](http://localhost:3000)

**Test these:**
- ✅ Homepage loads
- ✅ Shop page shows products
- ✅ Sign in: `admin@parfumeluxe.com` / `admin123`
- ✅ Admin dashboard accessible at `/en/admin`

If everything works, press `Ctrl+C` to stop the server.

---

## 📤 Step 7: Push to GitHub

### 7.1 Initialize Git (if not already done)

```powershell
git init
```

### 7.2 Add all files

```powershell
git add .
```

### 7.3 Commit

```powershell
git commit -m "Production-ready: Parfume luxury e-commerce platform"
```

### 7.4 Create main branch

```powershell
git branch -M main
```

### 7.5 Add your GitHub repository

**Replace `YOUR_USERNAME` with your GitHub username:**

```powershell
git remote add origin https://github.com/YOUR_USERNAME/parfume.git
```

**Or use your existing repo:**

```powershell
git remote add origin https://github.com/tchiboub-dot/parfume.git
```

### 7.6 Push to GitHub

```powershell
git push -u origin main
```

**If prompted:**
- Enter GitHub username
- Enter Personal Access Token (not password - create at [github.com/settings/tokens](https://github.com/settings/tokens))

---

## 🌐 Step 8: Deploy to Vercel

### 8.1 Install Vercel CLI

```powershell
npm install -g vercel
```

### 8.2 Login to Vercel

```powershell
vercel login
```

**Follow the prompts:**
- Select your email verification method
- Check your email and confirm

### 8.3 Deploy to Preview

```powershell
vercel
```

**Answer the prompts:**
- **Set up and deploy?** → `Y`
- **Which scope?** → Select your account
- **Link to existing project?** → `N`
- **Project name?** → `parfume` (or press Enter)
- **Directory?** → Press Enter (current directory)
- **Override settings?** → `N`

**Wait for deployment...** (~2-3 minutes)

### 8.4 Configure Environment Variables on Vercel

The CLI will ask about environment variables:

```powershell
# You'll be prompted for each:
? What's the value of DATABASE_URL?
[Paste your DATABASE_URL from Step 2]

? What's the value of NEXTAUTH_SECRET?
[Paste your secret from Step 3]

? What's the value of NEXTAUTH_URL?
[Leave empty for now - we'll set it after deployment]
```

### 8.5 Get Your Deployment URL

After deployment completes, you'll see:

```
✅ Preview: https://parfume-xxxxx.vercel.app
```

**Copy this URL!**

### 8.6 Update NEXTAUTH_URL

Go to [vercel.com/dashboard](https://vercel.com/dashboard):

1. Click your **parfume** project
2. Go to **Settings** → **Environment Variables**
3. Find `NEXTAUTH_URL`
4. Edit and set to: `https://your-parfume-url.vercel.app`
5. Click **Save**

### 8.7 Deploy to Production

```powershell
vercel --prod
```

**Your live URL will be displayed!** 🎉

---

## ✅ Step 9: Verify Deployment

### 9.1 Test Your Live Site

Visit your production URL: `https://parfume-xxxxx.vercel.app`

**Check these pages:**
- ✅ Homepage: `https://your-url.vercel.app`
- ✅ Shop: `https://your-url.vercel.app/en/shop`
- ✅ Sign In: `https://your-url.vercel.app/en/auth/sign-in`
- ✅ Admin: `https://your-url.vercel.app/en/admin`

### 9.2 Test Admin Login

```
Email: admin@parfumeluxe.com
Password: admin123
```

**⚠️ IMPORTANT:** Change this password immediately after first login!

### 9.3 Test Product Management

1. Go to Admin Dashboard
2. Click **Manage Products**
3. Try to:
   - ✅ View all products
   - ✅ Add a new product
   - ✅ Edit existing product
   - ✅ Delete a product

---

## 🎯 Step 10: Custom Domain (Optional)

### Add Your Own Domain

In Vercel Dashboard:

1. Go to your project → **Settings** → **Domains**
2. Add your domain (e.g., `parfume.com`)
3. Follow DNS configuration instructions
4. Update `NEXTAUTH_URL` to `https://parfume.com`

---

## 🔄 Step 11: Future Updates

### Make changes and redeploy:

```powershell
# 1. Make your code changes
# 2. Test locally
npm run dev

# 3. Commit changes
git add .
git commit -m "Your change description"

# 4. Push to GitHub
git push origin main

# 5. Deploy to Vercel (automatic if GitHub integration enabled)
# Or manually:
vercel --prod
```

---

## 🐛 Troubleshooting

### ❌ Build Failed on Vercel

**Check Vercel logs:**
```powershell
vercel logs
```

**Common fixes:**
- Verify all environment variables are set
- Ensure `DATABASE_URL` is correct
- Check Node.js version (should be 18+)

### ❌ Database Connection Error

**Verify DATABASE_URL:**
- Must be PostgreSQL format
- Must include `?sslmode=require` for secure connections
- Test locally first

### ❌ Authentication Not Working

**Check these:**
- `NEXTAUTH_SECRET` is set and matches everywhere
- `NEXTAUTH_URL` matches your deployment URL exactly
- No trailing slash in `NEXTAUTH_URL`

### ❌ Admin Page Shows 404

**Run seed script:**
```powershell
npm run prisma:seed
```

This creates the admin user.

---

## 📊 Monitoring Your App

### Vercel Dashboard

- **Analytics:** View page views, performance
- **Logs:** Debug runtime errors
- **Deployments:** View all deployments history

### Prisma Studio (Database GUI)

```powershell
npm run prisma:studio
```

Opens at: [http://localhost:5555](http://localhost:5555)

---

## 🎉 Congratulations!

Your luxury perfume e-commerce platform is now live!

**Next Steps:**
- 🔐 Change admin password
- 💳 Set up Stripe for real payments
- 📸 Add product images via Cloudinary
- 📧 Configure email notifications
- 🎨 Customize branding and colors
- 📱 Test on mobile devices
- 🚀 Share with the world!

---

## 📞 Need Help?

- **Documentation:** See README.md
- **Issues:** [GitHub Issues](https://github.com/tchiboub-dot/parfume/issues)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Prisma Docs:** [prisma.io/docs](https://prisma.io/docs)

---

**Made with ❤️ by Tchiboub**