import Image from "next/image"
import { FaPhone } from "react-icons/fa6"
import { IoMail } from "react-icons/io5"
import { GoDotFill } from "react-icons/go"
import { MdLocationOn } from "react-icons/md"
import { RiWhatsappFill } from "react-icons/ri"
import { FaInstagram } from "react-icons/fa"
import { FaFacebookSquare } from "react-icons/fa"


const Footer = () => {
  return (
    <footer className="flex flex-col z-50 mt-10">
      <div className="flex overflow-hidden space-x-20 border-t border-y border-[#cca666] py-1">
        <div className="flex space-x-5 animate-loop-scroll">
          <p className="uppercase flex text-nowrap items-center"><GoDotFill />made for kings & queens</p>
          <p className="uppercase flex text-nowrap items-center"><GoDotFill />made for kings & queens</p>
          <p className="uppercase flex text-nowrap items-center"><GoDotFill />made for kings & queens</p>
          <p className="uppercase flex text-nowrap items-center"><GoDotFill />made for kings & queens</p>
          <p className="uppercase flex text-nowrap items-center"><GoDotFill />made for kings & queens</p>
          <p className="uppercase flex text-nowrap items-center"><GoDotFill />made for kings & queens</p>
        </div>
        <div className="flex space-x-5 animate-loop-scroll">
          <p className="uppercase flex text-nowrap items-center"><GoDotFill />made for kings & queens</p>
          <p className="uppercase flex text-nowrap items-center"><GoDotFill />made for kings & queens</p>
          <p className="uppercase flex text-nowrap items-center"><GoDotFill />made for kings & queens</p>
          <p className="uppercase flex text-nowrap items-center"><GoDotFill />made for kings & queens</p>
          <p className="uppercase flex text-nowrap items-center"><GoDotFill />made for kings & queens</p>
          <p className="uppercase flex text-nowrap items-center"><GoDotFill />made for kings & queens</p>
        </div>
      </div>
      <div className="py-7 laptop:py-12 px-5 flex flex-col laptop:flex-row laptop:items-center justify-between gap-5">
        <div className="flex flex-col gap-2 basis-1/2">
          <Image className="w-8 h-8 rounded-full border-2 border-[#cca666] hover:skew-y-6 transition-all duration-700" src={"/z-logo.jpg"} width={246} height={55} alt="zylumine logo"/>
          <p className="tablet:w-3/4 ">we believe that great style starts from the top. Shop our collection of beautiful dresses and elevate your look today. Our team is dedicated to providing you with exceptional customer service...</p>
        </div>
        <div className="flex flex-row gap-4 basis-1/2 space-x-20">
          <div className="flex flex-col gap-1">
            <p className="mb-2 font-semibold">Contact</p>
            <p className="flex flex-nowrap gap-2 items-center font-light "><FaPhone size={12} /> +234 12345678</p>
            <p className="flex flex-nowrap gap-2 items-center font-light "><IoMail /> zylumine@gmail.com</p>
            <p className="flex flex-nowrap gap-2 items-center font-light "><MdLocationOn /> Nigeria</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="mb-2 font-semibold">Socials</p>
            <p className="font-light flex cursor-pointer flex-nowrap gap-2 items-center hover:text-blue-400"><RiWhatsappFill color="green" /> WhatsApp</p>
            <p className="font-light flex cursor-pointer flex-nowrap gap-2 items-center hover:text-blue-400"><FaInstagram className="text-pink-500" /> Instagram</p>
            <p className="font-light flex cursor-pointer flex-nowrap gap-2 items-center hover:text-blue-400"><FaFacebookSquare color="blue" /> Facebook</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer