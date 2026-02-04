// "use client";
// import Link from "next/link";
// import ProductCard from "./ProductCard";
// import { Button } from "./ui/button";
// import { useEffect, useState } from "react";
// import { Skeleton } from "./ui/skeleton";

// const Hero2 = () => {
//   const [product, setProduct] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
//         );
//         console.log(response);
//         if (!response.ok) {
//           throw new Error("Unable to fetch data");
//         }
//         const data = await response.json();
//         setProduct(data);
//       } catch (error) {
//         console.log(error);
//         setError("Failed to load products. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchProduct();
//   }, []);

//   if (error) {
//     return (
//       <section className="flex flex-col items-center gap-10 py-10">
//         <div className="text-center mt-5">
//           <span className="text-[#cca666] text-sm laptop:text-base font-medium tracking-wider uppercase mb-2 block">
//             Crafted with love
//           </span>
//           <h2 className="text-2xl laptop:text-4xl font-bold gradient-text mb-4 uppercase">
//             our latest collections
//           </h2>
//           <p className="text-[#efdfab]/60 max-w-2xl mx-auto text-base laptop:text-xl">
//             Explore our beautiful collections and find the perfect piece for
//             you. We thought of you while making these collections.
//           </p>
//         </div>
//         <h3 className="uppercase text-center text-red-500 font-bold">
//           {error}
//         </h3>
//       </section>
//     );
//   }

//   return (
//     <section className="flex flex-col items-center w-full gap-10 px-3">
//       <div className="text-center mt-5">
//         <span className="text-[#cca666] text-sm laptop:text-base font-medium tracking-wider uppercase mb-2 block">
//           Crafted with love
//         </span>
//         <h2 className="text-2xl laptop:text-4xl font-bold gradient-text mb-4 uppercase">
//           our latest collections
//         </h2>
//         <p className="text-[#efdfab]/60 max-w-2xl mx-auto text-base laptop:text-xl">
//           Explore our beautiful collections and find the perfect piece for you.
//           We thought of you while making these collections.
//         </p>
//       </div>
//       <div className="-z-10 w-full grid grid-cols-1 laptop:grid-cols-2 gap-4 place-items-center">
//         {isLoading
// ? Array.from({ length: 4 }).map((_, index) => (
//     <div key={index} className="flex gap-5 p-4 w-full">
//       <Skeleton className="w-32 h-32 rounded-2xl" />
//       <div className="flex flex-col gap-2 w-full">
//         <Skeleton className="h-6 w-3/4" />
//         <Skeleton className="h-4 w-1/2" />
//         <div className="flex justify-between w-full mt-2">
//           <Skeleton className="h-6 w-16" />
//           <Skeleton className="h-8 w-24" />
//         </div>
//       </div>
//     </div>
//   ))
//           : product
//               .slice(0, 4)
//               .map((item) => (
//                 <ProductCard
//                   key={item._id}
//                   id={item._id}
//                   title={item.title}
//                   description={item.description}
//                   image={item.image}
//                   amount={item.amount}
//                 />
//               ))}
//       </div>
//       <Button asChild>
//         <Link href={"/products"}>See All</Link>
//       </Button>
//     </section>
//   );
// };

// export default Hero2;

"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

const Hero2 = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        );

        if (!response.ok) {
          throw new Error("Unable to fetch data");
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (error) {
    return (
      <section className="flex flex-col items-center gap-10 py-10">
        <Header />
        <h3 className="uppercase text-center text-red-500 font-bold">
          {error}
        </h3>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center w-full gap-10 px-4">
      <Header />

      {/* PRODUCTS GRID */}
      <div className="w-full max-w-7xl grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex gap-5 w-full relative rounded-md p-2 shadow-md shadow-[#cca666]/10"
              >
                <Skeleton className="absolute top-4 right-4 h-10 w-10 rounded-full" />
                <Skeleton className="w-32 h-32 rounded-2xl" />
                <div className="flex flex-col justify-center gap-2 flex-1">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-6 w-24 mt-1" />
                </div>
              </div>
            ))
          : product
              .slice(0, 4)
              .map((item) => (
                <ProductCard
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  amount={item.amount}
                />
              ))}
      </div>

      <Button asChild>
        <Link href="/products">See All</Link>
      </Button>
    </section>
  );
};

const Header = () => (
  <div className="text-center mt-5">
    <span className="text-[#cca666] text-sm laptop:text-base font-medium tracking-wider uppercase mb-2 block">
      Crafted with love
    </span>
    <h2 className="text-2xl laptop:text-4xl font-bold gradient-text mb-4 uppercase">
      our latest collections
    </h2>
    <p className="text-[#efdfab]/60 max-w-2xl mx-auto text-base laptop:text-xl">
      Explore our beautiful collections and find the perfect piece for you. We
      thought of you while making these collections.
    </p>
  </div>
);

export default Hero2;
