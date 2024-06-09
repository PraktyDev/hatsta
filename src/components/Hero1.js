import React from 'react'
import { AspectRatio } from './ui/aspect-ratio'
import Image from 'next/image'

const Hero1 = () => {
  return (
    <section className='flex flex-col gap-4 items-center'>
        <div className='flex flex-col laptop:flex-row gap-6'>
        <div className="flex overflow-hidden space-x-20 px-10">
            <div className="flex space-x-5 animate-loop-scroll">
                <p className="uppercase flex text-nowrap items-center">YOUR ULTIMATE DESTINATION FOR STYLISH BUCKET HAT IN NIGERIA • </p>
            </div>
            <div className="flex space-x-5 animate-loop-scroll">
                <p className="uppercase flex text-nowrap items-center">YOUR ULTIMATE DESTINATION FOR STYLISH BUCKET HAT IN NIGERIA • </p>
            </div>
        </div>
        <p className='text-center'>Elevate your style with trendy bucket hats - the perfect accessory for any outfit! Our collection features a variety of colors and materials to match your personal taste. Shop now and find your new favorite headwear in Nigeria.</p>
        </div>
        <div className='block laptop:hidden'>
            <Image className='w-[500px] h-[500px] object-cover' src={"/assets/images/heroimg.jpg"} width={100} height={100} alt='hero image' /> 
        </div>
        <div  className='hidden laptop:block'>
            <Image className='w-full h-[500px] object-cover' src={"/assets/images/heroimg.jpg"} width={1000} height={100} alt='hero image' /> 
        </div>
    </section>
  )
}

export default Hero1