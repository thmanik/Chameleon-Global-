import ProductPageContent from "@/components/product-details/ProductPageContent";
import React from "react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const title = slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  
  return {
    title: `${title} | Chameleon Global`,
    description: `Explore the high-quality ${title} at Chameleon Global.`,
  };
}

const ProductPage = async ({ params }) => {
  const { slug } = await params;

  return (
    <main className="container mx-auto px-4 lg:px-20 py-12 md:py-20 animate-in fade-in duration-700">
      <ProductPageContent slug={slug} />
    </main>
  );
};

export default ProductPage;