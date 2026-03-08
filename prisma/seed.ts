import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create Admin User
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@parfumeluxe.com" },
    update: {},
    create: {
      email: "admin@parfumeluxe.com",
      fullName: "Admin User",
      passwordHash: adminPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // Create Brands
  const brands = await Promise.all([
    prisma.brand.upsert({
      where: { name: "Maison Francis Kurkdjian" },
      update: {},
      create: { name: "Maison Francis Kurkdjian" },
    }),
    prisma.brand.upsert({
      where: { name: "Tom Ford" },
      update: {},
      create: { name: "Tom Ford" },
    }),
    prisma.brand.upsert({
      where: { name: "Creed" },
      update: {},
      create: { name: "Creed" },
    }),
    prisma.brand.upsert({
      where: { name: "Byredo" },
      update: {},
      create: { name: "Byredo" },
    }),
    prisma.brand.upsert({
      where: { name: "Le Labo" },
      update: {},
      create: { name: "Le Labo" },
    }),
  ]);
  console.log("✅ Brands created:", brands.length);

  // Create Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { id: "cat-1" },
      update: {},
      create: { id: "cat-1", name: "Eau de Parfum" },
    }),
    prisma.category.upsert({
      where: { id: "cat-2" },
      update: {},
      create: { id: "cat-2", name: "Eau de Toilette" },
    }),
    prisma.category.upsert({
      where: { id: "cat-3" },
      update: {},
      create: { id: "cat-3", name: "Parfum" },
    }),
  ]);
  console.log("✅ Categories created:", categories.length);

  // Create Sample Perfumes
  const perfumes = [
    {
      slug: "baccarat-rouge-540",
      name: "Baccarat Rouge 540",
      description:
        "A luminous and sophisticated fragrance that celebrates the art of French perfumery with notes of jasmine, saffron, cedarwood, and ambergris.",
      price: 325.0,
      stock: 15,
      family: "Floral Amber",
      concentration: "Eau de Parfum",
      audience: "Unisex",
      brandId: brands[0].id,
      categoryId: categories[0].id,
    },
    {
      slug: "oud-wood",
      name: "Oud Wood",
      description:
        "An iconic fragrance featuring rare oud wood, exotic spices, and sensual woods. Smoky and rich, it creates an unforgettable olfactory experience.",
      price: 285.0,
      oldPrice: 320.0,
      stock: 8,
      family: "Oriental Woody",
      concentration: "Eau de Parfum",
      audience: "Unisex",
      brandId: brands[1].id,
      categoryId: categories[0].id,
    },
    {
      slug: "aventus",
      name: "Aventus",
      description:
        "A bold and audacious fragrance celebrating strength, vision and success. Notes of blackcurrant, Italian bergamot, French apples and royal pineapple.",
      price: 445.0,
      stock: 12,
      family: "Fruity Chypre",
      concentration: "Eau de Parfum",
      audience: "Men",
      brandId: brands[2].id,
      categoryId: categories[0].id,
    },
    {
      slug: "gypsy-water",
      name: "Gypsy Water",
      description:
        "A dream of a colorful lifestyle made of countless encounters and endless wandering. Fresh and woody notes with a touch of citrus and vanilla.",
      price: 265.0,
      stock: 20,
      family: "Woody Aromatic",
      concentration: "Eau de Toilette",
      audience: "Unisex",
      brandId: brands[3].id,
      categoryId: categories[1].id,
    },
    {
      slug: "santal-33",
      name: "Santal 33",
      description:
        "An addictively creamy, warm scent releasing a distinguished, raw, musky finish. Sandalwood is the main ingredient, complemented by iris, violet and cardamom.",
      price: 290.0,
      stock: 18,
      family: "Woody Spicy",
      concentration: "Eau de Parfum",
      audience: "Unisex",
      brandId: brands[4].id,
      categoryId: categories[0].id,
    },
    {
      slug: "tobacco-vanille",
      name: "Tobacco Vanille",
      description:
        "An opulent and warm fragrance that opens with tobacco leaf and aromatic spice notes. The heart brings a rich layer of vanilla absolute and tonka bean.",
      price: 295.0,
      stock: 10,
      family: "Oriental Spicy",
      concentration: "Eau de Parfum",
      audience: "Unisex",
      brandId: brands[1].id,
      categoryId: categories[0].id,
    },
    {
      slug: "aqua-universalis",
      name: "Aqua Universalis",
      description:
        "A dazzling freshness with citrus notes of Sicilian lemon and Italian bergamot. A true olfactory luxury representing clarity and radiance.",
      price: 315.0,
      oldPrice: 340.0,
      stock: 14,
      family: "Citrus Aromatic",
      concentration: "Eau de Toilette",
      audience: "Unisex",
      brandId: brands[0].id,
      categoryId: categories[1].id,
    },
    {
      slug: "silver-mountain-water",
      name: "Silver Mountain Water",
      description:
        "A contemporary classic capturing the purity of mountain streams with Swiss bergamot, green tea, and sandalwood. Fresh, clean and invigorating.",
      price: 395.0,
      stock: 9,
      family: "Aromatic Aquatic",
      concentration: "Eau de Parfum",
      audience: "Men",
      brandId: brands[2].id,
      categoryId: categories[0].id,
    },
  ];

  for (const perfume of perfumes) {
    await prisma.perfume.upsert({
      where: { slug: perfume.slug },
      update: {},
      create: perfume,
    });
  }
  console.log("✅ Perfumes created:", perfumes.length);

  // Create sample product images
  const createdPerfumes = await prisma.perfume.findMany();
  for (const perfume of createdPerfumes) {
    await prisma.productImage.create({
      data: {
        url: `/images/perfumes/${perfume.slug}.jpg`,
        perfumeId: perfume.id,
      },
    });
  }
  console.log("✅ Product images created");

  console.log("🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
