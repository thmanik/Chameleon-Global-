
import Link from "next/link";
import { Globe2, Briefcase, ArrowUpRight } from "lucide-react";

const WholesaleSection = () => {
  return (
    <section className="py-20 md:py-32 px-6 bg-secondary text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="space-y-8">
          <h2 className="text-3xl md:text-6xl font-[#333333] font-bold leading-[0.85] uppercase  tracking-tighter">
            Global 
            <span className="text-primary">Supply</span> <br />
            Chain
          </h2>

          <p className="text-gray-300 font-bold uppercase tracking-widest text-[10px] md:text-xs max-w-sm leading-relaxed">
            Empowering brands worldwide with premium manufacturing and seamless wholesale logistics.
          </p>

          <div className="flex gap-12 mt-10 border-t border-white/10 pt-8">
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-black  text-white">150+</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">Global Clients</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-black  text-white">24h</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">Fast Response</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-8 md:p-12 border border-white/10 rounded-sm backdrop-blur-sm relative">
          <h3 className="text-lg font-black uppercase italic tracking-tighter text-white border-b border-white/10 pb-4 mb-10">
            Wholesale Benefits
          </h3>

          <div className="space-y-10">
            <div className="flex gap-6 items-start group">
              <div className="w-12 h-12 bg-primary flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                <Briefcase size={22} className="text-white" />
              </div>
              <div>
                <h4 className="font-black uppercase tracking-widest text-white text-sm mb-2 group-hover:text-primary transition-colors">
                  Bulk Pricing
                </h4>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight leading-relaxed">
                  Unlock tiered pricing models designed for high-volume retail partners.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start group">
              <div className="w-12 h-12 bg-white/10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                <Globe2 size={22} className="text-white" />
              </div>
              <div>
                <h4 className="font-black uppercase tracking-widest text-white text-sm mb-2 group-hover:text-primary transition-colors">
                  Global Logistics
                </h4>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight leading-relaxed">
                  Seamless door-to-door delivery with full customs and duties management.
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/wholesale-inquiry"
            className="mt-12 w-full flex items-center justify-between bg-white text-secondary px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 hover:bg-primary hover:text-white group"
          >
            Start Wholesale Inquiry
            <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default WholesaleSection;