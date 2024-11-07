import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, required: true },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  expirationDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Coupon = mongoose.model("Coupon", couponSchema);
