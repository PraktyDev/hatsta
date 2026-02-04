"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Button } from "./ui/button";
import CheckoutForm from "./CheckoutForm";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const { cartItems, removeFromCart, getCartTotal, clearCart, decreaseQuantity, addToCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const CartContent = () => (
    <div className="flex flex-col h-[calc(100vh-100px)] mt-4">
      {cartItems.length === 0 ? (
        <p className="text-center flex items-center justify-center h-full">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div
                  key={item.cartId || item._id}
                  className="flex gap-4 items-center justify-between border-b pb-2"
                >
                  <div className="flex gap-2 items-center">
                    <Image
                      src={item.image}
                      width={50}
                      height={50}
                      alt={item.title}
                      className="rounded object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm">{item.title}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 rounded-full"
                          onClick={() => decreaseQuantity(item.cartId || item._id)}
                        >
                          -
                        </Button>
                        <span className="text-xs text-gray-500 font-medium w-4 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 rounded-full"
                          onClick={() => addToCart(item)}
                        >
                          +
                        </Button>
                      </div>

                      {item.size && <p className="text-[10px] text-gray-400 mt-1">Size: {item.size}</p>}

                      <p className="text-sm font-bold mt-1">
                        ₦{item.amount * item.quantity}
                      </p>
                    </div>
                  </div>
                  <Button
                    className="flex rounded-full h-5 w-5 items-center justify-center bg-red-50 hover:bg-red-100 text-red-600"
                    variant="ghost"
                    size="xs"
                    onClick={() => removeFromCart(item.cartId || item._id)}
                  >
                    x
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t mt-auto">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total:</span>
              <span>₦{getCartTotal()}</span>
            </div>
            <Button
              variant="outline"
              className="w-full mb-2"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
            <Button className="w-full" onClick={() => setIsCheckoutOpen(true)}>
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="flex justify-between items-center p-5 sticky z-50 top-0 shadow-sm shadow-[#cca666] bg-[#0c0f25]">
      <div className="mr-4 flex items-center">
        <Link href="/" className="group mr-8 flex items-center space-x-2">
          <div className="relative">
            <Image
              src={"/z-logo.jpg"}
              width={246}
              height={55}
              alt="zylumine logo"
              className="w-7 h-7 rounded-full border-2 border-[#cca666] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
            />
            <div className="absolute inset-0 bg-[#cca666] blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
          </div>
          <span className="text-xl laptop:text-2xl font-bold tracking-tight gradient-text transition-all duration-300 group-hover:tracking-wider">
            Zylumine
          </span>
        </Link>

        <nav className="hidden laptop:flex items-center space-x-1 text-sm font-medium">
          <Link
            href="/products"
            className={`relative px-4 py-2 transition-all duration-300 group ${pathname === "/products" ? "text-[#efdfab]" : "text-[#efdfab]/70 hover:text-[#efdfab]"}`}
          >
            <span className="relative z-10">Shop</span>
            <span
              className={`absolute inset-0 rounded-lg transition-all duration-300 ${pathname === "/products" ? "bg-[#cca666]/10" : "bg-[#cca666]/0 group-hover:bg-[#cca666]/10"}`}
            />
            <span
              className={`absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-[#cca666] to-[#efdfab] transition-transform duration-300 origin-left ${pathname === "/products" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
            />
          </Link>
        </nav>
      </div>

      <div className="flex gap-4">
        <div className="flex gap-2">
          <nav className="flex laptop:hidden items-center space-x-1 text-sm font-medium">
            <Link
              href="/products"
              className={`relative px-4 py-2 transition-all duration-300 group ${pathname === "/products" ? "text-[#efdfab]" : "text-[#efdfab]/70 hover:text-[#efdfab]"}`}
            >
              <span className="relative z-10">Shop</span>
              <span
                className={`absolute inset-0 rounded-lg transition-all duration-300 ${pathname === "/products" ? "bg-[#cca666]/10" : "bg-[#cca666]/0 group-hover:bg-[#cca666]/10"}`}
              />
              <span
                className={`absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-[#cca666] to-[#efdfab] transition-transform duration-300 origin-left ${pathname === "/products" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
              />
            </Link>
          </nav>
          <Separator orientation="vertical" />
          <Sheet>
            <SheetTrigger className="flex flex-nowrap items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative bg-[#cca666]/0 hover:bg-[#cca666]/10"
              >
                <ShoppingCart className="h-5 w-5 text-primary" />
                {cartItems.reduce((a, b) => a + b.quantity, 0) > 0 && (
                  <span className="absolute -top-1 right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                    {cartItems.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Cart Section</SheetTitle>
              </SheetHeader>
              <CartContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutForm
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        cartTotal={getCartTotal()}
      />
    </div>
  );
};

export default Navbar;
