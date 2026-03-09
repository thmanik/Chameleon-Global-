"use client";
import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input 
        type="email" 
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address" 
        className="w-full bg-secondary/5 border-none px-6 py-4 rounded-full text-sm focus:ring-1 focus:ring-primary transition-all outline-none"
      />
      <button 
        type="submit"
        className="absolute right-2 top-2 bottom-2 bg-secondary text-white px-6 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-all active:scale-95"
      >
        Join
      </button>
    </form>
  );
};

export default Newsletter;