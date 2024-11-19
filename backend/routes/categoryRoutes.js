import { categoryController } from "../controllers/categoryController.js";
import { middlewaresController } from "../middlewares/middlewaresController.js";

async function categoryRoutes(fastify, options) {
  fastify.get("/categories", { handler: categoryController.getAllCategories });

  fastify.post("/categories", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: categoryController.createCategory,
  });

  fastify.put("/categories/:id", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: categoryController.updateCategoryById,
  });

  fastify.delete("/categories/:id", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: categoryController.deleteCategoryById,
  });
}

export default categoryRoutes;
