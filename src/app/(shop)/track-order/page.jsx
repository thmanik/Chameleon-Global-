"use client";

import TrackingForm from "@/components/order-tracking/TrackingForm";
import TrackingResult from "@/components/order-tracking/TrackingResult";
import React, { useState } from "react";


const OrderTracking = () => {
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (orderId) => {
    setLoading(true);
    setTimeout(() => {
      setTrackingData({
        id: orderId,
        status: "In Transit",
        estimatedDelivery: "15 March, 2026",
        shipping: {
          fullName: "Tanvir Ahmed",
          fullAddress: "House 12, Road 5, Dhanmondi, Dhaka",
          phoneNumber: "+880 17XX-XXXXXX"
        },
        steps: [
          { label: "Pending Payment", date: "08 March", done: true },
          { label: "Confirmed", date: "09 March", done: true },
          { label: "Processing", date: "10 March", done: true },
          { label: "Packed", date: "11 March", done: true },
          { label: "Shipped", date: "12 March", done: true },
          { label: "Delivered", date: "13 March", done: true },
          { label: "Returned", date: "Pending", done: false },
          { label: "Refunded", date: "Expected 28 March", done: false },
        ],
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className=" bg-gray-50/50 py-2 md:py-8 px-6">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-xl md:text-3xl font-black uppercase  tracking-tighter text-secondary leading-[0.85]">
            Track Your <span className="text-primary">Order</span>
          </h1>
        </div>

        {!trackingData ? (
          <TrackingForm onTrack={handleTrack} loading={loading} />
        ) : (
          <TrackingResult data={trackingData} onReset={() => setTrackingData(null)} />
        )}
      </div>
    </div>
  );
};

export default OrderTracking;