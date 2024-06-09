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
    <footer className="bg-[#f7f8f8] flex flex-col z-50">
      <div className="flex overflow-hidden space-x-20 border-t border-b border-black py-1">
        <div className="flex space-x-5 animate-loop-scroll">
          <p className="uppercase flex text-nowrap items-center"><GoDotFill /> upgrade your style</p>
          <p className="uppercase flex text-nowrap items-center"><GoDotFill /> upgrade your style</p>
          <p className="uppercase flex text-nowrap items-center"><GoDotFill /> upgrade your style</p>
          <p className="uppercase flex text-nowrap items-center"><GoDotFill /> upgrade your style</p>
          <p className="uppercase flex text-nowrap items-center"><GoDotFill /> upgrade your style</p>
          <p className="uppercase flex text-nowrap items-center"><GoDotFill /> upgrade your style</p>
        </div>
        <div className="flex space-x-5 animate-loop-scroll">
          <p className="uppercase flex text-nowrap items-center"><GoDotFill /> upgrade your style</p>
          <p className="uppercase flex text-nowrap items-center"><GoDotFill /> upgrade your style</p>
          <p className="uppercase flex text-nowrap items-center"><GoDotFill /> upgrade your style</p>
          <p className="uppercase flex text-nowrap items-center"><GoDotFill /> upgrade your style</p>
          <p className="uppercase flex text-nowrap items-center"><GoDotFill /> upgrade your style</p>
          <p className="uppercase flex text-nowrap items-center"><GoDotFill /> upgrade your style</p>
        </div>
      </div>
      <div className="py-12 px-5 flex flex-col laptop:flex-row laptop:items-center justify-between gap-5">
        <div className="flex flex-col gap-2 basis-1/2">
          <Image className="w-20 h-auto" src={"/assets/images/hatsta.png"} width={246} height={55} alt="hatsta logo"/>
          <p className="tablet:w-3/4">we believe that great style starts from the top. Shop our collection of bucket hats and elevate your look today. Our team is dedicated to providing you with exceptional customer service...</p>
        </div>
        <div className="flex flex-row gap-4 basis-1/2 space-x-20">
          <div className="flex flex-col gap-1">
            <p className="mb-2 font-semibold">Contact</p>
            <p className="flex flex-nowrap gap-2 items-center "><FaPhone size={12} /> +234 12345678</p>
            <p className="flex flex-nowrap gap-2 items-center "><IoMail /> hatsta@demomail.com</p>
            <p className="flex flex-nowrap gap-2 items-center "><MdLocationOn /> Pluto, World</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="mb-2 font-semibold">Socials</p>
            <p className="flex flex-nowrap gap-2 items-center hover:text-blue-400"><RiWhatsappFill color="green" /> WhatsApp</p>
            <p className="flex flex-nowrap gap-2 items-center hover:text-blue-400"><FaInstagram className="text-pink-500" /> Instagram</p>
            <p className="flex flex-nowrap gap-2 items-center hover:text-blue-400"><FaFacebookSquare color="blue" /> Facebook</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer