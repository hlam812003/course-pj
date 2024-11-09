import { categoryController } from "../controllers/categoryController.js";

async function categoryRoutes(fastify, options) {
  fastify.get("/categories", { handler: categoryController.getAllCategories });

  fastify.post("/categories", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: categoryController.createCategory,
  });

  fastify.put("/categories/:id", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: categoryController.updateCategory,
  });

  fastify.delete("/categories/:id", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: categoryController.deleteCategory,
  });
}

export default categoryRoutes;
