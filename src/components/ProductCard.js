// "use client"
// import Image from "next/image"
// import { CardDescription, CardTitle } from "./ui/card"
// import { Separator } from "./ui/separator"
// import Link from "next/link";
// import { Button } from "./ui/button";
// import { useCart } from "@/context/CartContext";
// import { toast } from "sonner";

// const ProductCard = (props) => {
//   const { addToCart } = useCart();

//   const handleAddToCart = (e) => {
//     e.preventDefault(); // Prevent navigation if clicked on button
//     addToCart({
//         _id: props.id,
//         title: props.title,
//         description: props.description,
//         image: props.image,
//         amount: props.amount
//     });
//     toast.success("Added to cart!");
//   }

//   return (
//     <div>
//         <Link href={`/products/${props.id}`} className="p-4 flex gap-7 w-[500px]">
//             <Image className="w-32 h-32 bg-[#f7f8f8] rounded-2xl" src={props.image} height={100} width={100} alt={props.title} />
//             <div className="flex flex-col gap-2 w-full">
//                 <CardTitle>{props.title}</CardTitle>
//                 <CardDescription>{props.description}</CardDescription>
//                 <div className="flex justify-between items-center w-full">
//                     <CardDescription className="font-bold text-lg">₦{props.amount}</CardDescription>
//                     <Button onClick={handleAddToCart} size="sm">Add to Cart</Button>
//                 </div>
//             </div>
//         </Link>
//         <Separator />
//     </div>
//   )
// }

// export default ProductCard

"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ProductCard = ({ id, title, description, image, amount }) => {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirmAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    addToCart({
      _id: id,
      title,
      description,
      image,
      amount,
      size: selectedSize,
    });
    toast.success("Added to cart!");
    setIsModalOpen(false);
    setSelectedSize(""); 
  };

  return (
    <>
      <Link
        href={`/products/${id}`}
        className="flex gap-5 w-full relative rounded-md shadow-md shadow-[#cca666]/10 hover:shadow-lg hover:shadow-[#cca666]/10 p-2 transition-all duration-700"
      >
        <button
          onClick={handleAddToCartClick}
          className="absolute top-4 right-4 h-10 w-10 rounded-full bg-[#0C0f25]/80 backdrop-blur-sm border border-[#2a2f4d] flex items-center justify-center text-[#efdfab] transition-all hover:bg-[#cca666] hover:text-[#0C0f25] z-10"
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
        {/* Card */}
        <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-[#1a1f3d] border border-[#2a2f4d] transition-all duration-500 group-hover:border-[#cca666]/30 group-hover:shadow-xl group-hover:shadow-[#cca666]/10">
          <Image
            src={image}
            alt={title}
            fill
            className="bg-[#f7f8f8] rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Info */}
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold text-[#efdfab] group-hover:text-[#cca666] transition-colors">
            {title}
          </h3>

          <p className="text-sm text-[#efdfab]/70 line-clamp-2">{description}</p>

          <span className="text-lg font-bold text-[#efdfab]">₦{amount}</span>
        </div>
      </Link>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md tablet:max-w-lg bg-[#0C0f25] text-[#efdfab] z-[200]">
          <DialogHeader>
            <DialogTitle>Select Size</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2 items-center">
              <p className="text-sm font-medium">Size</p>
              <ToggleGroup
                type="single"
                value={selectedSize}
                onValueChange={setSelectedSize}
                className="justify-start gap-4"
              >
                {["S", "M", "L", "XL"].map((size) => (
                  <ToggleGroupItem
                    key={size}
                    value={size}
                    className="h-10 w-10 rounded-md border border-input data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                  >
                    {size}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            
             <div className='bg-[#1a1f3d] py-6 px-4 rounded-md text-sm text-[#efdfab]'>
                <p className="font-semibold mb-2">Size Guide:</p>
                <div className="grid grid-cols-2 gap-2">
                    <p>Small(S): 21-22 inches</p>
                    <p>Medium(M): 22-23 inches</p>
                    <p>Large(L): 23-24 inches</p>
                    <p>Extra-large(XL): 24-25 inches</p>
                </div>
              </div>

            <Button onClick={handleConfirmAddToCart} className="w-full">
              Add to Cart
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
