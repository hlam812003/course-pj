import { InstructorProfile } from "../models/instructorProfile.js";
import mongoose from "mongoose";

export const instructorProfileController = {
  // Create a new instructor profile
  createInstructorProfile: async (request, reply) => {
    try {
      const { user, bio, expertise, profilePicture, socialLinks } =
        request.body;

      // Ensure the user exists in the database
      if (!mongoose.Types.ObjectId.isValid(user)) {
        return reply.status(400).send({ message: "Invalid user ID" });
      }

      const newProfile = new InstructorProfile({
        user,
        bio,
        expertise,
        profilePicture,
        socialLinks,
      });

      await newProfile.save();

      return reply.status(201).send({
        message: "Instructor profile created successfully",
        profile: newProfile,
      });
    } catch (error) {
      console.error("Error creating instructor profile:", error);
      return reply
        .status(500)
        .send({
          message: "Error creating instructor profile",
          error: error.message,
        });
    }
  },

  // Get an instructor profile by user ID
  getInstructorProfileById: async (request, reply) => {
    try {
      const { id } = request.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid user ID" });
      }

      const profile = await InstructorProfile.findOne({ user: id }).populate(
        "user"
      );

      if (!profile) {
        return reply.status(404).send({ message: "Profile not found" });
      }

      return reply.status(200).send(profile);
    } catch (error) {
      console.error("Error fetching instructor profile by ID:", error);
      return reply
        .status(500)
        .send({
          message: "Error fetching instructor profile",
          error: error.message,
        });
    }
  },

  // Get all instructor profiles
  getAllInstructorProfiles: async (request, reply) => {
    try {
      const profiles = await InstructorProfile.find().populate("user");

      return reply.status(200).send(profiles);
    } catch (error) {
      console.error("Error fetching instructor profiles:", error);
      return reply
        .status(500)
        .send({
          message: "Error fetching instructor profiles",
          error: error.message,
        });
    }
  },

  // Update an instructor profile by user ID
  updateInstructorProfileById: async (request, reply) => {
    try {
      const { id } = request.params;
      const { bio, expertise, profilePicture, socialLinks } = request.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid user ID" });
      }

      const updatedProfile = await InstructorProfile.findOneAndUpdate(
        { user: id },
        { bio, expertise, profilePicture, socialLinks, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );

      if (!updatedProfile) {
        return reply.status(404).send({ message: "Profile not found" });
      }

      return reply.status(200).send({
        message: "Instructor profile updated successfully",
        profile: updatedProfile,
      });
    } catch (error) {
      console.error("Error updating instructor profile:", error);
      return reply
        .status(500)
        .send({
          message: "Error updating instructor profile",
          error: error.message,
        });
    }
  },

  // Delete an instructor profile by user ID
  deleteInstructorProfileById: async (request, reply) => {
    try {
      const { id } = request.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid user ID" });
      }

      const deletedProfile = await InstructorProfile.findOneAndDelete({
        user: id,
      });

      if (!deletedProfile) {
        return reply.status(404).send({ message: "Profile not found" });
      }

      return reply
        .status(200)
        .send({ message: "Instructor profile deleted successfully" });
    } catch (error) {
      console.error("Error deleting instructor profile:", error);
      return reply
        .status(500)
        .send({
          message: "Error deleting instructor profile",
          error: error.message,
        });
    }
  },
};
