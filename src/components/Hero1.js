"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
} from "lucide-react"


const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop",
    title: "Redefine Your Style",
    subtitle: "Fashion",
    cta: "Explore Collection",
  },
  {
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=1080&fit=crop",
    title: "New Season Arrivals",
    subtitle: "Spring/Summer 2025",
    cta: "Shop New In",
  },
  {
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&h=1080&fit=crop",
    title: "Luxury Essentials",
    subtitle: "Timeless Pieces",
    cta: "Discover More",
  },
]


const Hero1 = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    // Auto-advance hero slider
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)

  return(
    <div className="min-h-screen w-full">
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0C0f25]/90 via-[#0C0f25]/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0f25] via-transparent to-transparent" />
            </div>
          </div>
        ))}

        <div className="relative z-10 container h-full flex items-center px-4 md:px-6">
          <div className={`max-w-2xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#cca666]/20 border border-[#cca666]/30 mb-6">
            <div className="p-0.5 rounded-full bg-[#0C0f25]">
              <Image
                alt='logo'
                src='/z-logo.jpg'
                width={50}
                height={50}
                className="h-4 w-4 rounded-full"
              />
            </div>
            <span className="text-sm text-[#efdfab]">{heroSlides[currentSlide].subtitle}</span>
            </div>
            <h1 className="text-5xl laptop:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">{heroSlides[currentSlide].title}</span>
            </h1>
            <p className="text-lg laptop:text-xl text-[#efdfab]/70 mb-8 max-w-lg">
              Experience the future of fashion intentionally crafted for Kings and Queens, and a curated collection of premium styles.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="group relative inline-flex items-center gap-2 px-4 py-2 laptop:px-8 laptop:py-4 rounded-md laptop:rounded-xl bg-gradient-to-r from-[#cca666] to-[#efdfab] text-[#0C0f25] font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#cca666]/30 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 text-sm laptop:text-base">{heroSlides[currentSlide].cta}</span>
                <ArrowRight className="relative z-10 h-4 w-4 laptop:h-5 laptop:w-5 transition-transform group-hover:translate-x-1" />
                <span className="absolute inset-0 bg-gradient-to-r from-[#efdfab] to-[#cca666] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              </Link>
            </div>
            <div className="flex gap-8 mt-12 pt-8 border-t border-[#efdfab]/10"></div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
          <button
            onClick={prevSlide}
            className="h-10 w-10 rounded-full bg-[#0C0f25]/50 border border-[#cca666]/30 flex items-center justify-center text-[#efdfab] transition-all hover:bg-[#cca666]/20 hover:border-[#cca666]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-8 bg-[#cca666]' 
                    : 'w-2 bg-[#efdfab]/30 hover:bg-[#efdfab]/50'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="h-10 w-10 rounded-full bg-[#0C0f25]/50 border border-[#cca666]/30 flex items-center justify-center text-[#efdfab] transition-all hover:bg-[#cca666]/20 hover:border-[#cca666]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="absolute bottom-8 right-8 z-20 hidden laptop:block">
          <div className="flex flex-col items-center gap-2 text-[#efdfab]/50">
            <span className="text-xs tracking-widest uppercase rotate-90 origin-center translate-y-8">Scroll</span>
            <div className="h-16 w-px bg-gradient-to-b from-[#cca666] to-transparent animate-pulse" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero1
