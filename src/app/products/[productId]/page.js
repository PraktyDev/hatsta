import Image from 'next/image'
import Hero2 from "@/components/Hero2";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"


const ProductIdpage = async ({ params }) => {
  const { productId } = params;

  const fetchProductId = async () =>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.productId}`, { cache: "no-store"});
    if(!response.ok){
      throw new Error("Unable to fetch data")
    }
    return response.json()
  }
  const product = await fetchProductId();

  
  return (
    <>
    <section className="flex flex-col laptop:flex-row gap-6">
      <Image className="h-[500px] w-[500px] laptop:w-1/2 rounded-md bg-stone-500" src={product.image} alt={product.title} height={100} width={100} />

      <div className="flex flex-col gap-2">
        <h1>{product.title}</h1>
        <p>{product.amount}</p>
        <p>{product.description}</p>

        <div className="flex flex-col">
          <p>Size</p>
          <ToggleGroup variant="outline" type="multiple">
            <ToggleGroupItem value="small" aria-label="Toggle small">
              <p className="h-4 w-4">S</p>
            </ToggleGroupItem>
            <ToggleGroupItem value="medium" aria-label="Toggle medium">
              <p className="h-4 w-4">M</p>
            </ToggleGroupItem>
            <ToggleGroupItem value="large" aria-label="Toggle large">
              <p className="h-4 w-4">L</p>
            </ToggleGroupItem>
            <ToggleGroupItem value="extralarge" aria-label="Toggle extralarge">
              <p className="h-4 w-4">XL</p>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="flex flex-col">
          <p className="flex items-center gap-3">Free Expedited Shipping</p>
          <p className="flex items-center gap-3">2 Year Warranty</p>
          <p className="flex items-center gap-3">14 Day Returns</p>
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Size Guide</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Shipping & Return Policy</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>

    <Hero2 />
    </>
  )
}

export default ProductIdpage