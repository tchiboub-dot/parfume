"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

interface Brand {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    oldPrice: "",
    stock: "",
    family: "",
    concentration: "Eau de Parfum",
    audience: "Unisex",
    brand: "",
    category: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all products to get brands/categories and find current product
        const res = await fetch("/api/admin/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        
        const products = await res.json();
        
        // Find current product
        const product = products.find((p: any) => p.id === productId);
        if (!product) throw new Error("Product not found");

        // Set form data
        setFormData({
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price.toString(),
          oldPrice: product.oldPrice?.toString() || "",
          stock: product.stock.toString(),
          family: product.family,
          concentration: product.concentration,
          audience: product.audience,
          brand: product.brand.name,
          category: product.category.name,
        });

        // Extract unique brands and categories
        const uniqueBrands = Array.from(
          new Set(products.map((p: any) => JSON.stringify(p.brand)))
        ).map((b) => JSON.parse(b as string));
        
        const uniqueCategories = Array.from(
          new Set(products.map((p: any) => JSON.stringify(p.category)))
        ).map((c) => JSON.parse(c as string));

        setBrands(uniqueBrands);
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [productId]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        price: parseFloat(formData.price),
        oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
        stock: parseInt(formData.stock),
        family: formData.family,
        concentration: formData.concentration,
        audience: formData.audience,
        brand: formData.brand,
        category: formData.category,
      };

      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent"></div>
            <p className="mt-4 text-muted">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !formData.name) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-red-500">
            <p>Error: {error}</p>
            <Link
              href="/admin/products"
              className="inline-block mt-4 px-6 py-3 bg-gold text-dark font-medium rounded-md hover:bg-gold/90 transition-colors"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/products"
            className="p-2 hover:bg-surface rounded-md transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-serif font-bold">Edit Product</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-md text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-surface rounded-lg p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleNameChange}
                required
                className="w-full px-4 py-3 bg-bg border border-border rounded-md focus:outline-none focus:border-gold transition-colors"
                placeholder="e.g., Baccarat Rouge 540"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium mb-2">
                URL Slug *
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-bg border border-border rounded-md focus:outline-none focus:border-gold transition-colors"
                placeholder="e.g., baccarat-rouge-540"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-bg border border-border rounded-md focus:outline-none focus:border-gold transition-colors resize-none"
              placeholder="Product description..."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 bg-bg border border-border rounded-md focus:outline-none focus:border-gold transition-colors"
                placeholder="0.00"
              />
            </div>

            <div>
              <label htmlFor="oldPrice" className="block text-sm font-medium mb-2">
                Old Price ($)
              </label>
              <input
                type="number"
                id="oldPrice"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-3 bg-bg border border-border rounded-md focus:outline-none focus:border-gold transition-colors"
                placeholder="0.00"
              />
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium mb-2">
                Stock *
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 bg-bg border border-border rounded-md focus:outline-none focus:border-gold transition-colors"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="brand" className="block text-sm font-medium mb-2">
                Brand Name *
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                list="brand-suggestions"
                className="w-full px-4 py-3 bg-bg border border-border rounded-md focus:outline-none focus:border-gold transition-colors"
                placeholder="e.g., Maison Francis Kurkdjian"
              />
              <datalist id="brand-suggestions">
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.name} />
                ))}
              </datalist>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">
                Category *
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                list="category-suggestions"
                className="w-full px-4 py-3 bg-bg border border-border rounded-md focus:outline-none focus:border-gold transition-colors"
                placeholder="e.g., Eau de Parfum"
              />
              <datalist id="category-suggestions">
                {categories.map((category) => (
                  <option key={category.id} value={category.name} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="family" className="block text-sm font-medium mb-2">
                Fragrance Family *
              </label>
              <input
                type="text"
                id="family"
                name="family"
                value={formData.family}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-bg border border-border rounded-md focus:outline-none focus:border-gold transition-colors"
                placeholder="e.g., Floral Amber"
              />
            </div>

            <div>
              <label htmlFor="concentration" className="block text-sm font-medium mb-2">
                Concentration *
              </label>
              <select
                id="concentration"
                name="concentration"
                value={formData.concentration}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-bg border border-border rounded-md focus:outline-none focus:border-gold transition-colors"
              >
                <option value="Eau de Parfum">Eau de Parfum</option>
                <option value="Eau de Toilette">Eau de Toilette</option>
                <option value="Parfum">Parfum</option>
                <option value="Eau de Cologne">Eau de Cologne</option>
              </select>
            </div>

            <div>
              <label htmlFor="audience" className="block text-sm font-medium mb-2">
                Audience *
              </label>
              <select
                id="audience"
                name="audience"
                value={formData.audience}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-bg border border-border rounded-md focus:outline-none focus:border-gold transition-colors"
              >
                <option value="Unisex">Unisex</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-gold text-dark font-medium rounded-md hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-solid border-dark border-r-transparent"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
            <Link
              href="/admin/products"
              className="px-8 py-3 border border-border rounded-md hover:bg-surface transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
