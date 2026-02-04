import { Truck, RefreshCw, Shield, Zap } from "lucide-react";

const Hero3 = () => {
  return (
    <section className="flex flex-col items-center gap-10 -mt-14 px-3">
      <div className="text-center">
        <span className="text-[#cca666] text-sm laptop:text-base font-medium tracking-wider uppercase mb-2 block">
          Specially Made for You
        </span>
        <h2 className="text-2xl laptop:text-4xl font-bold gradient-text mb-4 uppercase">
          our offers
        </h2>
        <p className="text-[#efdfab]/60 max-w-2xl mx-auto text-base laptop:text-xl">
          Explore our beautiful offers and find the perfect piece for you. We
          thought of you while making these offers.
        </p>
      </div>
      <div className="-z-10 relative py-6 bg-[#141833] border-y border-[#2a2f4d] rounded-md">
        <div className="w-full mx-auto px-4 laptop:px-10">
          <div className="grid grid-cols-2 laptop:grid-cols-4 gap-6">
            {[
              {
                icon: Truck,
                title: "Free Shipping",
                desc: "On orders over ₦35,000",
              },
              {
                icon: RefreshCw,
                title: "Easy Returns",
                desc: "30-day return policy",
              },
              { icon: Shield, title: "Secure Payment", desc: "100% protected" },
              { icon: Zap, title: "Customer Support", desc: "Quick response" },
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-4 group">
                <div className="h-12 w-12 rounded-xl bg-[#cca666]/10 border border-[#cca666]/20 flex items-center justify-center transition-all duration-300 group-hover:bg-[#cca666]/20 group-hover:scale-110">
                  <feature.icon className="h-5 w-5 text-[#cca666]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#efdfab] text-sm">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-[#efdfab]/50">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero3;
