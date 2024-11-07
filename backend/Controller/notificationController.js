import { Notification } from "../models/notification.js";
import mongoose from "mongoose";

export const notificationController = {
  // Create a new notification
  createNotification: async (request, reply) => {
    try {
      const { user, message } = request.body;

      // Ensure the user exists in the database
      if (!mongoose.Types.ObjectId.isValid(user)) {
        return reply.status(400).send({ message: "Invalid user ID" });
      }

      const newNotification = new Notification({
        user,
        message,
      });

      await newNotification.save();

      return reply.status(201).send({
        message: "Notification created successfully",
        notification: newNotification,
      });
    } catch (error) {
      console.error("Error creating notification:", error);
      return reply
        .status(500)
        .send({ message: "Error creating notification", error: error.message });
    }
  },

  // Get all notifications for a user
  getNotificationsByUserId: async (request, reply) => {
    try {
      const { userId } = request.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return reply.status(400).send({ message: "Invalid user ID" });
      }

      const notifications = await Notification.find({ user: userId }).populate(
        "user"
      );

      return reply.status(200).send(notifications);
    } catch (error) {
      console.error("Error fetching notifications by user ID:", error);
      return reply
        .status(500)
        .send({
          message: "Error fetching notifications",
          error: error.message,
        });
    }
  },

  // Get a specific notification by ID
  getNotificationById: async (request, reply) => {
    try {
      const { id } = request.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid notification ID" });
      }

      const notification = await Notification.findById(id).populate("user");

      if (!notification) {
        return reply.status(404).send({ message: "Notification not found" });
      }

      return reply.status(200).send(notification);
    } catch (error) {
      console.error("Error fetching notification by ID:", error);
      return reply
        .status(500)
        .send({ message: "Error fetching notification", error: error.message });
    }
  },

  // Mark notification as seen
  markAsSeen: async (request, reply) => {
    try {
      const { id } = request.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid notification ID" });
      }

      const updatedNotification = await Notification.findByIdAndUpdate(
        id,
        { seen: true, updatedAt: Date.now() },
        { new: true }
      );

      if (!updatedNotification) {
        return reply.status(404).send({ message: "Notification not found" });
      }

      return reply.status(200).send({
        message: "Notification marked as seen",
        notification: updatedNotification,
      });
    } catch (error) {
      console.error("Error marking notification as seen:", error);
      return reply
        .status(500)
        .send({
          message: "Error marking notification as seen",
          error: error.message,
        });
    }
  },

  // Delete a notification by ID
  deleteNotificationById: async (request, reply) => {
    try {
      const { id } = request.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid notification ID" });
      }

      const deletedNotification = await Notification.findByIdAndDelete(id);

      if (!deletedNotification) {
        return reply.status(404).send({ message: "Notification not found" });
      }

      return reply
        .status(200)
        .send({ message: "Notification deleted successfully" });
    } catch (error) {
      console.error("Error deleting notification:", error);
      return reply
        .status(500)
        .send({ message: "Error deleting notification", error: error.message });
    }
  },
};
