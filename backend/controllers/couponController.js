import { Coupon } from "../models/coupon.js";
import mongoose from "mongoose";

export const couponController = {
  // Create a new coupon
  createCoupon: async (request, reply) => {
    try {
      const { code, discountPercentage, course, expirationDate } = request.body;

      const newCoupon = new Coupon({
        code,
        discountPercentage,
        course,
        expirationDate,
      });

      await newCoupon.save();

      return reply.status(201).send({
        message: "Coupon created successfully",
        coupon: newCoupon,
      });
    } catch (error) {
      console.error("Error creating coupon:", error);
      return reply
        .status(500)
        .send({ message: "Error creating coupon", error: error.message });
    }
  },

  // Get a coupon by ID
  getCouponById: async (request, reply) => {
    try {
      const { id } = request.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid coupon ID" });
      }

      const coupon = await Coupon.findById(id).populate("course");

      if (!coupon) {
        return reply.status(404).send({ message: "Coupon not found" });
      }

      return reply.status(200).send(coupon);
    } catch (error) {
      console.error("Error fetching coupon by ID:", error);
      return reply
        .status(500)
        .send({ message: "Error fetching coupon", error: error.message });
    }
  },

  // Get all coupons
  getAllCoupons: async (request, reply) => {
    try {
      const coupons = await Coupon.find().populate("course");

      return reply.status(200).send(coupons);
    } catch (error) {
      console.error("Error fetching coupons:", error);
      return reply
        .status(500)
        .send({ message: "Error fetching coupons", error: error.message });
    }
  },

  // Update a coupon by ID
  updateCouponById: async (request, reply) => {
    try {
      const { id } = request.params;
      const { code, discountPercentage, course, expirationDate } = request.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid coupon ID" });
      }

      const updatedCoupon = await Coupon.findByIdAndUpdate(
        id,
        { code, discountPercentage, course, expirationDate },
        { new: true, runValidators: true }
      );

      if (!updatedCoupon) {
        return reply.status(404).send({ message: "Coupon not found" });
      }

      return reply.status(200).send({
        message: "Coupon updated successfully",
        coupon: updatedCoupon,
      });
    } catch (error) {
      console.error("Error updating coupon:", error);
      return reply
        .status(500)
        .send({ message: "Error updating coupon", error: error.message });
    }
  },

  // Delete a coupon by ID
  deleteCouponById: async (request, reply) => {
    try {
      const { id } = request.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid coupon ID" });
      }

      const deletedCoupon = await Coupon.findByIdAndDelete(id);

      if (!deletedCoupon) {
        return reply.status(404).send({ message: "Coupon not found" });
      }

      return reply.status(200).send({ message: "Coupon deleted successfully" });
    } catch (error) {
      console.error("Error deleting coupon:", error);
      return reply
        .status(500)
        .send({ message: "Error deleting coupon", error: error.message });
    }
  },
};
