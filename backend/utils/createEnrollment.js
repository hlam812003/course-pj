import { Enrollment } from "../models/enrollment.js";
import { Course } from "../models/course.js";
import { Review } from "../models/review.js";
import { User } from "../models/user.js"; // Assuming you have a User model
import mongoose from "mongoose";

// Helper function to generate random enrollments and create reviews
export default async function generateRandomEnrollments(numEnrollments) {
  try {
    // Get all user IDs
    const users = await User.find(); // Assuming you have a User model

    // Ensure we have users and courses to create enrollments
    if (users.length === 0) {
      throw new Error("No users available for enrollment.");
    }

    // Generate random enrollments
    const enrollments = [];
    for (let i = 0; i < numEnrollments; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];

      // Get a random course from the Course collection
      const randomCourse = await Course.aggregate([
        { $sample: { size: 1 } }, // Randomly selects 1 document
      ]);

      if (randomCourse.length === 0) {
        throw new Error("No courses found in the database.");
      }

      // Create a new enrollment
      const newEnrollment = new Enrollment({
        user: randomUser._id,
        course: randomCourse[0]._id, // The first course from the result
      });

      // Save the enrollment
      await newEnrollment.save();
      enrollments.push(newEnrollment);

      // Create a review after enrolling
      const newReview = new Review({
        user: randomUser._id,
        course: randomCourse[0]._id,
        rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
        comment: "This is a review for the course.", // You can customize the comment
      });

      // Save the review
      await newReview.save();
      console.log(
        `Review created for user ${randomUser._id} on course ${randomCourse[0]._id}`
      );
    }

    console.log(
      `${numEnrollments} random enrollments and reviews created successfully.`
    );
  } catch (error) {
    console.error("Error generating random enrollments and reviews:", error);
  }
}
