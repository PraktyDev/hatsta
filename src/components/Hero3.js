import { Card } from "./ui/card"
import OfferCard from "./OfferCard"
import { FcShipped } from "react-icons/fc";
import { FcMoneyTransfer } from "react-icons/fc";
import { GiStarFormation } from "react-icons/gi";

const Hero3 = () => {
  return (
    <section className="flex flex-col items-center gap-10">
        <h1 className="uppercase text-center">our offers</h1>
        <Card className="p-5 flex flex-col laptop:flex-row gap-4">
            <OfferCard title="Best Quality" description="Crafted from high-quality materials, our bucket hats are designed to provide both style and sun protection." icon={<GiStarFormation size={25} color="red"/>} />
            <OfferCard title="Money-Back Guarantee" description="We're so confident in the quality of our bucket hats that we offer a 30-day money-back guarantee." icon={<FcMoneyTransfer size={25} />} />
            <OfferCard title="Free Shipping" description="Enjoy free shipping on all Hatsta bucket hat orders nation wild - no minimum purchase required." icon={<FcShipped size={25} />} />
        </Card>
    </section>
  )
}

export default Hero3