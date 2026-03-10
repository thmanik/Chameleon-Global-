import ShopClient from "@/components/shop/ShopClient";

export const metadata = {
  title: "Shop | Chameleon Global",
  description: "Browse our latest collection of premium apparel.",
};

export default function ShopPage({ searchParams }) {
  const category = searchParams?.category || "all";

  return (
    <main className="max-w-[1600px] mx-auto px-6 py-12">
      <ShopClient initialCategory={category} />
    </main>
  );
}