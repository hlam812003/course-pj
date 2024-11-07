import { Review } from "../models/review.js";
import mongoose from "mongoose";

export const reviewController = {
  // Create a new review
  createReview: async (request, reply) => {
    try {
      const { user, course, rating, comment } = request.body;

      // Validate user and course IDs
      if (!mongoose.Types.ObjectId.isValid(user)) {
        return reply.status(400).send({ message: "Invalid user ID" });
      }

      if (!mongoose.Types.ObjectId.isValid(course)) {
        return reply.status(400).send({ message: "Invalid course ID" });
      }

      const newReview = new Review({
        user,
        course,
        rating,
        comment,
      });

      await newReview.save();

      return reply.status(201).send({
        message: "Review created successfully",
        review: newReview,
      });
    } catch (error) {
      console.error("Error creating review:", error);
      return reply
        .status(500)
        .send({ message: "Error creating review", error: error.message });
    }
  },

  // Get reviews for a course
  getReviewsByCourseId: async (request, reply) => {
    try {
      const { courseId } = request.params;

      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return reply.status(400).send({ message: "Invalid course ID" });
      }

      const reviews = await Review.find({ course: courseId })
        .populate("user")
        .sort({ createdAt: -1 }); // Sort reviews by creation date (most recent first)

      return reply.status(200).send(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return reply
        .status(500)
        .send({ message: "Error fetching reviews", error: error.message });
    }
  },

  // Get a review by ID
  getReviewById: async (request, reply) => {
    try {
      const { id } = request.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid review ID" });
      }

      const review = await Review.findById(id).populate("user course");

      if (!review) {
        return reply.status(404).send({ message: "Review not found" });
      }

      return reply.status(200).send(review);
    } catch (error) {
      console.error("Error fetching review by ID:", error);
      return reply
        .status(500)
        .send({ message: "Error fetching review", error: error.message });
    }
  },

  // Update a review by ID
  updateReviewById: async (request, reply) => {
    try {
      const { id } = request.params;
      const { rating, comment } = request.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid review ID" });
      }

      const updatedReview = await Review.findByIdAndUpdate(
        id,
        { rating, comment, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );

      if (!updatedReview) {
        return reply.status(404).send({ message: "Review not found" });
      }

      return reply.status(200).send({
        message: "Review updated successfully",
        review: updatedReview,
      });
    } catch (error) {
      console.error("Error updating review:", error);
      return reply
        .status(500)
        .send({ message: "Error updating review", error: error.message });
    }
  },

  // Delete a review by ID
  deleteReviewById: async (request, reply) => {
    try {
      const { id } = request.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid review ID" });
      }

      const deletedReview = await Review.findByIdAndDelete(id);

      if (!deletedReview) {
        return reply.status(404).send({ message: "Review not found" });
      }

      return reply.status(200).send({ message: "Review deleted successfully" });
    } catch (error) {
      console.error("Error deleting review:", error);
      return reply
        .status(500)
        .send({ message: "Error deleting review", error: error.message });
    }
  },
};
