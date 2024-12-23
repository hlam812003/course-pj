import { Lesson } from "../models/lesson.js";
import mongoose from "mongoose";

export const lessonController = {
  // Create a new lesson
  createLesson: async (request, reply) => {
    try {
      const { title, content, course } = request.body;

      // Ensure the course exists in the database
      if (!mongoose.Types.ObjectId.isValid(course)) {
        return reply.status(400).send({ message: "Invalid course ID" });
      }

      const newLesson = new Lesson({
        title,
        content,
        course,
      });

      await newLesson.save();

      return reply.status(201).send({
        message: "Lesson created successfully",
        lesson: newLesson,
      });
    } catch (error) {
      console.error("Error creating lesson:", error);
      return reply
        .status(500)
        .send({ message: "Error creating lesson", error: error.message });
    }
  },

  // Get a lesson by ID
  getLessonById: async (request, reply) => {
    try {
      const { id } = request.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid lesson ID" });
      }

      const lesson = await Lesson.findById(id).populate("course");

      if (!lesson) {
        return reply.status(404).send({ message: "Lesson not found" });
      }

      return reply.status(200).send(lesson);
    } catch (error) {
      console.error("Error fetching lesson by ID:", error);
      return reply
        .status(500)
        .send({ message: "Error fetching lesson", error: error.message });
    }
  },

  // Get all lessons for a specific course
  getLessonsByCourseId: async (request, reply) => {
    try {
      const { courseId } = request.params;
      const { page = 1, limit = 30 } = request.query; // Default values for pagination

      // Kiểm tra ID hợp lệ
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return reply.status(400).send({ message: "Invalid course ID" });
      }

      // Phân tích tham số phân trang
      const pageNumber = parseInt(page, 10);
      const pageSize = parseInt(limit, 10);

      if (
        isNaN(pageNumber) ||
        pageNumber <= 0 ||
        isNaN(pageSize) ||
        pageSize <= 0
      ) {
        return reply
          .status(400)
          .send({ message: "Invalid pagination parameters" });
      }

      // Lấy danh sách bài học với phân trang, đảm bảo đầy đủ thông tin chi tiết
      const lessons = await Lesson.find({ course: courseId })
        .populate({
          path: "course", // Populate thông tin khóa học
          select: "title description price", // Chỉ chọn các trường cần thiết
        })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .lean(); // Sử dụng .lean() để trả về object thuần

      // Lấy tổng số lượng bài học cho metadata phân trang
      const totalLessons = await Lesson.countDocuments({ course: courseId });
      const totalPages = Math.ceil(totalLessons / pageSize);

      return reply.status(200).send({
        lessons, // Danh sách bài học với thông tin chi tiết
        pagination: {
          totalLessons,
          totalPages,
          currentPage: pageNumber,
          pageSize,
        },
      });
    } catch (error) {
      console.error("Error fetching lessons by course ID:", error);
      return reply
        .status(500)
        .send({ message: "Error fetching lessons", error: error.message });
    }
  },

  // Update a lesson by ID
  updateLessonById: async (request, reply) => {
    try {
      const { id } = request.params;
      const { title, content, course } = request.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid lesson ID" });
      }

      const updatedLesson = await Lesson.findByIdAndUpdate(
        id,
        {
          title,
          content,
          course,
          updatedAt: Date.now(),
        },
        { new: true, runValidators: true }
      );

      if (!updatedLesson) {
        return reply.status(404).send({ message: "Lesson not found" });
      }

      return reply.status(200).send({
        message: "Lesson updated successfully",
        lesson: updatedLesson,
      });
    } catch (error) {
      console.error("Error updating lesson:", error);
      return reply
        .status(500)
        .send({ message: "Error updating lesson", error: error.message });
    }
  },

  // Delete a lesson by ID
  deleteLessonById: async (request, reply) => {
    try {
      const { id } = request.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid lesson ID" });
      }

      const deletedLesson = await Lesson.findByIdAndDelete(id);

      if (!deletedLesson) {
        return reply.status(404).send({ message: "Lesson not found" });
      }

      return reply.status(200).send({ message: "Lesson deleted successfully" });
    } catch (error) {
      console.error("Error deleting lesson:", error);
      return reply
        .status(500)
        .send({ message: "Error deleting lesson", error: error.message });
    }
  },
};
