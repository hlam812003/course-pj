import { Category } from "../models/category.js";
import mongoose from "mongoose";

export const categoryController = {
  // Create a new category
  createCategory: async (request, reply) => {
    try {
      const { name, description } = request.body;

      const newCategory = new Category({ name, description });
      await newCategory.save();

      return reply.status(201).send({
        message: "Category created successfully",
        category: newCategory,
      });
    } catch (error) {
      console.error("Error creating category:", error);
      return reply
        .status(500)
        .send({ message: "Error creating category", error: error.message });
    }
  },

  // Get a category by ID
  getCategoryById: async (request, reply) => {
    try {
      const { id } = request.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid category ID" });
      }

      const category = await Category.findById(id);

      if (!category) {
        return reply.status(404).send({ message: "Category not found" });
      }

      return reply.status(200).send(category);
    } catch (error) {
      console.error("Error fetching category by ID:", error);
      return reply
        .status(500)
        .send({ message: "Error fetching category", error: error.message });
    }
  },

  // Get all categories
  getAllCategories: async (request, reply) => {
    try {
      const categories = await Category.find();

      return reply.status(200).send(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      return reply
        .status(500)
        .send({ message: "Error fetching categories", error: error.message });
    }
  },

  // Update a category by ID
  updateCategoryById: async (request, reply) => {
    try {
      const { id } = request.params;
      const { name, description } = request.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid category ID" });
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name, description },
        { new: true, runValidators: true }
      );

      if (!updatedCategory) {
        return reply.status(404).send({ message: "Category not found" });
      }

      return reply.status(200).send({
        message: "Category updated successfully",
        category: updatedCategory,
      });
    } catch (error) {
      console.error("Error updating category:", error);
      return reply
        .status(500)
        .send({ message: "Error updating category", error: error.message });
    }
  },

  // Delete a category by ID
  deleteCategoryById: async (request, reply) => {
    try {
      const { id } = request.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return reply.status(400).send({ message: "Invalid category ID" });
      }

      const deletedCategory = await Category.findByIdAndDelete(id);

      if (!deletedCategory) {
        return reply.status(404).send({ message: "Category not found" });
      }

      return reply
        .status(200)
        .send({ message: "Category deleted successfully" });
    } catch (error) {
      console.error("Error deleting category:", error);
      return reply
        .status(500)
        .send({ message: "Error deleting category", error: error.message });
    }
  },
};
