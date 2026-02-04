import crypto from "crypto";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { ConnectToDB } from "../../../../../utils/database";
// import { sendSuccessEmail } from "@/lib/email"; // TODO: Fix email sending
import Order from "../../../../../models/Order";

export async function POST(req) {
  const body = await req.text();
  const signature = (await headers()).get("x-paystack-signature");

  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
    .update(body)
    .digest("hex");

  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);

  if (event.event === "charge.success") {
    const data = event.data;
    const orderId = data.metadata?.custom_fields?.find(
      (field) => field.variable_name === "order_id"
    )?.value;

    if (!orderId) {
      return NextResponse.json({ received: true });
    }

    try {
      await ConnectToDB();

      // Find the order by orderId
      const order = await Order.findOne({ orderId });

      if (!order) {
        return NextResponse.json({ received: true });
      }

      // Verify amount matches (Paystack sends amount in kobo)
      const expectedAmount = order.total * 100;
      if (data.amount !== expectedAmount) {
        return NextResponse.json(
          { error: "Amount mismatch" },
          { status: 400 }
        );
      }

      // Verify email matches
      if (data.customer.email.toLowerCase() !== order.email.toLowerCase()) {
        return NextResponse.json(
          { error: "Email mismatch" },
          { status: 400 }
        );
      }

      // Check if already paid AND email sent
      if (order.paymentStatus === "PAID" && order.emailSent) {
        return NextResponse.json({ received: true });
      }

      // Mark order as PAID and update all status fields
      order.paymentStatus = "PAID";
      order.orderStatus = "CONFIRMED"
      // // deliveryStatus remains "NOT_PICKED" until pickup
      order.paymentReference = data.reference;
      order.paidAt = new Date();
      await order.save();
      
      // Trigger email sending if not already sent
      if (!order.emailSent) {
        await sendSuccessEmail(order);
        
        // Update emailSent flag
        order.emailSent = true;
        await order.save();
      }
    } catch {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
