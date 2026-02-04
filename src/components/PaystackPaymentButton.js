"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function PaystackPaymentButton({
  email,
  amount,
  publicKey,
  text,
  className,
  disabled,
  onBeforePayment,
  onSuccess,
  onClose,
  onPaymentStart,
}) {
  const [isPreparingOrder, setIsPreparingOrder] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Load Paystack script
  useEffect(() => {
    const script = document.getElementById("paystack-script");
    if (script) {
      setIsScriptLoaded(true);
      return;
    }

    const newScript = document.createElement("script");
    newScript.id = "paystack-script";
    newScript.src = "https://js.paystack.co/v1/inline.js";
    newScript.async = true;
    newScript.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(newScript);

    return () => {
      // Don't remove script on unmount as it might be used by other components
    };
  }, []);

  const handleClick = async () => {
    if (!isScriptLoaded || !window.PaystackPop) {
      console.error("Paystack script not loaded");
      return;
    }

    setIsPreparingOrder(true);

    try {
      // 1. Create order BEFORE initiating payment
      const orderId = await onBeforePayment();

      if (!orderId) {
        console.error("Failed to create order before payment");
        setIsPreparingOrder(false);
        return;
      }

      // 2. Generate unique reference
      const reference = `ZYL-${orderId}-${Date.now()}`;

      // 3. Initialize Paystack payment with the order ID
      const handler = window.PaystackPop.setup({
        key: publicKey,
        email,
        amount,
        ref: reference,
        metadata: {
          custom_fields: [
            {
              display_name: "Order ID",
              variable_name: "order_id",
              value: orderId,
            },
          ],
        },
        callback: (response) => {
          onSuccess(response, orderId);
        },
        onClose: () => {
          onClose(orderId);
        },
      });

      // Notify parent that payment modal is opening
      if (onPaymentStart) {
        onPaymentStart();
      }

      handler.openIframe();
    } catch (error) {
      console.error("Error preparing order:", error);
    } finally {
      setIsPreparingOrder(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      className={className}
      disabled={disabled || isPreparingOrder || !isScriptLoaded}
    >
      {isPreparingOrder ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating order...
        </>
      ) : (
        text
      )}
    </Button>
  );
}
