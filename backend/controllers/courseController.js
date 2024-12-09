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
    try {
      const { id } = request.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid course ID" });
      }

      const course = await Course.findById(id).populate(
        "instructor category lessons reviews"
      );

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
      const courses = await Course.find().populate("instructor category");

      return reply.status(200).send(courses);
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
};
