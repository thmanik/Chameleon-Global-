import CategorySlider from "@/components/home/CategorySlider";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import WholesaleSection from "@/components/home/WholesaleSection";
import VirtualTour from "@/components/virtual-tour/VirtualTour";




export const metadata = {
  title: "Home | Chameleon Global",
  description: "Discover premium apparel and accessories. Shop our latest collection of Hoodies, T-shirts, and Jackets.",
};

export default function Home() {
  return (
    <div className="flex flex-col gap-3 md:gap-8 ">
      <Hero />
      <CategorySlider/>
       <VirtualTour/>
      <FeaturedProducts/>
      <WholesaleSection/>
      <TrustBar/>
    </div>
  );
}