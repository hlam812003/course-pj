import { Course } from "../models/course.js";
import mongoose from "mongoose";

export const courseController = {
  // Create a new course
  createCourse: async (request, reply) => {
    try {
      const {
        title,
        description,
        price,
        instructor,
        category,
        level,
        status,
        thumbnail,
        lessons,
        reviews,
      } = request.body;

      const newCourse = new Course({
        title,
        description,
        price,
        instructor,
        category,
        level,
        status: status || "Draft",
        thumbnail,
        lessons,
        reviews,
      });

      await newCourse.save();

      return reply.status(201).send({
        message: "Course created successfully",
        course: newCourse,
      });
    } catch (error) {
      console.error("Error creating course:", error);
      return reply
        .status(500)
        .send({ message: "Error creating course", error: error.message });
    }
  },

  // Get a course by ID
  getCourseById: async (request, reply) => {
    console.log(request.params);
    try {
      const { id } = request.params;

      const course = await Course.findById(id);

      if (!course) {
        return reply.status(404).send({ message: "Course not found" });
      }

      return reply.status(200).send(course);
    } catch (error) {
      console.error("Error fetching course by ID:", error);
      return reply
        .status(500)
        .send({ message: "Error fetching course", error: error.message });
    }
  },

  // Get all courses
  getAllCourses: async (request, reply) => {
    try {
      // Lấy query parameters từ request
      const page = parseInt(request.query.page) || 1; // Mặc định là trang 1
      const limit = parseInt(request.query.limit) || 10; // Số lượng courses mỗi trang, mặc định là 10

      // Tính toán số lượng cần bỏ qua
      const skip = (page - 1) * limit;

      // Tìm courses với phân trang
      const courses = await Course.find()
        .populate("instructor category")
        .skip(skip)
        .limit(limit);

      // Tổng số courses
      const totalCourses = await Course.countDocuments();

      // Trả về kết quả
      return reply.status(200).send({
        currentPage: page,
        totalPages: Math.ceil(totalCourses / limit),
        totalCourses,
        courses,
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
      return reply
        .status(500)
        .send({ message: "Error fetching courses", error: error.message });
    }
  },

  // Update a course by ID
  updateCourseById: async (request, reply) => {
    try {
      const { id } = request.params;
      const {
        title,
        description,
        price,
        instructor,
        category,
        level,
        status,
        thumbnail,
        lessons,
        reviews,
      } = request.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid course ID" });
      }

      const updatedCourse = await Course.findByIdAndUpdate(
        id,
        {
          title,
          description,
          price,
          instructor,
          category,
          level,
          status,
          thumbnail,
          lessons,
          reviews,
          updatedAt: Date.now(),
        },
        { new: true, runValidators: true }
      );

      if (!updatedCourse) {
        return reply.status(404).send({ message: "Course not found" });
      }

      return reply.status(200).send({
        message: "Course updated successfully",
        course: updatedCourse,
      });
    } catch (error) {
      console.error("Error updating course:", error);
      return reply
        .status(500)
        .send({ message: "Error updating course", error: error.message });
    }
  },

  // Delete a course by ID
  deleteCourseById: async (request, reply) => {
    try {
      const { id } = request.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid course ID" });
      }

      const deletedCourse = await Course.findByIdAndDelete(id);

      if (!deletedCourse) {
        return reply.status(404).send({ message: "Course not found" });
      }

      return reply.status(200).send({ message: "Course deleted successfully" });
    } catch (error) {
      console.error("Error deleting course:", error);
      return reply
        .status(500)
        .send({ message: "Error deleting course", error: error.message });
    }
  },
  getCoursesByCategory: async (request, reply) => {
    try {
      // Lấy categoryId từ request parameters
      const { categoryId } = request.params;

      // Lấy query parameters để hỗ trợ phân trang
      const page = parseInt(request.query.page) || 1; // Mặc định là trang 1
      const limit = parseInt(request.query.limit) || 10; // Số lượng courses mỗi trang, mặc định là 10
      const skip = (page - 1) * limit;

      // Tìm các khóa học theo categoryId
      const courses = await Course.find({ category: categoryId })
        .populate("instructor category") // Populate dữ liệu liên quan
        .skip(skip)
        .limit(limit);

      // Đếm tổng số courses trong category này
      const totalCourses = await Course.countDocuments({
        category: categoryId,
      });

      // Trả về kết quả
      return reply.status(200).send({
        currentPage: page,
        totalPages: Math.ceil(totalCourses / limit),
        totalCourses,
        courses,
      });
    } catch (error) {
      console.error("Error fetching courses by category:", error);
      return reply.status(500).send({
        message: "Error fetching courses by category",
        error: error.message,
      });
    }
  },
};
