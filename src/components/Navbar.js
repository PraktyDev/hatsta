import Image from "next/image"
import Link from "next/link"
import { Separator } from "./ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "./ui/menubar"
import { FaCartShopping } from "react-icons/fa6";
import { BiMenu } from "react-icons/bi";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-5 sticky z-50 ">
      <Image className="w-20 h-auto" src={"/assets/images/hatsta.png"} width={246} height={55} alt="hatsta logo"/>
      <div className="hidden laptop:flex gap-4">
        <nav className="flex gap-4">
          <Link href={"/"}>Home</Link>
          <Link href={"/products"}>Shop</Link>
        </nav>
        <div className="flex gap-2">
          <Separator orientation="vertical" />
          <Sheet>
            <SheetTrigger className="flex flex-nowrap items-center gap-2" ><FaCartShopping /> Cart</SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Cart Section</SheetTitle>
                <SheetDescription>
                  Work in Progress...
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex gap-4 items-center laptop:hidden" >
        <div>
          <Sheet>
            <SheetTrigger className="flex flex-nowrap items-center gap-2" ><FaCartShopping /> Cart</SheetTrigger>
            <SheetContent className="w-1/2">
              <SheetHeader>
                <SheetTitle>Cart Section</SheetTitle>
                <SheetDescription>
                  Work in progress...
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex gap-2">
          <div>
            <Separator orientation="vertical" /> 
          </div>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger><BiMenu /></MenubarTrigger>
              <MenubarContent className="py-4">
                <MenubarItem className="flex justify-center">
                  <Link href={"/"} >Home</Link>
                </MenubarItem>
                <MenubarItem className="flex justify-center">
                  <Link href={"/products"} >Shop</Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </div>
  )
}

export default Navbar