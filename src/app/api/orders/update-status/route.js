import { NextResponse } from "next/server";
import { ConnectToDB } from "../../../../../utils/database";
import Order from "../../../../../models/Order";


export async function POST(req) {
  try {
    await ConnectToDB();

    const body = await req.json();
    const { orderId, paymentStatus, orderStatus, deliveryStatus, paymentReference } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Order ID is required" },
        { status: 400 }
      );
    }

    const order = await Order.findOne({ orderId });

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    // Update status fields if provided
    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    if (orderStatus) {
      order.orderStatus = orderStatus;
    }

    if (deliveryStatus) {
      order.deliveryStatus = deliveryStatus;
    }

    if (paymentReference) {
      order.paymentReference = paymentReference;
    }

    await order.save();

    return NextResponse.json({
      success: true,
      message: "Order status updated successfully",
      order: {
        orderId: order.orderId,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        deliveryStatus: order.deliveryStatus,
      },
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update order status" },
      { status: 500 }
    );
  }
}
