import { shoppingCartController } from "../controllers/shoppingCartController.js";
import { middlewaresController } from "../middlewares/middlewaresController.js";

async function shoppingCartRoutes(fastify, options) {
  fastify.get("/shoppingCart", {
    preHandler: middlewaresController.verifyUserToken,
    handler: shoppingCartController.getCartByUserId,
  });

  fastify.put("/shoppingCart", {
    preHandler: middlewaresController.verifyUserToken,
    handler: shoppingCartController.createOrUpdateCart,
  });
}

export default shoppingCartRoutes;
