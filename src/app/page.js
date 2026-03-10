import CategorySlider from "@/components/home/CategorySlider";
import Hero from "@/components/home/Hero";

export const metadata = {
  title: "Home | Chameleon Global",
  description: "Discover premium apparel and accessories. Shop our latest collection of Hoodies, T-shirts, and Jackets.",
};

export default function Home() {
  return (
    <div className="flex flex-col gap-3 md:gap-16 ">
      <Hero />
      {/* <CategoryShowcase/> */}
      <CategorySlider/>
    </div>
  );
}