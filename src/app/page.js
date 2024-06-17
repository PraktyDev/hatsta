import Hero1 from "@/components/Hero1";
import Hero2 from "@/components/Hero2";
import Hero3 from "@/components/Hero3";

export default function Home() {
  if(!process.env.NEXT_PUBLIC_API_URL){
    return null;
  }
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-9 laptop:p-10">
        <Hero1 />
        <Hero2 />
        <Hero3 />
    </main>
  );
}
