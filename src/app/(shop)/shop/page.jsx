import ShopClient from "@/components/shop/ShopClient";

export const metadata = {
  title: "Shop | Chameleon Global",
  description: "Browse our latest collection of premium apparel.",
};

export default function ShopPage({ searchParams }) {
  const category = searchParams?.category || "all";

  return (
    <main className="w-full mx-auto px-2 py-12">
      <ShopClient initialCategory={category} />
    </main>
  );
}