import Image from "next/image"
import { CardDescription, CardTitle } from "./ui/card"
import { Separator } from "./ui/separator"

const ProductCard = () => {
  return (
    <div>
        <div className="p-4 flex gap-7 w-[500px]">
            <Image className="w-32 h-32 bg-[#f7f8f8] rounded-2xl" src={""} height={100} width={100} alt="product image" />
            <div className="flex flex-col gap-2">
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardDescription className="font-bold text-lg">$4000</CardDescription>
            </div>
        </div>
        <Separator />
    </div>
  )
}

export default ProductCard