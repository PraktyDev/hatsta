import { Card } from "./ui/card"
import OfferCard from "./OfferCard"

const Hero3 = () => {
  return (
    <section className="flex flex-col items-center gap-10">
        <h2 className="uppercase text-center">our offers</h2>
        <Card className="p-5 flex flex-col laptop:flex-row gap-4">
            <OfferCard />
            <OfferCard />
            <OfferCard />
        </Card>
    </section>
  )
}

export default Hero3