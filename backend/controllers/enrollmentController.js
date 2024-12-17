import { Enrollment } from "../models/enrollment.js";
import mongoose from "mongoose";

export const enrollmentController = {
  // Enroll a user in a course
  enrollInCourse: async (request, reply) => {
    try {
      const { user, course } = request.body;

      // Validate user and course IDs
      if (!mongoose.Types.ObjectId.isValid(user)) {
        return reply.status(400).send({ message: "Invalid user ID" });
      }

      if (!mongoose.Types.ObjectId.isValid(course)) {
        return reply.status(400).send({ message: "Invalid course ID" });
      }

      // Check if the user is already enrolled in the course
      const existingEnrollment = await Enrollment.findOne({ user, course });
      if (existingEnrollment) {
        return reply
          .status(400)
          .send({ message: "User is already enrolled in this course" });
      }

      const newEnrollment = new Enrollment({
        user,
        course,
      });

      await newEnrollment.save();

      return reply.status(201).send({
        message: "User enrolled in the course successfully",
        enrollment: newEnrollment,
      });
    } catch (error) {
      console.error("Error enrolling user:", error);
      return reply
        .status(500)
        .send({ message: "Error enrolling user", error: error.message });
    }
  },

  // Get all enrollments for a specific user
  getEnrollmentsByUserId: async (request, reply) => {
    try {
      const { userId } = request.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return reply.status(400).send({ message: "Invalid user ID" });
      }

      const enrollments = await Enrollment.find({ user: userId }).populate(
        "course"
      );

      return reply.status(200).send(enrollments);
    } catch (error) {
      console.error("Error fetching enrollments by user ID:", error);
      return reply
        .status(500)
        .send({ message: "Error fetching enrollments", error: error.message });
    }
  },

  // Get all enrollments for a specific course
  getEnrollmentsByCourseId: async (request, reply) => {
    try {
      const { courseId } = request.params;

      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return reply.status(400).send({ message: "Invalid course ID" });
      }

      const enrollments = await Enrollment.find({ course: courseId }).populate(
        "user"
      );

      return reply.status(200).send(enrollments);
    } catch (error) {
      console.error("Error fetching enrollments by course ID:", error);
      return reply
        .status(500)
        .send({ message: "Error fetching enrollments", error: error.message });
    }
  },

  // Cancel an enrollment (remove user from course)
  cancelEnrollment: async (request, reply) => {
    try {
      const { id } = request.params;

      await Enrollment.findByIdAndDelete(id);

      return reply
        .status(200)
        .send({ message: "Enrollment canceled successfully" });
    } catch (error) {
      console.error("Error canceling enrollment:", error);
      return reply
        .status(500)
        .send({ message: "Error canceling enrollment", error: error.message });
    }
  },
};
