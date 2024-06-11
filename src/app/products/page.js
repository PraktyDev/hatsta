import ProductCard from "@/components/ProductCard";
import { FaCartShopping } from "react-icons/fa6";

const Productspage = () => {
  return (
    <section className="flex flex-col items-center py-12 gap-10">
        <h1 className="uppercase text-center flex items-center gap-3"><FaCartShopping /> SHOP FORM OUR VARIETY <FaCartShopping /></h1>
        <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4 place-items-center">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    </section>
  )
}

export default Productspage