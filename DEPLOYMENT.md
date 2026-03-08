# Deployment Guide for Windows

This guide provides step-by-step commands to deploy your Parfume Luxe e-commerce platform to GitHub and Vercel.

## Prerequisites

- Git installed on your system
- A GitHub account
- A Vercel account (sign up at https://vercel.com)
- PostgreSQL database for production (Vercel Postgres, Neon, Supabase, or PlanetScale)

## Part 1: Push to GitHub

### Step 1: Initialize Git (if not already done)

```powershell
cd C:\Users\mlap\OneDrive\Desktop\appli-complete\parfume
git status
```

If git is not initialized, run:
```powershell
git init
```

### Step 2: Add all files to Git

```powershell
git add .
```

### Step 3: Commit your changes

```powershell
git commit -m "Initial commit: Luxury perfume e-commerce platform with Next.js 16, multilingual support, admin dashboard, and Stripe integration"
```

### Step 4: Create main branch

```powershell
git branch -M main
```

### Step 5: Create a new repository on GitHub

1. Go to https://github.com/new
2. Repository name: `parfume-luxe` (or your preferred name)
3. Description: "Luxury perfume e-commerce platform with Next.js, multilingual support, and admin dashboard"
4. Select "Private" or "Public" as needed
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Step 6: Connect local repository to GitHub

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

Example:
```powershell
git remote add origin https://github.com/johndoe/parfume-luxe.git
```

### Step 7: Push to GitHub

```powershell
git push -u origin main
```

If prompted, enter your GitHub username and password/token.

### Step 8: Verify on GitHub

Go to your repository URL in a browser and verify all files are pushed.

---

## Part 2: Deploy to Vercel

### Step 1: Set up PostgreSQL Database

Before deploying, you need a production database. Choose one:

#### Option A: Vercel Postgres (Recommended)

1. Go to https://vercel.com/dashboard
2. Click on "Storage" tab
3. Create a new Postgres database
4. Copy the `DATABASE_URL` connection string

#### Option B: Neon (Free tier available)

1. Go to https://neon.tech
2. Create a new project
3. Copy the connection string

#### Option C: Supabase

1. Go to https://supabase.com
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string (URI format)

### Step 2: Update Prisma Schema for PostgreSQL

Before deploying, ensure your `prisma/schema.prisma` uses PostgreSQL:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Also update any `Float` fields back to `Decimal` for better precision:
- In `Perfume` model: `price Decimal` and `oldPrice Decimal?`
- In `Order` model: `total Decimal`
- In `OrderItem` model: `unitPrice Decimal`
- In `ProductVariant` model: `price Decimal`

Commit these changes:
```powershell
git add prisma/schema.prisma
git commit -m "Update schema for PostgreSQL production deployment"
git push
```

### Step 3: Install Vercel CLI

```powershell
npm install -g vercel
```

### Step 4: Login to Vercel

```powershell
vercel login
```

This will open a browser window. Confirm the login.

### Step 5: Deploy to Vercel (Staging)

In your project directory, run:

```powershell
vercel
```

**Follow the prompts:**
1. Set up and deploy? **Y**
2. Which scope? Select your account
3. Link to existing project? **N**
4. What's your project's name? `parfume-luxe` (or press Enter for default)
5. In which directory is your code located? **./** (press Enter)
6. Want to modify settings? **N**

Vercel will detect Next.js and deploy your app.

### Step 6: Configure Environment Variables in Vercel

1. Go to your project dashboard on Vercel (URL will be shown after deployment)
2. Click "Settings" > "Environment Variables"
3. Add the following variables for **Production**, **Preview**, and **Development**:

```
DATABASE_URL = your-postgresql-connection-string
NEXTAUTH_SECRET = (generate: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")
NEXTAUTH_URL = https://your-app.vercel.app
```

Optional (if using Stripe):
```
STRIPE_SECRET_KEY = sk_live_... (or sk_test_ for testing)
STRIPE_WEBHOOK_SECRET = whsec_...
```

### Step 7: Database Setup on Production

After setting `DATABASE_URL`, you need to push the schema and seed the database:

#### Option 1: Using Vercel CLI

```powershell
# Set the DATABASE_URL temporarily
$env:DATABASE_URL = "your-production-postgres-url"

# Push schema to production
npx prisma db push

# Seed the database
npx prisma db seed

# Clear the environment variable
Remove-Item Env:\DATABASE_URL
```

#### Option 2: Using a temporary build

1. Create a file `scripts/setup-production-db.ts`:
```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// Your seed script content here
```

2. Or run the seed script with production DATABASE_URL temporarily set

### Step 8: Deploy to Production

After configuring environment variables and setting up the database:

```powershell
vercel --prod
```

This deploys to your production domain.

### Step 9: Update NEXTAUTH_URL

1. After production deployment, copy your production URL (e.g., `https://parfume-luxe.vercel.app`)
2. Go to Vercel Dashboard > Settings > Environment Variables
3. Update `NEXTAUTH_URL` to your production URL
4. Redeploy:
```powershell
vercel --prod
```

### Step 10: Test Your Deployment

1. Visit your production URL
2. Try signing in with admin credentials:
   - Email: `admin@parfumeluxe.com`
   - Password: `admin123`
3. Navigate to `/admin` to verify admin access
4. Test creating/editing products
5. Test the shop functionality

---

## Complete Command Summary

### GitHub Deployment
```powershell
# Navigate to project
cd C:\Users\mlap\OneDrive\Desktop\appli-complete\parfume

# Check git status (initialize if needed)
git status
# If not initialized: git init

# Stage all files
git add .

# Commit changes
git commit -m "Initial commit: Luxury perfume e-commerce platform"

# Create main branch
git branch -M main

# Add remote (replace with your details)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### Vercel Deployment
```powershell
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to staging
vercel

# Configure environment variables in Vercel Dashboard:
# - DATABASE_URL
# - NEXTAUTH_SECRET
# - NEXTAUTH_URL

# Deploy to production
vercel --prod
```

---

## Troubleshooting

### Issue: Build fails with Prisma errors
**Solution**: Ensure `postinstall` script in package.json runs `prisma generate`

### Issue: Database connection fails
**Solution**: 
- Verify `DATABASE_URL` is correct in Vercel environment variables
- Ensure database allows connections from Vercel IP ranges
- Check that schema is pushed to production database

### Issue: Authentication not working
**Solution**:
- Verify `NEXTAUTH_SECRET` is set in Vercel
- Ensure `NEXTAUTH_URL` matches your production domain
- Check that cookies are not blocked

### Issue: API routes return 500 errors
**Solution**:
- Check Vercel logs: `vercel logs`
- Verify all environment variables are set
- Ensure database is accessible

---

## Continuous Deployment

Once set up, every push to your main branch will automatically deploy:

```powershell
# Make changes
git add .
git commit -m "Your commit message"
git push

# Vercel will automatically deploy
```

To deploy to production:
```powershell
vercel --prod
```

Or set your main branch to auto-deploy to production in Vercel settings.

---

## Security Checklist

Before going live:

- [ ] Change default admin password (`admin123`)
- [ ] Use strong `NEXTAUTH_SECRET` (32+ characters)
- [ ] Enable HTTPS only (Vercel does this by default)
- [ ] Set proper CORS policies
- [ ] Review and update all environment variables
- [ ] Never commit `.env` file to Git
- [ ] Use production Stripe keys (not test keys) in production
- [ ] Set up Stripe webhooks with your production domain
- [ ] Enable database backups
- [ ] Monitor error logs regularly

---

**Deployment Complete!** 🎉

Your luxury perfume e-commerce platform is now live on Vercel!
