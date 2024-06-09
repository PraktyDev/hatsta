import Image from "next/image"
import { CardDescription, CardTitle } from "./ui/card"

const offerCard = () => {
  return (
    <div className="p-4 flex flex-col gap-5 w-[450px] tablet:w-[600px] laptop:w-1/3">
        <div className="flex gap-5 items-center">
            <Image className="w-12 h-12 bg-[#f7f8f8] rounded-full p-2" src={""} height={100} width={100} alt="offer image" />
            <CardTitle>Card Title</CardTitle>
        </div>   
        <CardDescription>Card Description</CardDescription>
    </div>
  )
}

export default offerCard