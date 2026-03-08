# 🌸 Parfume Luxe - Luxury Perfume E-Commerce Platform

A production-ready, full-stack e-commerce platform for luxury perfumes built with **Next.js 16**, **TypeScript**, **Prisma**, **NextAuth**, and **Stripe**. Features multilingual support (EN/FR/AR with RTL), animated UI, admin dashboard, and complete authentication system.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tchiboub-dot/parfume)

## ✨ Features

### 🛍️ **Customer Features**
- 🌍 **Multilingual Support** - English, French, Arabic (with RTL)
- 🎨 **Luxury Design** - Animated starfield backgrounds, smooth transitions
- 🔐 **Authentication** - Secure sign-up/sign-in with NextAuth v4
- 🛒 **Shopping Cart** - Add to cart, wishlist functionality
- 💳 **Stripe Checkout** - Secure payment processing + Cash on Delivery
- 📱 **Responsive** - Mobile-first design with Tailwind CSS v4
- 🌙 **Dark/Light Mode** - Theme switching with next-themes
- 🔍 **Product Search** - Filter by brand, category, price, audience
- 📖 **Product Details** - Full product pages with descriptions
- 📧 **Contact Form** - Customer support with database persistence

### 👨‍💼 **Admin Features**
- 📊 **Dashboard** - Revenue, orders, customers, stock metrics
- ➕ **Product Management** - Full CRUD operations
- ✏️ **Edit Products** - Update product details, pricing, stock
- 🗑️ **Delete Products** - Remove products with confirmation
- 🔒 **Role-Based Access** - Admin-only protected routes
- 📦 **Stock Tracking** - Low stock alerts and indicators
- 🏷️ **Brand & Category** - Dynamic brand/category management

## 🚀 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16.1.6 (App Router, Turbopack) |
| **Language** | TypeScript 5 (Strict Mode) |
| **Styling** | Tailwind CSS v4, Framer Motion |
| **Database** | Prisma 6.16.3 + PostgreSQL/SQLite |
| **Authentication** | NextAuth v4.24.13, bcryptjs |
| **Payments** | Stripe 20.4.1 |
| **Validation** | Zod 4.3.6 |
| **UI Components** | Lucide React, Custom Components |
| **Fonts** | Cormorant Garamond, Manrope, Noto Naskh Arabic |

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** database (for production) or **SQLite** (for local development)
- **Git** installed

## 🔧 Installation & Local Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/tchiboub-dot/parfume.git
cd parfume
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

**For Local Development (SQLite):**

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="generate-a-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

**Generate NEXTAUTH_SECRET:**

```bash
# Windows PowerShell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Linux/Mac
openssl rand -base64 32
```

### 4️⃣ Set Up Database

**For SQLite (Local Development):**

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

**For PostgreSQL (Production):**

```bash
npm run prisma:push
npm run prisma:seed
```

### 5️⃣ Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6️⃣ Default Admin Credentials

After seeding, use these credentials to access the admin panel:

```
Email: admin@parfumeluxe.com
Password: admin123
```

⚠️ **Important:** Change this password in production!

## 📦 Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✅ Yes | Database connection string | `postgresql://user:pass@host:5432/db` |
| `NEXTAUTH_SECRET` | ✅ Yes | Secret for JWT encryption (min 32 chars) | `your-super-secret-key` |
| `NEXTAUTH_URL` | ✅ Yes | Your application URL | `https://parfume.vercel.app` |
| `STRIPE_SECRET_KEY` | ❌ No | Stripe secret key for payments | `sk_test_...` or `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | ❌ No | Stripe webhook signing secret | `whsec_...` |
| `CLOUDINARY_CLOUD_NAME` | ❌ No | Cloudinary cloud name for images | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | ❌ No | Cloudinary API key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | ❌ No | Cloudinary API secret | `your-api-secret` |

## 🏗️ Build for Production

```bash
npm run build
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## 🌐 Deploy to Vercel

### Option 1: Deploy Button (Easiest)

Click the "Deploy with Vercel" button at the top of this README.

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Option 3: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables
6. Click "Deploy"

### ⚙️ Vercel Environment Variables Setup

In your Vercel project dashboard, add these environment variables:

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=https://your-app.vercel.app
```

### 🗄️ Database Setup on Vercel

**Option 1: Vercel Postgres**

1. Go to your Vercel project dashboard
2. Click "Storage" → "Create Database" → "Postgres"
3. Copy the `DATABASE_URL` to your environment variables
4. Run: `npx prisma db push` locally to sync schema
5. Run: `npm run prisma:seed` to add initial data

**Option 2: External Database (Neon, Supabase, Railway)**

1. Create a PostgreSQL database on your provider
2. Copy the connection string as `DATABASE_URL`
3. Add to Vercel environment variables
4. Deploy and run migrations

## 📁 Project Structure

```
parfume/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts                # Seed data script
│   └── migrations/            # Database migrations
├── public/                    # Static assets
├── src/
│   ├── app/
│   │   ├── [locale]/         # Localized routes
│   │   │   ├── admin/        # Admin dashboard & product management
│   │   │   ├── auth/         # Sign-in & sign-up pages
│   │   │   ├── shop/         # Product listing
│   │   │   ├── product/      # Product detail pages
│   │   │   └── ...
│   │   └── api/
│   │       ├── auth/         # NextAuth endpoints
│   │       ├── admin/        # Admin API routes
│   │       ├── products/     # Product API
│   │       ├── checkout/     # Stripe checkout
│   │       └── contact/      # Contact form
│   ├── components/
│   │   ├── layout/           # Navbar, Footer
│   │   ├── sections/         # Home page sections
│   │   ├── shop/             # Product cards, grids
│   │   ├── ui/               # Reusable UI components
│   │   └── providers/        # Context providers
│   ├── lib/
│   │   ├── auth.ts           # NextAuth configuration
│   │   ├── prisma.ts         # Prisma client
│   │   ├── stripe.ts         # Stripe client
│   │   ├── i18n.ts           # Internationalization
│   │   └── translations.ts   # Translation strings
│   └── types/                # TypeScript types
└── middleware.ts             # i18n middleware

```

## 🗄️ Database Schema

### Models

- **User** - Authentication and user management
- **Perfume** - Product catalog
- **Brand** - Product brands
- **Category** - Product categories
- **Order** - Customer orders
- **OrderItem** - Order line items
- **Review** - Product reviews
- **ContactMessage** - Customer inquiries
- **WishlistItem** - User wishlists
- **Address** - Shipping addresses

## 📜 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations (dev)
npm run prisma:push      # Push schema to database (production)
npm run prisma:studio    # Open Prisma Studio GUI
npm run prisma:seed      # Seed database with sample data
```

## 🔐 Security Features

- ✅ JWT-based authentication with NextAuth
- ✅ Password hashing with bcryptjs (10 rounds)
- ✅ Role-based access control (ADMIN/CUSTOMER)
- ✅ Protected API routes with session validation
- ✅ Secure headers (X-Frame-Options, CSP)
- ✅ Environment variable validation
- ✅ SQL injection prevention via Prisma ORM
- ✅ XSS protection with React's built-in escaping

## 🎨 Design Features

- 🌌 Animated starfield backgrounds
- ✨ Smooth page transitions with Framer Motion
- 🎭 Dark/Light theme toggle
- 📱 Fully responsive design
- ♿ Accessible components
- 🌍 RTL support for Arabic
- 🎯 Lazy loading images and components

## 🐛 Troubleshooting

### Build Errors

**Error: `Prisma Client not generated`**
```bash
npm run prisma:generate
```

**Error: `DATABASE_URL is not set`**
```bash
# Check your .env file exists and has DATABASE_URL
cat .env
```

### Database Issues

**Error: `Can't reach database server`**
```bash
# For PostgreSQL, ensure your database is running
# For SQLite, check DATABASE_URL="file:./dev.db"
```

**Need to reset database?**
```bash
# WARNING: This deletes all data
rm prisma/dev.db
npm run prisma:migrate
npm run prisma:seed
```

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Tchiboub**
- GitHub: [@tchiboub-dot](https://github.com/tchiboub-dot)
- Repository: [parfume](https://github.com/tchiboub-dot/parfume)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Prisma for the excellent ORM
- Tailwind CSS for styling utilities
- NextAuth for authentication

---

Made with ❤️ by Tchiboub
