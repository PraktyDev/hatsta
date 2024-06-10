import Image from "next/image";

const Hero1 = () => {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col laptop:flex-row  gap-5 laptop:gap-14 w-full mx-auto">
        <div className="flex overflow-hidden space-x-5 px-10 w-[450px] laptop:w-[550px] mx-auto">
          <div className="flex space-x-5 animate-loop-scroll">
            <h1 className="uppercase flex text-nowrap items-center">
              YOUR ULTIMATE DESTINATION FOR STYLISH BUCKET HAT IN NIGERIA •
            </h1>
          </div>
          <div className="flex space-x-5 animate-loop-scroll">
            <h1 className="uppercase flex text-nowrap items-center">
              YOUR ULTIMATE DESTINATION FOR STYLISH BUCKET HAT IN NIGERIA •
            </h1>
          </div>
        </div>
        <p className="text-center laptop:text-left">
          Elevate your style with trendy bucket hats - the perfect accessory for
          any outfit! Our collection features a variety of colors and materials
          to match your personal taste. Shop now and find your new favorite
          headwear in Nigeria.
        </p>
      </div>
      <Image
          className="w-full laptop:w-screen h-[450px] object-cover rounded-3xl laptop:rounded-3xl"
          src={"/assets/images/heroimg.jpg"}
          width={1080}
          height={608}
          alt="hero image"
      />
    </section>
  );
};

export default Hero1;
