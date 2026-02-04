import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ConnectToDB } from "../../../../utils/database";
import Order from "../../../../models/Order";

export async function POST(request) {

  try {
    const {
      customerName,
      email,
      phone,
      deliveryAddress,
      items,
      subtotal,
      deliveryFee,
      totalAmount,
      paymentReference,
      existingOrderId,
    } = await request.json();

    await ConnectToDB();

    let orderId;
    // Check if we should update an existing order
    if (existingOrderId) {
      const existingOrder = await Order.findOne({ orderId: existingOrderId });
      
      if (existingOrder) {
        existingOrder.paymentStatus = "PAID";
        existingOrder.orderStatus = "CONFIRMED";
        existingOrder.deliveryStatus = "NOT_PICKED";
        existingOrder.paidAt = new Date();
        existingOrder.paymentReference = paymentReference;
        existingOrder.emailSent = true;
        await existingOrder.save();
        orderId = existingOrderId;
      } else {
        throw new Error(`Order with ID ${existingOrderId} not found`);
      }
    } else {
        throw new Error("Missing existingOrderId in payment success callback");
    }


    // Get current date/time for email
    const now = new Date();
    const orderDate = now.toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Africa/Lagos",
    });
    const orderTime = now.toLocaleTimeString("en-NG", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Africa/Lagos",
    });


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Generate Items HTML
    const itemsHtml = items.map(item => `
        <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
            <p style="margin: 0; font-weight: bold;">${item.title}</p>
            ${item.size ? `<p style="margin: 0; font-size: 14px; color: #555;">Size: ${item.size}</p>` : ''}
            <p style="margin: 0; font-size: 14px; color: #555;">
                Quantity: ${item.quantity} x ₦${item.amount.toLocaleString()}
            </p>
        </div>
    `).join('');

    /* ===========================
       CUSTOMER EMAIL (RECEIPT)
    ============================ */
    const customerMailOptions = {
      from: `"Zylumine Team" <${process.env.GMAIL_ADDRESS}>`,
      to: email,
      subject: `Zylumine Order Receipt – Order #${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #cca666;">Zylumine</h2>
          <p>Dear <strong>${customerName}</strong>,</p>

          <p>
            Thank you for shopping with <strong>Zylumine</strong>. Your order has been
            successfully received and confirmed.
          </p>

          <hr style="border: 0; border-top: 1px solid #eee;" />

          <h3>📦 Order Details</h3>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Order Date:</strong> ${orderDate}</p>
          <p><strong>Order Time:</strong> ${orderTime}</p>

          <hr style="border: 0; border-top: 1px solid #eee;" />

          <h3>📍 Delivery Information</h3>
          <p><strong>Address:</strong> ${deliveryAddress}</p>
          <p><strong>Phone:</strong> ${phone}</p>

          <hr style="border: 0; border-top: 1px solid #eee;" />

          <h3>🛍️ Items Ordered</h3>
          ${itemsHtml}

          <div style="margin-top: 20px; background: #f9f9f9; padding: 15px; border-radius: 5px;">
             <p style="margin: 5px 0;"><strong>Subtotal:</strong> ₦${subtotal.toLocaleString()}</p>
             <p style="margin: 5px 0;"><strong>Delivery Fee:</strong> ₦${deliveryFee.toLocaleString()}</p>
             <h3 style="margin: 10px 0; color: #cca666;">Total Paid: ₦${totalAmount.toLocaleString()}</h3>
          </div>

          <p>
            Our team is preparing your package. We will contact you regarding the delivery.
          </p>

          <p>
            If you have any questions, feel free to reply to this email.
          </p>

          <p>
            Warm regards,<br />
            <strong>Zylumine Team</strong>
          </p>
        </div>
      `,
    };

    /* ===========================
       ADMIN EMAIL (INTERNAL ALERT)
    ============================ */
    const adminMailOptions = {
      from: `"Zylumine System" <${process.env.GMAIL_ADDRESS}>`,
      to: process.env.GMAIL_ADDRESS,
      subject: `New Order Confirmed - Order ID: ${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>🛍️ New Order Confirmed</h2>

          <p>🆔 <strong>Order ID:</strong> ${orderId}</p>
          <p>👤 <strong>Customer:</strong> ${customerName}</p>
          <p>📧 <strong>Email:</strong> ${email}</p>
          <p>☎ <strong>Phone:</strong> ${phone}</p>
          <p>📍 <strong>Delivery Address:</strong> ${deliveryAddress}</p>

          <hr />

          <h3>Items:</h3>
          ${itemsHtml}

          <h3>💰 Total Amount: <strong>₦${totalAmount.toLocaleString()}</strong></h3>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(customerMailOptions);
    await transporter.sendMail(adminMailOptions);

    return NextResponse.json(
      {
        success: true,
        message: "Order saved and emails sent successfully",
        orderId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email.",
        error,
      },
      { status: 500 }
    );
  }
}