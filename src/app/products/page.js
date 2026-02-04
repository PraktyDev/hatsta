"use client"
import ProductCard from "@/components/ProductCard";
import { FaCartShopping } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";


const Productspage = () => {
  const [product, setProduct] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, { cache: "no-store"});
        if(!response.ok){
            throw new Error("Unable to fetch data")
        }
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.log(error)
        setError("Failed to load products. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchProduct()
  }, [])

  if (error) {
    return (
        <section className="flex flex-col items-center justify-center gap-10 py-12 min-h-screen">
      <div className="text-center">
        <span className="text-[#cca666] text-sm laptop:text-base font-medium tracking-wider uppercase mb-2 block">
          Shop From Our Variety
        </span>
        <h2 className="text-2xl laptop:text-4xl font-bold gradient-text mb-4 uppercase">
          Our Products
        </h2>
      </div>
            <h3 className="uppercase text-center text-red-500 font-bold">{error}</h3>
        </section>
    )
  }

  return (
    <section className="flex flex-col items-center py-12 gap-10 min-h-screen tablet:max-w-3xl laptop:max-w-5xl mx-auto">
      <div className="text-center">
        <span className="text-[#cca666] text-sm laptop:text-base font-medium tracking-wider uppercase mb-2 block">
          Shop From Our Variety
        </span>
        <h2 className="text-2xl laptop:text-4xl font-bold gradient-text mb-4 uppercase">
          Our Products
        </h2>
      </div>
        <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4 place-items-center w-full -mt-7 laptop:mt-0">
        {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex gap-5 w-full relative rounded-md p-2 shadow-md shadow-[#cca666]/10"
              >
                <Skeleton className="absolute top-4 right-4 h-10 w-10 rounded-full" />
                <Skeleton className="w-32 h-32 rounded-2xl" />
                <div className="flex flex-col justify-center gap-2 flex-1">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-6 w-24 mt-1" />
                </div>
              </div>
            ))
        ) : (
            product.map(item =>(
            <ProductCard key={item._id} id={item._id} title={item.title} description={item.description} image={item.image} amount={item.amount} />
            ))
        )}
        </div>
    </section>
  )
}

export default Productspage