import Image from "next/image"
import { CardDescription, CardTitle } from "./ui/card"
import { Separator } from "./ui/separator"
import Link from "next/link";

const ProductCard = (props) => {
  return (
    <div>
        <Link href={`/products/${props.id}`} className="p-4 flex gap-7 w-[500px]">
            <Image className="w-32 h-32 bg-[#f7f8f8] rounded-2xl" src={props.image} height={100} width={100} alt={props.title} />
            <div className="flex flex-col gap-2">
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>{props.description}</CardDescription>
                <CardDescription className="font-bold text-lg">{props.amount}</CardDescription>
            </div>
        </Link>
        <Separator />
    </div>
  )
}

export default ProductCard