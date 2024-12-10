import { Progress } from "../models/progress.js";
import mongoose from "mongoose";

export const progressController = {
  // Initialize progress for a user in a course
  initializeProgress: async (request, reply) => {
    try {
      const { user, course } = request.body;

      // Validate user and course IDs
      if (!mongoose.Types.ObjectId.isValid(user)) {
        return reply.status(400).send({ message: "Invalid user ID" });
      }

      if (!mongoose.Types.ObjectId.isValid(course)) {
        return reply.status(400).send({ message: "Invalid course ID" });
      }

      const existingProgress = await Progress.findOne({ user, course });

      if (existingProgress) {
        return reply
          .status(400)
          .send({ message: "Progress already initialized" });
      }

      const newProgress = new Progress({
        user,
        course,
        completedLessons: [],
        progressPercentage: 0,
      });

      await newProgress.save();

      return reply.status(201).send({
        message: "Progress initialized successfully",
        progress: newProgress,
      });
    } catch (error) {
      console.error("Error initializing progress:", error);
      return reply
        .status(500)
        .send({ message: "Error initializing progress", error: error.message });
    }
  },

  // Update progress when a user completes a lesson
  updateProgress: async (request, reply) => {
    try {
      const { user, course, lessonId } = request.body;

      // Validate user, course, and lesson IDs
      if (!mongoose.Types.ObjectId.isValid(user)) {
        return reply.status(400).send({ message: "Invalid user ID" });
      }

      if (!mongoose.Types.ObjectId.isValid(course)) {
        return reply.status(400).send({ message: "Invalid course ID" });
      }

      if (!mongoose.Types.ObjectId.isValid(lessonId)) {
        return reply.status(400).send({ message: "Invalid lesson ID" });
      }

      let progress = await Progress.findOne({ user, course });

      // If progress does not exist, initialize it
      if (!progress) {
        const initializeResponse = await progressController.initializeProgress(
          {
            body: { user, course },
          },
          reply
        );

        if (initializeResponse.statusCode !== 201) {
          return; // Stop execution if initialization fails
        }

        progress = initializeResponse.data.progress; // Extract the initialized progress
      }

      // Check if the lesson is already marked as completed
      if (progress.completedLessons.includes(lessonId)) {
        return reply.status(400).send({ message: "Lesson already completed" });
      }

      // Add lesson to completedLessons
      progress.completedLessons.push(lessonId);

      // Calculate progress percentage (based on total number of lessons in the course)
      const courseData = await Course.findById(course).populate("lessons");
      if (!courseData || !courseData.lessons.length) {
        return reply
          .status(400)
          .send({ message: "Course or lessons not found" });
      }

      const progressPercentage =
        (progress.completedLessons.length / courseData.lessons.length) * 100;
      progress.progressPercentage = Math.min(progressPercentage, 100); // Ensure progress doesn't exceed 100%

      // Update the last accessed date
      progress.lastAccessedAt = Date.now();

      await progress.save();

      return reply.status(200).send({
        message: "Progress updated successfully",
        progress: progress,
      });
    } catch (error) {
      console.error("Error updating progress:", error);
      return reply
        .status(500)
        .send({ message: "Error updating progress", error: error.message });
    }
  },

  // Get progress by user and course ID
  getProgressByUserAndCourse: async (request, reply) => {
    try {
      const { userId, courseId } = request.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return reply.status(400).send({ message: "Invalid user ID" });
      }

      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return reply.status(400).send({ message: "Invalid course ID" });
      }

      const progress = await Progress.findOne({
        user: userId,
        course: courseId,
      }).populate("completedLessons");

      if (!progress) {
        return reply.status(404).send({ message: "Progress not found" });
      }

      return reply.status(200).send(progress);
    } catch (error) {
      console.error("Error fetching progress:", error);
      return reply
        .status(500)
        .send({ message: "Error fetching progress", error: error.message });
    }
  },

  // Get all progress records for a specific user
  getAllProgressByUser: async (request, reply) => {
    try {
      const { userId } = request.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return reply.status(400).send({ message: "Invalid user ID" });
      }

      const progress = await Progress.find({ user: userId }).populate(
        "course completedLessons"
      );

      return reply.status(200).send(progress);
    } catch (error) {
      console.error("Error fetching all progress by user:", error);
      return reply
        .status(500)
        .send({ message: "Error fetching progress", error: error.message });
    }
  },
};
