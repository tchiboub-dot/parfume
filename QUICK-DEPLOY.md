# 🚀 Quick Deployment Commands

## Copy-Paste Commands for Windows PowerShell

### 📋 Prerequisites Checklist
- [ ] Git installed
- [ ] Node.js 18.17+ installed
- [ ] GitHub account created
- [ ] Vercel account created
- [ ] PostgreSQL database URL ready (for production)

---

## 🔥 STEP-BY-STEP DEPLOYMENT

### Step 1: Navigate to Project Directory
```powershell
cd C:\Users\mlap\OneDrive\Desktop\appli-complete\parfume
```

### Step 2: Verify Git Status
```powershell
git status
```

### Step 3: Add All Files
```powershell
git add .
```

### Step 4: Commit Changes
```powershell
git commit -m "Initial commit: Production-ready luxury perfume e-commerce platform"
```

### Step 5: Create Main Branch
```powershell
git branch -M main
```

### Step 6: Create GitHub Repository
1. Go to: https://github.com/new
2. Repository name: `parfume-luxe`
3. Make it Private or Public
4. **DO NOT** initialize with README
5. Click "Create repository"

### Step 7: Connect to GitHub
**⚠️ IMPORTANT: Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub info!**

```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

Example:
```powershell
git remote add origin https://github.com/johndoe/parfume-luxe.git
```

### Step 8: Push to GitHub
```powershell
git push -u origin main
```

If prompted for authentication, use your GitHub username and Personal Access Token (not password).

**✅ GitHub Deployment Complete!**

---

## 🌐 Deploy to Vercel

### Step 9: Install Vercel CLI
```powershell
npm install -g vercel
```

### Step 10: Login to Vercel
```powershell
vercel login
```
*A browser window will open - confirm the login*

### Step 11: Deploy to Vercel (Preview)
```powershell
vercel
```

**Answer the prompts:**
- Set up and deploy? → **Y**
- Which scope? → Select your account
- Link to existing project? → **N**
- Project name? → `parfume-luxe` (or press Enter)
- Code location? → **./** (press Enter)
- Modify settings? → **N**

### Step 12: Configure Environment Variables

Go to your Vercel dashboard and add these environment variables:

**Required Variables:**
```
DATABASE_URL = your-postgresql-connection-string
NEXTAUTH_SECRET = [Generate using: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"]
NEXTAUTH_URL = https://your-app-name.vercel.app
```

**Optional Variables (for Stripe):**
```
STRIPE_SECRET_KEY = sk_test_... (or sk_live_ for production)
STRIPE_WEBHOOK_SECRET = whsec_...
```

### Step 13: Update Schema for Production

**⚠️ CRITICAL: Before deploying to production, update your database configuration!**

Copy the production schema:
```powershell
Copy-Item prisma\schema.production.prisma prisma\schema.prisma -Force
```

Or manually edit `prisma/schema.prisma`:
- Change `provider = "sqlite"` to `provider = "postgresql"`
- Change `Float` to `Decimal` for price fields

Commit the changes:
```powershell
git add prisma/schema.prisma
git commit -m "Update schema for PostgreSQL production"
git push
```

### Step 14: Setup Production Database

Set your production DATABASE_URL temporarily:
```powershell
$env:DATABASE_URL = "your-production-postgresql-url"
```

Push schema to production:
```powershell
npx prisma db push
```

Seed the database:
```powershell
npx prisma db seed
```

Clear the environment variable:
```powershell
Remove-Item Env:\DATABASE_URL
```

### Step 15: Deploy to Production
```powershell
vercel --prod
```

### Step 16: Update NEXTAUTH_URL

After production deployment:
1. Copy your production URL (e.g., `https://parfume-luxe.vercel.app`)
2. Update `NEXTAUTH_URL` in Vercel environment variables
3. Redeploy:
```powershell
vercel --prod
```

**🎉 DEPLOYMENT COMPLETE!**

---

## 🔧 Common Issues & Solutions

### Issue: Git asks for password
**Solution:** Use Personal Access Token instead of password
- Go to: https://github.com/settings/tokens
- Generate new token (classic)
- Copy and use as password

### Issue: Vercel build fails
**Solution:** Check these:
```powershell
# Verify dependencies
npm install

# Test build locally
npm run build

# Check Vercel logs
vercel logs
```

### Issue: Database connection fails
**Solution:**
- Verify DATABASE_URL in Vercel dashboard
- Check PostgreSQL database is accessible
- Ensure schema is pushed: `npx prisma db push`

### Issue: Authentication not working
**Solution:**
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies and try again

---

## 🔄 Future Deployments

After initial setup, deploying updates is simple:

```powershell
# Make your changes

# Commit and push
git add .
git commit -m "Your update description"
git push

# Vercel will auto-deploy to preview

# Deploy to production
vercel --prod
```

---

## 📱 Access Your Live Site

After deployment:
- **Preview URL**: Shown after `vercel` command
- **Production URL**: Shown after `vercel --prod` command
- **Admin Panel**: `your-site.vercel.app/admin`

**Default Admin Login:**
- Email: `admin@parfumeluxe.com`
- Password: `admin123`

**⚠️ CHANGE THIS PASSWORD IMMEDIATELY IN PRODUCTION!**

---

## 📞 Support

Need help? Check:
- **Full Documentation**: See `README.md`
- **Detailed Guide**: See `DEPLOYMENT.md`
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

**Happy Deploying! 🚀**
