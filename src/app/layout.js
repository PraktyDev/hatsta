import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Zylumine",
  description: "Shop for Amazing Clothes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Toaster />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
