import { orderController } from "../controllers/oderController.js";
import { middlewaresController } from "../middlewares/middlewaresController.js";

async function orderRoutes(fastify, options) {
  fastify.get("/orders/self", {
    preHandler: middlewaresController.verifyUserToken,
    handler: orderController.getSelfOrders,
  });

  fastify.put("/orders/self/:orderId", {
    preHandler: middlewaresController.verifyUserToken,
    handler: orderController.modifySelfOrder,
  });
}

export default orderRoutes;
