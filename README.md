# 🌸 Parfume Luxe

A luxury perfume e-commerce platform built with Next.js 16, featuring multilingual support (English, French, Arabic with RTL), authentication, admin dashboard, and Stripe payment integration.

## ✨ Features

- 🎨 **Luxury Design**: Animated starfield background, elegant typography, dark/light theme
- 🌍 **Multilingual**: Full support for English, French, and Arabic (with RTL layout)
- 🔐 **Authentication**: NextAuth v4 with role-based access control (Admin/Customer)
- 🛡️ **Admin Dashboard**: Complete product CRUD operations with protected routes
- 💳 **Stripe Integration**: Secure payment processing with checkout sessions
- 📦 **Database**: Prisma ORM with SQLite (dev) and PostgreSQL (production)
- 🎭 **Animations**: Framer Motion for smooth transitions and interactions
- 📱 **Responsive**: Mobile-first design that works on all devices
- ⚡ **Performance**: Built with Next.js 16 App Router and Turbopack

## 🚀 Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Database**: Prisma 6.16.3 + PostgreSQL/SQLite
- **Authentication**: NextAuth 4.24.13
- **Payments**: Stripe 20.4.1
- **Animations**: Framer Motion 12.35.1
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Custom components with Lucide icons

## 📋 Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm
- PostgreSQL database (for production deployment)

## 🛠️ Local Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/parfume-luxe.git
cd parfume-luxe
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Database (SQLite for local dev)
DATABASE_URL="file:./dev.db"

# Auth - Generate secure secrets
AUTH_SECRET="your-generated-secret-here"
NEXTAUTH_SECRET="your-generated-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Stripe (optional for local testing)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

**Generate secure secrets:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 4. Set up the database

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed the database with sample data
npm run prisma:seed
```

**Default Admin Account:**
- Email: `admin@parfumeluxe.com`
- Password: `admin123`

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📦 Environment Variables

### Required

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `postgresql://user:pass@host:5432/db` |
| `AUTH_SECRET` | NextAuth secret key | Generated 32-byte base64 string |
| `NEXTAUTH_SECRET` | NextAuth secret (same as AUTH_SECRET) | Generated 32-byte base64 string |
| `NEXTAUTH_URL` | Application URL | `https://yourdomain.com` |

### Optional

| Variable | Description | Example |
|----------|-------------|---------|
| `STRIPE_SECRET_KEY` | Stripe secret API key | `sk_test_...` or `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | `whsec_...` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `abcdefghijklmnopqrstuvwxyz` |

## 🚀 Deploy to Vercel

### Prerequisites

1. **Set up a PostgreSQL database** (SQLite doesn't work on Vercel):
   - [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
   - [Neon](https://neon.tech/)
   - [Supabase](https://supabase.com/)
   - [PlanetScale](https://planetscale.com/)

2. **Update Prisma schema** for PostgreSQL (if using SQLite locally):

```prisma
datasource db {
  provider = "postgresql"  // Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

### Deployment Steps

#### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

#### Option 2: Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Configure environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NEXTAUTH_SECRET`: Your generated secret
   - `NEXTAUTH_URL`: Your Vercel deployment URL (e.g., `https://yourapp.vercel.app`)
   - (Optional) `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
5. Click "Deploy"

### After Deployment

1. **Run database migrations** on your production database:

```bash
# Set DATABASE_URL to production
export DATABASE_URL="postgresql://..."

# Push schema to production
npm run prisma:push

# Seed production database
npm run prisma:seed
```

2. **Update NEXTAUTH_URL** in Vercel environment variables to your actual domain

3. **Configure Stripe webhooks** (if using Stripe):
   - Add your Vercel URL to Stripe webhook endpoints
   - Update `STRIPE_WEBHOOK_SECRET` in Vercel

## 📁 Project Structure

```
parfume-luxe/
├── prisma/
│   ├── migrations/          # Database migrations
│   ├── schema.prisma        # Database schema
│   └── seed.ts             # Database seeding script
├── public/                  # Static assets
├── src/
│   ├── app/
│   │   ├── [locale]/       # Internationalized routes
│   │   │   ├── admin/      # Admin dashboard pages
│   │   │   ├── auth/       # Authentication pages
│   │   │   ├── shop/       # Shop pages
│   │   │   └── ...         # Other pages
│   │   └── api/            # API routes
│   │       ├── admin/      # Admin API endpoints
│   │       ├── auth/       # NextAuth endpoints
│   │       └── ...         # Public API endpoints
│   ├── components/
│   │   ├── layout/         # Layout components
│   │   ├── sections/       # Page sections
│   │   ├── shop/           # Shop components
│   │   └── ui/             # Reusable UI components
│   ├── lib/
│   │   ├── auth-options.ts # NextAuth configuration
│   │   ├── auth.ts         # Auth helpers
│   │   ├── prisma.ts       # Prisma client
│   │   ├── stripe.ts       # Stripe client
│   │   ├── i18n.ts         # Internationalization config
│   │   └── translations.ts # Translation data
│   └── types/              # TypeScript type definitions
├── .env.example            # Environment variables template
├── .gitignore             # Git ignore rules
├── middleware.ts          # Next.js middleware (i18n routing)
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies and scripts
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vercel.json            # Vercel deployment configuration
```

## 🔐 Admin Access

After seeding the database, you can access the admin dashboard:

1. Navigate to `/auth/sign-in`
2. Login with:
   - Email: `admin@parfumeluxe.com`
   - Password: `admin123`
3. Access admin panel at `/admin`

**⚠️ Important**: Change the default admin password in production!

## 🎨 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio
npm run prisma:seed      # Seed database with sample data
npm run prisma:push      # Push schema to database (production)
```

## 🌐 Internationalization

The application supports three languages:
- **English** (en) - Default
- **French** (fr)
- **Arabic** (ar) - with RTL layout support

Switch languages using the language selector in the navigation bar.

## 💳 Payment Integration

Stripe payment integration is configured but optional. To enable:

1. Get your Stripe API keys from [dashboard.stripe.com](https://dashboard.stripe.com/apikeys)
2. Add to `.env`:
   ```env
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   ```
3. Configure Stripe webhooks for your domain

## 🐛 Troubleshooting

### Build fails with Prisma errors

```bash
# Regenerate Prisma Client
npm run prisma:generate
```

### Database connection issues

- For local development, ensure `DATABASE_URL="file:./dev.db"`
- For production, use a PostgreSQL connection string
- Check that database is accessible from your deployment environment

### NextAuth authentication issues

- Ensure `NEXTAUTH_SECRET` is set and matches in all environments
- Update `NEXTAUTH_URL` to match your deployment domain
- Check that cookies are enabled in your browser

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or support, please contact the development team.

## 📧 Support

For issues or questions, please contact: support@parfumeluxe.com

---

Built with ❤️ using Next.js and modern web technologies.
# parfume
