"use client"
import React from "react";

import { ArrowLeft, MapPin, Package, ExternalLink } from "lucide-react";
import Timeline from "./Timeline";

const TrackingResult = ({ data, onReset }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      <div className="bg-secondary text-white p-8 md:p-12 mb-8 relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">ID: {data.id}</p>
            <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter leading-none">{data.status}</h2>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 px-8 border border-white/10 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Estimated Delivery</p>
            <p className="text-xl font-black text-primary">{data.estimatedDelivery}</p>
          </div>
        </div>
        <Package className="absolute -right-10 -bottom-10 w-48 h-48 text-white/5 rotate-12" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white p-6 border border-gray-100 shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
              <MapPin size={12} /> Delivery Address
            </h4>
            <p className="text-sm font-black uppercase text-secondary">{data.shipping.fullName}</p>
            <p className="text-[11px] font-bold text-gray-400 uppercase leading-relaxed mt-2">{data.shipping.fullAddress}</p>
            <p className="text-[11px] font-black text-secondary mt-3 italic">{data.shipping.phoneNumber}</p>
          </div>
          
          <div className="p-6 bg-primary/5 border border-primary/10">
            <p className="text-[10px] font-bold uppercase leading-relaxed text-secondary italic">
              "Your parcel is in transit. You will see a Live Track button once it is handed over to our courier partner."
            </p>
          </div>
        </div>

        <div className="md:col-span-8">
          <Timeline statuses={data.steps} />
        </div>
      </div>

      <button 
        onClick={onReset}
        className="mt-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-all mx-auto"
      >
        <ArrowLeft size={14} /> Track Another Shipment
      </button>
    </div>
  );
};

export default TrackingResult;