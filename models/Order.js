import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    // pickupAddress: {
    //   type: String,
    //   required: [true, "Pickup address is required"],
    //   trim: true,
    // },
    deliveryAddress: {
      type: String,
      required: [true, "Delivery address is required"],
      trim: true,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    items: [
      {
        productId: { type: String, required: true },
        title: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        image: { type: String },
        size: { type: String, required: true },
      }
    ],
    paymentStatus: {
      type: String,
      enum: ["PROCESSING", "PAID", "FAILED", "REFUNDED"],
      default: "PROCESSING",
    },
    orderStatus: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "FULFILLED", "CANCELLED"],
      default: "PENDING",
    },
    deliveryStatus: {
      type: String,
      enum: ["NOT_PICKED", "PICKED_UP", "IN_PROGRESS", "OUT_FOR_DELIVERY", "DELIVERED"],
      default: "NOT_PICKED",
    },
    paymentReference: {
      type: String,
      trim: true,
    },
    paidAt: {
      type: Date,
    },
    emailSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for common queries
OrderSchema.index({ user: 1 });
OrderSchema.index({ email: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ paymentStatus: 1 });
OrderSchema.index({ orderStatus: 1 });
OrderSchema.index({ deliveryStatus: 1 });
OrderSchema.index({ createdAt: -1 });

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
