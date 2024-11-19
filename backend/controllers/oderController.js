import { Order } from "../models/order.js";
import mongoose from "mongoose";

export const orderController = {
  // Create a new order
  createOrder: async (request, reply) => {
    try {
      const { user, courses, totalAmount } = request.body;

      // Validate user and courses IDs
      if (!mongoose.Types.ObjectId.isValid(user)) {
        return reply.status(400).send({ message: "Invalid user ID" });
      }

      const invalidCourses = courses.filter(
        (courseId) => !mongoose.Types.ObjectId.isValid(courseId)
      );
      if (invalidCourses.length > 0) {
        return reply.status(400).send({ message: "Invalid course ID(s)" });
      }

      const newOrder = new Order({
        user,
        courses,
        totalAmount,
        paymentStatus: "Pending", // Default payment status
      });

      await newOrder.save();

      return reply.status(201).send({
        message: "Order created successfully",
        order: newOrder,
      });
    } catch (error) {
      console.error("Error creating order:", error);
      return reply
        .status(500)
        .send({ message: "Error creating order", error: error.message });
    }
  },

  // Get an order by ID
  getOrderById: async (request, reply) => {
    try {
      const { id } = request.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid order ID" });
      }

      const order = await Order.findById(id).populate("user courses");

      if (!order) {
        return reply.status(404).send({ message: "Order not found" });
      }

      return reply.status(200).send(order);
    } catch (error) {
      console.error("Error fetching order by ID:", error);
      return reply
        .status(500)
        .send({ message: "Error fetching order", error: error.message });
    }
  },

  // Get all orders for a user
  getOrdersByUserId: async (request, reply) => {
    try {
      const { userId } = request.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return reply.status(400).send({ message: "Invalid user ID" });
      }

      const orders = await Order.find({ user: userId }).populate(
        "user courses"
      );

      return reply.status(200).send(orders);
    } catch (error) {
      console.error("Error fetching orders by user ID:", error);
      return reply
        .status(500)
        .send({ message: "Error fetching orders", error: error.message });
    }
  },

  // Update the payment status of an order
  updatePaymentStatus: async (request, reply) => {
    try {
      const { id } = request.params;
      const { paymentStatus } = request.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid order ID" });
      }

      if (!["Pending", "Completed", "Failed"].includes(paymentStatus)) {
        return reply.status(400).send({ message: "Invalid payment status" });
      }

      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { paymentStatus, updatedAt: Date.now() },
        { new: true }
      );

      if (!updatedOrder) {
        return reply.status(404).send({ message: "Order not found" });
      }

      return reply.status(200).send({
        message: "Payment status updated successfully",
        order: updatedOrder,
      });
    } catch (error) {
      console.error("Error updating payment status:", error);
      return reply
        .status(500)
        .send({
          message: "Error updating payment status",
          error: error.message,
        });
    }
  },

  // Delete an order by ID
  deleteOrderById: async (request, reply) => {
    try {
      const { id } = request.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid order ID" });
      }

      const deletedOrder = await Order.findByIdAndDelete(id);

      if (!deletedOrder) {
        return reply.status(404).send({ message: "Order not found" });
      }

      return reply.status(200).send({ message: "Order deleted successfully" });
    } catch (error) {
      console.error("Error deleting order:", error);
      return reply
        .status(500)
        .send({ message: "Error deleting order", error: error.message });
    }
  },
};
