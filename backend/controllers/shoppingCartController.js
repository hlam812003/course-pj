import { shoppingCart } from "../models/shoppingCart.js";
import mongoose from "mongoose";

export const shoppingCartController = {
  addCourseToCart: async (request, reply) => {
    try {
      const { courseId } = request.params; // Chỉ nhận courseId từ params
      const userId = request.user.id; // Lấy userId từ request.user (JWT middleware)

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return reply.status(400).send({ message: "Invalid user ID" });
      }

      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return reply.status(400).send({ message: "Invalid course ID" });
      }

      const courseDetails = await Course.findById(courseId);
      if (!courseDetails) {
        return reply.status(404).send({ message: "Course not found" });
      }

      // Tìm giỏ hàng của người dùng
      let cart = await shoppingCart.findOne({ user: userId });

      if (cart) {
        // Kiểm tra khóa học đã tồn tại chưa
        const existingCourse = cart.courses.find((item) =>
          item.course.equals(courseId)
        );

        if (existingCourse) {
          existingCourse.quantity += 1; // Tăng số lượng
        } else {
          cart.courses.push({ course: courseId, quantity: 1 }); // Thêm khóa học mới
        }

        // Tính lại tổng tiền
        let totalAmount = 0;
        for (const { course, quantity } of cart.courses) {
          const courseInfo = await Course.findById(course);
          totalAmount += courseInfo.price * quantity;
        }
        cart.totalAmount = totalAmount;
        cart.updatedAt = Date.now();

        await cart.save();
        return reply.status(200).send({
          message: "Course added to cart successfully",
          cart,
        });
      } else {
        // Tạo giỏ hàng mới nếu chưa tồn tại
        cart = new shoppingCart({
          user: userId,
          courses: [{ course: courseId, quantity: 1 }],
          totalAmount: courseDetails.price,
        });

        await cart.save();
        return reply.status(201).send({
          message: "New cart created with the course",
          cart,
        });
      }
    } catch (error) {
      console.error("Error adding course to cart:", error);
      return reply.status(500).send({
        message: "Error adding course to cart",
        error: error.message,
      });
    }
  },

  // Create a new shopping cart or update an existing one
  createOrUpdateCart: async (request, reply) => {
    try {
      const { user, courses } = request.body;

      if (!mongoose.Types.ObjectId.isValid(user)) {
        return reply.status(400).send({ message: "Invalid user ID" });
      }

      // Calculate total amount and create an array of course objects
      const updatedCourses = [];
      let totalAmount = 0;

      for (const { course, quantity } of courses) {
        if (!mongoose.Types.ObjectId.isValid(course)) {
          return reply.status(400).send({ message: "Invalid course ID" });
        }
        updatedCourses.push({ course, quantity });

        // Assume each course has a price field (can be modified to fetch from course model)
        const courseDetails = await Course.findById(course);
        if (!courseDetails) {
          return reply.status(404).send({ message: "Course not found" });
        }

        totalAmount += courseDetails.price * quantity;
      }

      // Check if cart exists, if yes, update it
      let cart = await shoppingCart.findOne({ user });

      if (cart) {
        // Update existing cart
        cart.courses = updatedCourses;
        cart.totalAmount = totalAmount;
        cart.updatedAt = Date.now();
        await cart.save();

        return reply
          .status(200)
          .send({ message: "Cart updated successfully", cart });
      } else {
        // Create new cart
        cart = new shoppingCart({
          user,
          courses: updatedCourses,
          totalAmount,
        });

        await cart.save();

        return reply
          .status(201)
          .send({ message: "Cart created successfully", cart });
      }
    } catch (error) {
      console.error("Error creating/updating cart:", error);
      return reply.status(500).send({
        message: "Error creating/updating cart",
        error: error.message,
      });
    }
  },

  // Get a shopping cart by user ID
  getCartByUserId: async (request, reply) => {
    try {
      const { userId } = request.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return reply.status(400).send({ message: "Invalid user ID" });
      }

      const cart = await shoppingCart
        .findOne({ user: userId })
        .populate("courses.course");

      if (!cart) {
        return reply.status(404).send({ message: "Cart not found" });
      }

      return reply.status(200).send(cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
      return reply
        .status(500)
        .send({ message: "Error fetching cart", error: error.message });
    }
  },

  // Remove a course from the shopping cart
  removeCourseFromCart: async (request, reply) => {
    try {
      const { userId, courseId } = request.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return reply.status(400).send({ message: "Invalid user ID" });
      }

      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return reply.status(400).send({ message: "Invalid course ID" });
      }

      const cart = await shoppingCart.findOne({ user: userId });

      if (!cart) {
        return reply.status(404).send({ message: "Cart not found" });
      }

      // Remove the course from the cart
      cart.courses = cart.courses.filter(
        (item) => !item.course.equals(courseId)
      );

      // Recalculate total amount
      let totalAmount = 0;
      for (const { course, quantity } of cart.courses) {
        const courseDetails = await Course.findById(course);
        totalAmount += courseDetails.price * quantity;
      }

      cart.totalAmount = totalAmount;
      cart.updatedAt = Date.now();

      await cart.save();

      return reply
        .status(200)
        .send({ message: "Course removed from cart", cart });
    } catch (error) {
      console.error("Error removing course from cart:", error);
      return reply.status(500).send({
        message: "Error removing course from cart",
        error: error.message,
      });
    }
  },

  // Clear all courses in the shopping cart
  clearCart: async (request, reply) => {
    try {
      const { userId } = request.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return reply.status(400).send({ message: "Invalid user ID" });
      }

      const cart = await shoppingCart.findOne({ user: userId });

      if (!cart) {
        return reply.status(404).send({ message: "Cart not found" });
      }

      // Clear all courses and reset total amount
      cart.courses = [];
      cart.totalAmount = 0;
      cart.updatedAt = Date.now();

      await cart.save();

      return reply.status(200).send({ message: "Cart cleared", cart });
    } catch (error) {
      console.error("Error clearing cart:", error);
      return reply
        .status(500)
        .send({ message: "Error clearing cart", error: error.message });
    }
  },
};
