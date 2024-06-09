import ProductCard from "@/components/ProductCard";
import OfferCard from "@/components/OfferCard";
import Hero1 from "@/components/Hero1";
import Hero2 from "@/components/Hero2";
import Hero3 from "@/components/Hero3";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        HATSTA
        <ProductCard />
        <OfferCard />
        <Hero2 />
        <Hero3 />
        <Hero1 />
    </main>
  );
}
