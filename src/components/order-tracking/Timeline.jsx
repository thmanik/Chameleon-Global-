
import React from "react";
import { Check, Clock } from "lucide-react";

const Timeline = ({ statuses }) => {
  return (
    <div className="relative space-y-0">
    
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gray-100" />

      {statuses.slice().reverse().map((step, index) => {
        const isLeft = index % 2 === 0;
        return (
          <div key={index} className={`relative flex items-center mb-10 ${isLeft ? "flex-row-reverse" : "flex-row"}`}>
        
            <div className="w-1/2 px-4 md:px-8">
              <div className={`p-4 bg-white border border-gray-100 shadow-sm relative ${
                step.done ? (isLeft ? "border-r-4 border-r-primary" : "border-l-4 border-l-primary") : ""
              }`}>
                <h4 className={`text-[11px] font-black uppercase tracking-tight ${step.done ? "text-secondary" : "text-gray-300"}`}>
                  {step.label}
                </h4>
                <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">{step.date}</p>
              </div>
            </div>

          
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center z-10 shadow-sm ${
              step.done ? "bg-primary text-white" : "bg-gray-100 text-gray-300"
            }`}>
              {step.done ? <Check size={14} strokeWidth={3} /> : <Clock size={14} />}
            </div>

            <div className="w-1/2" />
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;