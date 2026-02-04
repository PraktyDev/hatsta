import { NextResponse } from "next/server";
import { ConnectToDB } from "../../../../../utils/database";
import User from "../../../../../models/User";
import Order from "../../../../../models/Order";

export async function POST(req) {
  try {
    await ConnectToDB();

    const body = await req.json();
    const {
      name,
      email,
      phone,
      deliveryAddress,
      total,
      items,
    } = body;

    // Find or create user by email
    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      user = await User.create({
        name,
        email: email.toLowerCase(),
        phone,
        address: deliveryAddress,
      });
    } else {
      // Update user info if changed
      user.name = name;
      user.phone = phone;
      user.address = deliveryAddress;
      await user.save();
    }

    // Get the last order to determine the next orderId
    const lastOrder = await Order.findOne({}, { orderId: 1 })
      .sort({ createdAt: -1 })
      .lean();

    let nextOrderNumber = 1;
    if (lastOrder?.orderId) {
      const lastNumber = parseInt(lastOrder.orderId, 10);
      if (!isNaN(lastNumber)) {
        nextOrderNumber = lastNumber + 1;
      }
    }

    // Format as 7-digit string with leading zeros (e.g., 0000001)
    const orderId = nextOrderNumber.toString().padStart(7, "0");

    // Create order with user reference
    // Initial order submission:
    // - paymentStatus: "PROCESSING" (payment is being processed)
    // - orderStatus: "PENDING" (order is pending confirmation)
    // - deliveryStatus: "NOT_PICKED" (not picked yet)
    const order = await Order.create({
      user: user._id,
      orderId,
      name,
      email: email.toLowerCase(),
      phone,
      deliveryAddress,
      total,
      items,
      paymentStatus: "PROCESSING",
      orderStatus: "PENDING",
      deliveryStatus: "NOT_PICKED",
    });

    return NextResponse.json({
      orderId: order.orderId,
      success: true,
    });
  } catch (error) {
    console.error("❌ Failed to create order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
