import Image from 'next/image';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GoShieldCheck } from "react-icons/go";
import { BsBoxSeam } from "react-icons/bs";
import ProductCard from "@/components/ProductCard"

const fetchProduct =async() =>{
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, { cache: "no-store"});
  if(!response.ok){
    throw new Error("Unable to fetch data")
  }
  return response.json()
}

const ProductIdpage = async ({ params }) => {
  const { productId } = params;

  const fetchProductId = async () =>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.productId}`, { cache: "no-store"});
    if(!response.ok){
      throw new Error("Unable to fetch data")
    }
    return response.json()
  }

  const productPromise = fetchProductId();
  const moreproductPromise = fetchProduct();
  const [product, moreproduct] = await Promise.all([ productPromise, moreproductPromise])


  return (
    <>
    <section className="flex flex-col tablet:flex-row gap-6 px-4">
      <Image className="h-[300px] tablet:h-[400px] laptop:h-[450px] w-full tablet:w-3/4 bg-[#f7f8f8] rounded-2xl object-cover p-2" src={product.image} alt={product.title} height={500} width={500} />

      <div className="flex flex-col gap-4">
        <h1 className='font-semibold text-xl'>{product.title}</h1>
        <p>{product.amount}</p>
        <p>{product.description}</p>

        <div className="flex flex-col gap-1">
          <p>Size</p>
          <ToggleGroup className='flex justify-between w-full' variant="outline" type="single" size={"lg"}>
            <ToggleGroupItem className='flex-1' value="small" aria-label="Toggle small">
              <p className="h-4 w-4">S</p>
            </ToggleGroupItem>
            <ToggleGroupItem className='flex-1' value="medium" aria-label="Toggle medium">
              <p className="h-4 w-4">M</p>
            </ToggleGroupItem>
            <ToggleGroupItem className='flex-1' value="large" aria-label="Toggle large">
              <p className="h-4 w-4">L</p>
            </ToggleGroupItem>
            <ToggleGroupItem className='flex-1' value="extralarge" aria-label="Toggle extralarge">
              <p className="h-4 w-4">XL</p>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <Button className="rounded-none my-3">Add to Cart</Button>

        <div className="flex flex-col gap-4">
          <p className="flex items-center gap-3"><LiaShippingFastSolid />Free Expedited Shipping</p>
          <p className="flex items-center gap-3"><GoShieldCheck />2 Year Warranty</p>
          <p className="flex items-center gap-3"><BsBoxSeam />14 Day Returns</p>
        </div>

        <Accordion className='mt-5' type="single" collapsible>
          <AccordionItem  className="py-2" value="item-1">
            <AccordionTrigger>Size Guide</AccordionTrigger>
            <AccordionContent>
              <div className='bg-slate-50 p-5 flex flex-col gap-3'>
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
              <div className='bg-slate-50 p-5 flex flex-col gap-7'>
                <div>
                  <p>Shipping Policy:</p>
                  <li>We offer free shipping on all orders within Nigeria.</li>
                  <li>Orders are typically processed within 1-3 business days.</li>
                  <li>Shipping times vary depending on the delivery location.</li>
                  <li>Shipping times may be longer during peak periods.</li>
                </div>

                <div>
                  <p>Return Policy:</p>
                  <li>You can return your order within 14 days for a full refund or exchange.</li>
                  <li>The item must be unused and in its original condition with all tags and packaging intact.</li>
                  <li>Custom orders are non-refundable unless they are defective or damaged.</li>
                </div>

                <p className='mb-4'>If you have any questions, please feel free to contact us.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>

    <section className="flex flex-col items-center gap-10 my-12">
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