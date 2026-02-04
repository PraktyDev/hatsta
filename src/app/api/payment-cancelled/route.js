import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { customerName, email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Zylumine Team" <${process.env.GMAIL_ADDRESS}>`,
      to: email,
      subject: "Your Style Awaits - Complete Your Zylumine Order 👑",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.8; color: #333;">
          <h2 style="color: #cca666; text-align: center;">Zylumine</h2>
          <p>Hello${customerName ? ` <strong>${customerName}</strong>` : ""},</p>

          <p>
            We noticed that you started selecting some exclusive fashion pieces at <strong>Zylumine</strong> 
            but didn't complete your purchase.
          </p>

          <p>
            Your selected items are still saved in your bag. 
            Don't miss out on securing your style—stocks are limited.
          </p>

          <p style="margin: 24px 0; text-align: center;">
            👉 <a href="https://www.zylumine.com" style="color: #cca666; font-weight: bold; text-decoration: none; border: 1px solid #cca666; padding: 10px 20px; border-radius: 5px;">
              Return to Checkout
            </a>
          </p>

          <p>
            If you experienced any payment issues or need assistance, our support team is happy to help.
          </p>

          <br />

          <p>
            Warm regards,<br />
            <strong>Zylumine Team</strong><br />
            Made for Kings & Queens.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        success: true,
        message: "Abandoned cart email sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email",
        error,
      },
      { status: 500 }
    );
  }
}
