import { shoppingCart } from "../models/shoppingCart.js";
import { Course } from "../models/course.js";
import mongoose from "mongoose";

export const shoppingCartController = {
  addCourseToCart: async (request, reply) => {
    try {
      const { courseId } = request.params;
      const userId = request.user.payload.id;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        reply.status(400).send({ message: "Invalid user ID" });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        reply.status(400).send({ message: "Invalid course ID" });
        return;
      }

      const courseDetails = await Course.findById(courseId);
      if (!courseDetails) {
        reply.status(404).send({ message: "Course not found" });
        return;
      }

      // Tìm giỏ hàng của người dùng
      let cart = await shoppingCart.findOne({ user: userId })
        .populate('courses.course', '_id'); // Chỉ populate _id để kiểm tra

      if (cart) {
        // Kiểm tra khóa học đã tồn tại chưa bằng cách so sánh string
        const existingCourse = cart.courses.find(
          (item) => item.course._id.toString() === courseId
        );

        if (existingCourse) {
          reply.status(400).send({ 
            message: "This course is already in your cart"
          });
          return;
        }

        cart.courses.push({ course: courseId, quantity: 1 });
        
        // Tính lại tổng tiền
        let totalAmount = 0;
        for (const { course, quantity } of cart.courses) {
          const courseInfo = await Course.findById(course);
          if (courseInfo) {
            totalAmount += courseInfo.price * quantity;
          }
        }
        
        cart.totalAmount = totalAmount;
        cart.updatedAt = Date.now();

        await cart.save();
        
        // Populate đầy đủ thông tin course trước khi trả về
        await cart.populate({
          path: "courses.course",
          select: "title price description imageUrl"
        });

        reply.status(200).send({
          message: "Course added to cart successfully",
          cart,
        });
        return;
      } else {
        // Tạo giỏ hàng mới nếu chưa tồn tại
        cart = new shoppingCart({
          user: userId,
          courses: [{ course: courseId, quantity: 1 }],
          totalAmount: courseDetails.price,
        });

        await cart.save();
        await cart.populate({
          path: "courses.course",
          select: "title price description imageUrl"
        });

        reply.status(201).send({
          message: "New cart created with the course",
          cart,
        });
        return;
      }
    } catch (error) {
      console.error("Error adding course to cart:", error);
      reply.status(500).send({
        message: "Error adding course to cart",
        error: error.message,
      });
      return;
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
        reply.status(400).send({ message: "Invalid user ID" });
        return;
      }

      const cart = await shoppingCart
        .findOne({ user: userId })
        .populate({
          path: "courses.course",
          select: "title price description imageUrl"
        });

      if (!cart) {
        reply.status(404).send({ message: "Cart not found" });
        return;
      }

      reply.status(200).send(cart);
      return;
    } catch (error) {
      console.error("Error fetching cart:", error);
      reply.status(500).send({ 
        message: "Error fetching cart", 
        error: error.message 
      });
      return;
    }
  },

  // Remove a course from the shopping cart
  removeCourseFromCart: async (request, reply) => {
    try {
      const { courseId } = request.params;
      const userId = request.user.payload.id; // Lấy userId từ token

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        reply.status(400).send({ message: "Invalid user ID" });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        reply.status(400).send({ message: "Invalid course ID" });
        return;
      }

      const cart = await shoppingCart.findOne({ user: userId });

      if (!cart) {
        reply.status(404).send({ message: "Cart not found" });
        return;
      }

      // Remove the course from the cart
      cart.courses = cart.courses.filter(
        (item) => !item.course.equals(courseId)
      );

      // Recalculate total amount
      let totalAmount = 0;
      for (const { course, quantity } of cart.courses) {
        const courseDetails = await Course.findById(course);
        if (courseDetails) {
          totalAmount += courseDetails.price * quantity;
        }
      }

      cart.totalAmount = totalAmount;
      cart.updatedAt = Date.now();

      await cart.save();

      // Populate course details before sending response
      await cart.populate({
        path: "courses.course",
        select: "title price description imageUrl"
      });

      reply.status(200).send({ 
        message: "Course removed from cart", 
        cart 
      });
      return;
    } catch (error) {
      console.error("Error removing course from cart:", error);
      reply.status(500).send({
        message: "Error removing course from cart",
        error: error.message,
      });
      return;
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
