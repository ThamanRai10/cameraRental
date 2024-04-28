import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"],
    },
    paymentStatus: {
      type: String,
      default: "Card", // Default payment status
      enum: ["Card", "Cash in Hand", "Not Paid"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);


