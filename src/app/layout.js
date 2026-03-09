import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { ProductProvider } from "@/context/ProductContext";
import Navbar from "@/components/common/navbar/Navbar";
import Footer from "@/components/common/footer/Footer";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chameleon Global | Apparel & Accessories",
  description: "Global B2B & B2C E-commerce Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true} 
      >
        <AuthProvider>
          <CurrencyProvider>
            <CartProvider>
            <ProductProvider> 
              <Navbar /> 
              <main className="container mx-auto px-4 py-2">
                {children}
              </main>
              <Footer/>
            </ProductProvider>
            </CartProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}