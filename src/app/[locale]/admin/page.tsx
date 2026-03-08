import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, ShoppingCart, Users, AlertTriangle } from "lucide-react";

import { getAuthSession } from "@/lib/auth";
import { adminStats } from "@/lib/data";

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const session = await getAuthSession();
  const { locale } = await params;

  if (!session?.user) {
    redirect(`/${locale}/auth/sign-in`);
  }

  if (session.user.role !== "ADMIN") {
    redirect(`/${locale}/account`);
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted">Welcome back, {session.user.fullName || session.user.email}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="bg-surface p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted">Revenue</p>
              <div className="p-2 bg-green-500/20 rounded-md">
                <Package className="w-4 h-4 text-green-400" />
              </div>
            </div>
            <h2 className="text-3xl font-bold">{adminStats.revenue}</h2>
          </div>

          <div className="bg-surface p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted">Orders</p>
              <div className="p-2 bg-blue-500/20 rounded-md">
                <ShoppingCart className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <h2 className="text-3xl font-bold">{adminStats.orders}</h2>
          </div>

          <div className="bg-surface p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted">Customers</p>
              <div className="p-2 bg-purple-500/20 rounded-md">
                <Users className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <h2 className="text-3xl font-bold">{adminStats.customers}</h2>
          </div>

          <div className="bg-surface p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted">Low Stock</p>
              <div className="p-2 bg-red-500/20 rounded-md">
                <AlertTriangle className="w-4 h-4 text-red-400" />
              </div>
            </div>
            <h2 className="text-3xl font-bold">{adminStats.lowStock}</h2>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold mb-6">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href={`/${locale}/admin/products`}
              className="bg-surface p-6 rounded-lg border border-border hover:border-gold transition-colors group"
            >
              <Package className="w-8 h-8 mb-3 text-gold" />
              <h3 className="text-lg font-semibold mb-1">Manage Products</h3>
              <p className="text-sm text-muted">Add, edit, or remove products from your catalog</p>
            </Link>

            <Link
              href={`/${locale}/admin/orders`}
              className="bg-surface p-6 rounded-lg border border-border hover:border-gold transition-colors group"
            >
              <ShoppingCart className="w-8 h-8 mb-3 text-gold" />
              <h3 className="text-lg font-semibold mb-1">View Orders</h3>
              <p className="text-sm text-muted">Track and manage customer orders</p>
            </Link>

            <Link
              href={`/${locale}/admin/customers`}
              className="bg-surface p-6 rounded-lg border border-border hover:border-gold transition-colors group"
            >
              <Users className="w-8 h-8 mb-3 text-gold" />
              <h3 className="text-lg font-semibold mb-1">Customer Management</h3>
              <p className="text-sm text-muted">View and manage customer accounts</p>
            </Link>
          </div>
        </div>

        {/* Info Sections */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="text-xl font-serif font-semibold mb-4">Recent Orders</h3>
            <div className="space-y-2 text-sm">
              <p className="text-muted">#PLX-1042 - $325.00 - Pending</p>
              <p className="text-muted">#PLX-1041 - $285.00 - Processing</p>
              <p className="text-muted">#PLX-1039 - $445.00 - Shipped</p>
            </div>
          </div>

          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="text-xl font-serif font-semibold mb-4">Best Sellers</h3>
            <div className="space-y-2 text-sm">
              <p className="text-muted">Baccarat Rouge 540 - 24 sales</p>
              <p className="text-muted">Oud Wood - 18 sales</p>
              <p className="text-muted">Aventus - 15 sales</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
