import Link from "next/link"
import ProductCard from "./ProductCard"
import { Button } from "./ui/button"

const fetchProduct =async() =>{
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, { cache: "no-store"});
  if(!response.ok){
    throw new Error("Unable to fetch data")
  }
  return response.json()
}

const Hero2 = async () => {
  const product = await fetchProduct();
  return (
    <section className="flex flex-col items-center gap-10">
        <h1 className="uppercase text-center">our latest collections</h1>
        <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4 place-items-center">
        {product.slice(0, 4).map(item =>(
          <ProductCard key={item._id} id={item._id} title={item.title} description={item.description} image={item.image} amount={item.amount} />
        ))}
        </div>
        <Button asChild>
            <Link href={"/products"}>See All</Link>
        </Button>
    </section>
  )
}

export default Hero2