import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // Hoặc có thể sử dụng một định dạng video
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  length: { type: String },
});

export const Lesson = mongoose.model("Lesson", lessonSchema);
