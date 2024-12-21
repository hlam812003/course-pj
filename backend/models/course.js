import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  status: { type: String, enum: ["Draft", "Published"], default: "Draft" },
  thumbnail: { type: String }, // Link hình ảnh đại diện
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  totalLength: { type: String },
});

export const Course = mongoose.model("Course", courseSchema);
