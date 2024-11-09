import { cartController } from "../controllers/cartController.js";

async function cartRoutes(fastify, options) {
  fastify.get("/cart", {
    preHandler: middlewaresController.verifyUserToken,
    handler: cartController.getCart,
  });

  fastify.put("/cart", {
    preHandler: middlewaresController.verifyUserToken,
    handler: cartController.modifyCart,
  });
}

export default cartRoutes;
