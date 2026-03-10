import { Truck, ShieldCheck, RefreshCcw, Globe } from "lucide-react";

const TrustBar = () => {
  const features = [
    {
      icon: <Truck size={32} strokeWidth={1.2} />,
      title: "Global Logistics",
      desc: "Worldwide express delivery",
    },
    {
      icon: <ShieldCheck size={32} strokeWidth={1.2} />,
      title: "Secure Payment",
      desc: "100% encrypted transactions",
    },
    {
      icon: <RefreshCcw size={32} strokeWidth={1.2} />,
      title: "Quality Control",
      desc: "Certified premium garments",
    },
    {
      icon: <Globe size={32} strokeWidth={1.2} />,
      title: "Wholesale Hub",
      desc: "Bulk supply for global brands",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-white border-y border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {features.map((item, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-4 text-[var(--color-secondary)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                {item.icon}
              </div>

              <h4 className="text-sm md:text-base font-semibold text-[var(--color-secondary)] mb-1">
                {item.title}
              </h4>

              <p className="text-[11px] md:text-sm text-gray-500 leading-snug max-w-[180px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;