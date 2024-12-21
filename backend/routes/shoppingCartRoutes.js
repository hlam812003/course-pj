import { shoppingCartController } from "../controllers/shoppingCartController.js";
import { middlewaresController } from "../middlewares/middlewaresController.js";

async function shoppingCartRoutes(fastify, options) {
  fastify.get("/shoppingCart", {
    preHandler: middlewaresController.verifyUserToken,
    handler: shoppingCartController.getCartByUserId,
  });
  fastify.post("/shoppingCart/cousre/:courseId", {
    preHandler: middlewaresController.verifyUserToken,
    handler: shoppingCartController.addCourseToCart,
  });

  fastify.put("/shoppingCart", {
    preHandler: middlewaresController.verifyUserToken,
    handler: shoppingCartController.createOrUpdateCart,
  });
}

export default shoppingCartRoutes;
