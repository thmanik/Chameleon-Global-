"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState({
    code: "USD",
    symbol: "$",
    rate: 1,
  });

  const updateCurrency = (code) => {
    const symbol = code === "BDT" ? "৳" : "$";
    const rate = code === "BDT" ? 120 : 1;
    setCurrency({ code, symbol, rate });
    localStorage.setItem("user-currency", code);
  };

  const formatPrice = (amount) => {
    if (!amount) return "0";
    const convertedAmount = amount * currency.rate;
    return `${currency.symbol}${convertedAmount.toLocaleString()}`;
  };

  useEffect(() => {
    const savedCurrency = localStorage.getItem("user-currency");
    if (savedCurrency) {
      updateCurrency(savedCurrency);
    }
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: updateCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);