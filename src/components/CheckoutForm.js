"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useCart } from "@/context/CartContext";

const PaystackPaymentButton = dynamic(
  () => import("@/components/PaystackPaymentButton"),
  { ssr: false }
);

const formSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters long" }),
  phone: z
    .string({ message: "Phone is required" })
    .min(8, { message: "Phone must be at least 8 characters long" })
    .max(11, { message: "Phone must be at most 11 characters long" }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  deliveryAddress: z
    .string({ message: "Delivery address is required" })
    .min(5, { message: "Delivery address must be at least 5 characters long" }),
});

const DELIVERY_FEE = 2000;

export default function CheckoutForm({ isOpen, onClose, cartItems, cartTotal }) {
  const { clearCart } = useCart();
  const [orderId, setOrderId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkingPhone, setCheckingPhone] = useState(false);
  const [isPaymentInProgress, setIsPaymentInProgress] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      deliveryAddress: "",
    },
  });

  const total = cartTotal + DELIVERY_FEE;
  const paystackAmount = total * 100;

  // Create order before initiating payment
  const createOrderBeforePayment = async () => {
    try {
      const orderItems = cartItems.map(item => ({
        productId: item._id,
        title: item.title,
        quantity: item.quantity,
        price: item.amount,
        image: item.image,
        size: item.size,
      }));

      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.getValues("name"),
          email: form.getValues("email"),
          phone: form.getValues("phone"),
          deliveryAddress: form.getValues("deliveryAddress"),
          items: orderItems,
          subtotal: cartTotal,
          deliveryFee: DELIVERY_FEE,
          total,
        }),
      });

      const data = await res.json();
      if (data.success && data.orderId) {
        setOrderId(data.orderId);
        return data.orderId;
      }
      console.error("❌ Failed to create order:", data.error);
      return null;
    } catch (error) {
      console.error("❌ Error creating order:", error);
      return null;
    }
  };

  // Update order status
  const updateOrderStatus = async (
    targetOrderId,
    paymentStatus,
    orderStatus,
    paymentReference
  ) => {
    try {
      const res = await fetch("/api/orders/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: targetOrderId,
          paymentStatus,
          orderStatus,
          paymentReference,
        }),
      });

      const data = await res.json();
      return data.success;
    } catch (error) {
      console.error("❌ Error updating order status:", error);
      return false;
    }
  };

  const handlePaystackSuccess = async (paymentData, preCreatedOrderId) => {
    setIsProcessing(true);
    let isOrderUpdated = false;

    try {
      const targetOrderId = preCreatedOrderId || orderId;

      if (targetOrderId) {
        const statusUpdated = await updateOrderStatus(
          targetOrderId,
          "PAID",
          "CONFIRMED",
          paymentData.reference
        );

        if (statusUpdated) {
          isOrderUpdated = true;
          
          // Send confirmation email
          await fetch("/api/payment-success", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customerName: form.getValues("name"),
              email: form.getValues("email"),
              phone: form.getValues("phone"),
              deliveryAddress: form.getValues("deliveryAddress"),
              items: cartItems,
              subtotal: cartTotal,
              deliveryFee: DELIVERY_FEE,
              totalAmount: total,
              paymentReference: paymentData.reference,
              existingOrderId: targetOrderId,
            }),
          });

          setPaymentStatus("success");
          form.reset();
          clearCart();
        } else {
          setPaymentStatus("failed");
        }
      } else {
        setPaymentStatus("failed");
      }
    } catch (error) {
      console.error("❌ Payment success error:", error);
      if (isOrderUpdated) {
        setPaymentStatus("success");
        clearCart();
      } else {
        setPaymentStatus("failed");
      }
    } finally {
      setIsProcessing(false);
      setIsPaymentInProgress(false); // Reset flag when payment completes
    }
  };

  const handlePaystackClose = async (preCreatedOrderId) => {
    const email = form.getValues("email");
    const customerName = form.getValues("name");
    const targetOrderId = preCreatedOrderId || orderId;

    if (targetOrderId) {
      await updateOrderStatus(targetOrderId, "FAILED", "CANCELLED");
    }

    if (email) {
      setIsProcessing(true);
      try {
        await fetch("/api/payment-cancelled", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customerName, email }),
        });
      } catch (error) {
        console.error("❌ Failed to send abandoned cart email:", error);
      } finally {
        setIsProcessing(false);
      }
    }

    setOrderId(null);
    setPaymentStatus("cancelled");
    setIsPaymentInProgress(false); // Reset flag when Paystack closes
  };

  const phoneValue = form.watch("phone");

  useEffect(() => {
    const checkPhone = async () => {
      if (!phoneValue || phoneValue.length < 11) return;

      setCheckingPhone(true);
      try {
        const res = await fetch(
          `/api/users/search?phone=${encodeURIComponent(phoneValue)}`
        );
        const data = await res.json();

        if (res.ok && data.success && data.user) {
          const { name, email, address } = data.user;
          const currentValues = form.getValues();

          if (!currentValues.name && name) {
            form.setValue("name", name, { shouldValidate: true });
          }
          if (!currentValues.email && email) {
            form.setValue("email", email, { shouldValidate: true });
          }
          if (!currentValues.deliveryAddress && address) {
            form.setValue("deliveryAddress", address, { shouldValidate: true });
          }
        }
      } catch (error) {
        console.error("Error checking phone:", error);
      } finally {
        setCheckingPhone(false);
      }
    };

    const timeoutId = setTimeout(checkPhone, 1000);
    return () => clearTimeout(timeoutId);
  }, [phoneValue, form]);

  const handleCloseModal = () => {
    setPaymentStatus(null);
    onClose();
  };

  return (
    <>
    <Dialog open={isOpen && !isPaymentInProgress} onOpenChange={handleCloseModal}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#cca666]">
            Complete Your Order
          </DialogTitle>
          <DialogDescription>
            Fill in your details to complete your purchase
          </DialogDescription>
        </DialogHeader>

        {/* Order Summary */}
        <div className="border rounded-lg p-4 bg-[#0c0f25]/5 space-y-2">
          <h3 className="font-semibold text-sm mb-2">Order Summary</h3>
          <div className="max-h-32 overflow-y-auto space-y-2">
            {cartItems.map((item) => (
              <div key={item.cartId || item._id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.title} ({item.size}) × {item.quantity}
                </span>
                <span className="font-medium">₦{(item.amount * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-2 mt-2 space-y-1">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₦{cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery Fee</span>
              <span>₦{DELIVERY_FEE.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-[#cca666]">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <Form {...form}>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>Phone Number</FormLabel>
                    {checkingPhone && (
                      <Loader2 className="h-3 w-3 animate-spin text-[#cca666]" />
                    )}
                  </div>
                  <FormControl>
                    <Input
                      className="bg-gray-700 border border-gray-200"
                      placeholder="Enter your phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-700 border border-gray-200"
                      placeholder="Enter your full name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-700 border border-gray-200"
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deliveryAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Address</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-700 border border-gray-200"
                      placeholder="Enter your delivery address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <PaystackPaymentButton
              publicKey={process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY}
              amount={paystackAmount}
              email={form.watch("email")}
              onBeforePayment={createOrderBeforePayment}
              onPaymentStart={() => setIsPaymentInProgress(true)}
              onSuccess={handlePaystackSuccess}
              onClose={handlePaystackClose}
              text={`Pay ₦${total.toLocaleString()}`}
              className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-white bg-[#cca666] hover:bg-[#cca666]/90 h-10 px-4 py-2"
              disabled={!form.formState.isValid || cartItems.length === 0}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>

    {/* Loading Modal */}
    <Dialog open={isProcessing}>
      <DialogContent className="max-w-xs rounded-xl shadow-lg border border-[#cca666] z-[200]">
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <Loader2 className="h-12 w-12 text-[#cca666] animate-spin" />
          <DialogHeader>
            <DialogTitle className="text-lg text-center">
              Processing...
            </DialogTitle>
            <DialogDescription className="text-sm text-center">
              Please wait while we process your request.
            </DialogDescription>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>

    {/* Payment Status Modal */}
    <Dialog
      open={paymentStatus !== null && !isProcessing}
      onOpenChange={() => setPaymentStatus(null)}
    >
      <DialogContent className="max-w-sm rounded-xl shadow-lg border border-[#cca666] z-[200]">
        {paymentStatus === "success" && (
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <DialogHeader>
              <DialogTitle className="text-xl text-center text-[#cca666]">
                Order Placed Successfully!
              </DialogTitle>
              <DialogDescription className="text-sm text-center">
                Thank you for your order. You will receive a confirmation email shortly.
                We will deliver your items to your provided address.
              </DialogDescription>
            </DialogHeader>
            <Button
              className="mt-4 w-full bg-[#cca666] hover:bg-[#cca666]/90"
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </div>
        )}

        {paymentStatus === "cancelled" && (
          <div className="flex flex-col items-center text-center gap-4 py-6 z-90">
            <DialogHeader>
              <DialogTitle className="text-xl text-center">
                Payment Cancelled
              </DialogTitle>
              <DialogDescription className="text-sm text-center">
                You cancelled the payment. No charges were made to your account.
              </DialogDescription>
            </DialogHeader>
            <Button
              variant="outline"
              className="mt-4 w-full border-[#cca666] hover:bg-[#cca666]/10 hover:text-[#cca666]"
              onClick={() => setPaymentStatus(null)}
            >
              Try Again
            </Button>
          </div>
        )}

        {paymentStatus === "failed" && (
          <div className="flex flex-col items-center text-center gap-4 py-6 z-90">
            <DialogHeader>
              <DialogTitle className="text-xl text-center text-[#cca666]">
                Payment Received
              </DialogTitle>
              <DialogDescription className="text-sm text-center">
                We received your payment, but there was a brief delay updating
                your order. Please check your email for confirmation or contact
                support if you don&apos;t receive one in 5 minutes.
              </DialogDescription>
            </DialogHeader>
            <Button
              className="mt-4 w-full bg-[#cca666] hover:bg-[#cca666]/90"
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
    </>
  );
}
