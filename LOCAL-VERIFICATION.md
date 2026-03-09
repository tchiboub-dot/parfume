# ✅ LOCAL VERIFICATION CHECKLIST

Run this locally BEFORE going to production to ensure everything works.

## 🧪 PRE-DEPLOYMENT TESTS

### Test 1: Production Build
```powershell
npm run build
# Expected: ✓ Compiled successfully in ~5s
# Expected: All 33 routes compiled successfully
# Expected: No errors or warnings
```

### Test 2: Production Server
```powershell
npm start
# Expected: Application started, server ready on http://localhost:3000
# Visit: http://localhost:3000
# Visual check: Homepage loads with hero, products, reviews
```

### Test 3: Navigate All Pages
- Homepage: ✅
- Shop: ✅ (all products load)
- Product Detail: ✅ (click any product)
- Categories: ✅
- About: ✅
- Contact: ✅
- FAQ: ✅

### Test 4: Mobile Responsive
```
Open DevTools: F12 → Toggle device toolbar → Mobile
Check each breakpoint:
- 375px (iPhone SE): ✅ Readable, no overflow
- 390px (iPhone 12): ✅ Good spacing
- 768px (iPad): ✅ Proper tablet layout
- 1024px (Desktop): ✅ Full layout
```

### Test 5: Dark Mode
- Click moon icon in navbar
- Check dark theme applies
- Click sun icon to switch back to light
- Check theme persists on page reload

### Test 6: Internationalization
- URL: http://localhost:3000/en
- URL: http://localhost:3000/fr
- URL: http://localhost:3000/ar (RTL layout)
- Check correct language displays
- Content changes per language

### Test 7: Authentication (Local)
```powershell
# First ensure database is seeded
npm run prisma:seed
# Expected: Admin user created, 8 products loaded
```

Then:
1. Click "Admin" in navbar
2. Try Sign In:
   - Email: admin@parfumeluxe.com
   - Password: admin123
3. Expected: Redirect to admin dashboard ✅
4. Check admin can see:
   - Products list
   - Revenue metrics
   - Orders tracked
   - Can add/edit products

### Test 8: Admin Product CRUD
1. Login as admin (see Test 7)
2. Go to Products
3. Click "New Product"
4. Fill form and submit
5. Expected: Product created and appears in list ✅
6. Click edit on product
7. Change name and save
8. Expected: Changes persist ✅

### Test 9: Console Errors
```
Open DevTools: F12
Tab: Console
Expected: No red errors ❌
OK: Warnings are fine, errors are NOT ✗
```

### Test 10: Build Output Verification
```
Expected route compilation output should show:
✓ All 33 routes compiled successfully

Routes that MUST be present:
- /api/auth/[...nextauth]
- /api/admin/products
- /[locale]/admin
- /[locale]/shop
- /[locale]/product/[slug]
- /[locale]/auth/sign-in
- /api/checkout
```

---

## 📊 TEST RESULTS TEMPLATE

```
LOCAL VERIFICATION RESULTS - [DATE]

✅ Test 1: Production Build - PASS / FAIL
✅ Test 2: Production Server - PASS / FAIL
✅ Test 3: Navigation - PASS / FAIL
✅ Test 4: Mobile Responsive - PASS / FAIL
✅ Test 5: Dark Mode - PASS / FAIL
✅ Test 6: Internationalization - PASS / FAIL
✅ Test 7: Authentication - PASS / FAIL
✅ Test 8: Admin CRUD - PASS / FAIL
✅ Test 9: Console Errors - PASS / FAIL
✅ Test 10: Route Compilation - PASS / FAIL

OVERALL RESULT: PASS / FAIL

If ALL PASS → Ready for Vercel deployment
If ANY FAIL → Debug locally before deploying
```

---

## 🚀 AFTER PASSING ALL TESTS

You are ready to:
1. Deploy to Vercel (follow PRODUCTION-DEPLOYMENT-GUIDE.md)
2. Seed production database
3. Test production authentication
4. Go live! 🎉

---

## ⚠️ COMMON LOCAL TEST FAILURES

**Build fails:**
- Run: `npm install` (reinstall dependencies)
- Run: `npm run prisma:generate` (regenerate client)
- Fix any TypeScript errors shown

**Server won't start:**
- Port 3000 already in use: Kill process on port 3000
- PowerShell: `Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process`

**Products don't show:**
- Database not seeded: Run `npm run prisma:seed`
- Check database file exists: `ls prisma/dev.db`

**Login doesn't work:**
- Verify seeding worked: `npm run prisma:studio`
- Check user exists: Search for admin@parfumeluxe.com

**Mobile view broken:**
- Clear browser cache: DevTools → F12 → Settings → Clear cache
- Check Tailwind CSS built: Should see styles instantly

**RTL (Arabic) not working:**
- Refresh page (F5)
- Check URL is `/ar`
- CSS should apply right-to-left layout

---

**All tests passing = Production ready!** ✅
