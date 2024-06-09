import Link from "next/link"
import ProductCard from "./ProductCard"
import { Button } from "./ui/button"


const Hero2 = () => {
  return (
    <section className="flex flex-col items-center gap-10">
        <h2 className="uppercase text-center">our latest collections</h2>
        <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4 place-items-center">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
        <Button asChild>
            <Link href={"/products"}>See All</Link>
        </Button>
    </section>
  )
}

export default Hero2