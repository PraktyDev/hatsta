import ProductCard from "@/components/ProductCard";
import { FaCartShopping } from "react-icons/fa6";


const fetchProduct = async () =>{
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, { cache: "no-store"});
  if(!response.ok){
    throw new Error("Unable to fetch data")
  }
  return response.json()
}

const Productspage = async () => {
  const product = await fetchProduct();
  return (
    <section className="flex flex-col items-center py-12 gap-10">
        <h1 className="uppercase text-center flex items-center gap-3"><FaCartShopping /> SHOP FORM OUR VARIETY <FaCartShopping /></h1>
        <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4 place-items-center">
        {product.map(item =>(
          <ProductCard key={item._id} id={item._id} title={item.title} description={item.description} image={item.image} amount={item.amount} />
        ))}
        </div>
    </section>
  )
}

export default Productspage