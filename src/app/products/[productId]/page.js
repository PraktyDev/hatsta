"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GoShieldCheck } from "react-icons/go";
import { BsBoxSeam } from "react-icons/bs";
import ProductCard from "@/components/ProductCard"
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductIdpage = ({ params }) => {
  const { productId } = params;
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [product, setProduct] = useState(null);
  const [moreproduct, setMoreproduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [productRes, moreProductRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
        ]);

        if (!productRes.ok || !moreProductRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const productData = await productRes.json();
        const moreProductData = await moreProductRes.json();

        setProduct(productData);
        setMoreproduct(moreProductData);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    addToCart({
      _id: product._id,
      title: product.title,
      description: product.description,
      image: product.image,
      amount: product.amount,
      size: selectedSize,
    });
    
    toast.success("Added to cart!");
    setSelectedSize("");
  };

  if (isLoading) {
    return (
      <>
      <section className="flex flex-col tablet:flex-row gap-6 px-4 my-10">
        
        {/* Image (dynamic) */}
        <Skeleton className="h-[300px] tablet:h-[400px] laptop:h-[450px] w-full tablet:w-1/2 rounded-2xl" />

        <div className="flex flex-col gap-4 w-full tablet:w-1/2">
          
          {/* Title (dynamic) */}
          <Skeleton className="h-7 w-3/4" />

          {/* Price (dynamic) */}
          <Skeleton className="h-5 w-28" />

          {/* Description (dynamic) */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>

          {/* Size (STATIC) */}
          <div className="flex flex-col gap-1">
            <p>Size</p>
            <ToggleGroup
              className="flex justify-between w-full"
              variant="outline"
              type="single"
              size="lg"
            >
              {["S", "M", "L", "XL"].map((size) => (
                <ToggleGroupItem
                  key={size}
                  className="flex-1"
                  value={size}
                  disabled
                >
                  {size}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Button (static layout) */}
          <Button className="rounded-none my-3" disabled>
            {/* <Skeleton className="h-5 w-28" /> */}
            Add to Cart
          </Button>

          {/* Shipping info (STATIC) */}
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-3">
              <LiaShippingFastSolid />
              Free Expedited Shipping
            </p>
            <p className="flex items-center gap-3">
              <BsBoxSeam />
              14 Day Returns
            </p>
          </div>

          {/* Accordion (STATIC HEADERS) */}
          <Accordion className="mt-5" type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Size Guide</AccordionTrigger>
              <AccordionContent>
                <Skeleton className="h-24 w-full rounded-md" />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Shipping & Return Policy</AccordionTrigger>
              <AccordionContent>
                <Skeleton className="h-32 w-full rounded-md" />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* PEOPLE ALSO LIKE */}
      <section className="flex flex-col items-center gap-10 my-12 laptop:container laptop:mx-auto w-full">
        <h1 className="uppercase text-center">People also like</h1>

        <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4 w-full">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="flex gap-5 w-full rounded-md p-2 shadow-md shadow-[#cca666]/10"
            >
              <Skeleton className="w-32 h-32 rounded-2xl" />
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-6 w-24 mt-1" />
              </div>
            </div>
          ))}
        </div>

        <Button disabled>
          {/* <Skeleton className="h-5 w-20" /> */}
          See More
        </Button>
      </section>
      </>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Product not found</p>
      </div>
    );
  }


  return (
    <>
    <section className="flex flex-col tablet:flex-row gap-6 px-4 my-10">
      <Image className="h-[300px] tablet:h-[400px] laptop:h-[450px] w-full tablet:w-1/2 bg-[#f7f8f8] rounded-2xl object-cover p-2" src={product.image} alt={product.title} height={500} width={500} />

      <div className="flex flex-col gap-4 w-full tablet:w-1/2">
        <h1 className='font-semibold text-xl'>{product.title}</h1>
        <p>₦{product.amount}</p>
        <p>{product.description}</p>

        <div className="flex flex-col gap-1">
          <p>Size</p>
          <ToggleGroup 
            className='flex justify-between w-full' 
            variant="outline" 
            type="single" 
            size={"lg"}
            value={selectedSize}
            onValueChange={setSelectedSize}
          >
            <ToggleGroupItem className='flex-1' value="S" aria-label="Toggle small">
              <p className="h-4 w-4">S</p>
            </ToggleGroupItem>
            <ToggleGroupItem className='flex-1' value="M" aria-label="Toggle medium">
              <p className="h-4 w-4">M</p>
            </ToggleGroupItem>
            <ToggleGroupItem className='flex-1' value="L" aria-label="Toggle large">
              <p className="h-4 w-4">L</p>
            </ToggleGroupItem>
            <ToggleGroupItem className='flex-1' value="XL" aria-label="Toggle extralarge">
              <p className="h-4 w-4">XL</p>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <Button className="rounded-none my-3" onClick={handleAddToCart}>Add to Cart</Button>

        <div className="flex flex-col gap-4">
          <p className="flex items-center gap-3"><LiaShippingFastSolid />Free Expedited Shipping</p>
          <p className="flex items-center gap-3"><BsBoxSeam />14 Day Returns</p>
        </div>

        <Accordion className='mt-5' type="single" collapsible>
          <AccordionItem  className="py-2" value="item-1">
            <AccordionTrigger>Size Guide</AccordionTrigger>
            <AccordionContent>
              <div className='bg-[#1a1f3d] text-sm text-[#efdfab] p-5 flex flex-col gap-3'>
                <p>Small(S): 21-22 inches</p>
                <p>Medium(M): 22-23 inches</p>
                <p>Large(L): 23-24 inches</p>
                <p>Extra-large(XL): 24-25 inches</p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="py-2" value="item-2">
            <AccordionTrigger>Shipping & Return Policy</AccordionTrigger>
            <AccordionContent>
              <div className='bg-[#1a1f3d] p-5 flex flex-col gap-7 text-sm text-[#efdfab]'>
                <div>
                  <p>Shipping Policy:</p>
                  <li className='list-inside'>We offer free shipping on all orders within Nigeria.</li>
                  <li className='list-inside'>Orders are typically processed within 1-3 business days.</li>
                  <li className='list-inside'>Shipping times vary depending on the delivery location.</li>
                  <li className='list-inside'>Shipping times may be longer during peak periods.</li>
                </div>

                <div>
                  <p>Return Policy:</p>
                  <li className='list-inside'>You can return your order within 14 days for a full refund or exchange.</li>
                  <li className='list-inside'>The item must be unused and in its original condition with all tags and packaging intact.</li>
                  <li className='list-inside'>Custom orders are non-refundable unless they are defective or damaged.</li>
                </div>

                <p className='mb-4'>If you have any questions, please feel free to contact us.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>

    <section className="flex flex-col items-center gap-10 my-12 laptop:container laptop:mx-auto w-full">
        <h1 className="uppercase text-center">People also like</h1>
        <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4 place-items-center w-full">
        {moreproduct.slice(0, 2).map(item =>(
          <ProductCard key={item._id} id={item._id} title={item.title} description={item.description} image={item.image} amount={item.amount} />
        ))}
        </div>
        <Button asChild>
            <Link href={"/products"}>See More</Link>
        </Button>
    </section>
    </>
  )
}

export default ProductIdpage