"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

const TrackingForm = ({ onTrack, loading }) => {
  const [orderId, setOrderId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onTrack(orderId);
  };

  return (
    <div className="bg-white p-8 md:p-12 border border-gray-200 shadow-lg rounded-lg max-w-md mx-auto transform transition-all hover:shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-secondary">
            Enter Order Number
          </label>
          <input
            required
            type="text"
            placeholder="EX: #CHM-2026-001"
            className="w-full bg-gray-50 border border-gray-200 px-5 py-3 text-sm font-medium outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] rounded-md transition-all"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
        </div>
        <button
          disabled={loading}
          className="w-full bg-secondary cursor-pointer text-white py-3 text-sm font-bold tracking-wide hover:bg-[var(--color-primary)] transition-all duration-300 flex items-center justify-center gap-2 rounded-md"
        >
          {loading ? "Tracking..." : "TRACK NOW"} <Search size={16} />
        </button>
      </form>
    </div>
  );
};

export default TrackingForm;