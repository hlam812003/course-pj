import { orderController } from "../controllers/oderController.js";
import { middlewaresController } from "../middlewares/middlewaresController.js";

async function orderRoutes(fastify, options) {
  fastify.get("/orders/user/:userId", {
    preHandler: middlewaresController.verifyUserToken,
    handler: orderController.getOrdersByUserId,
  });
  fastify.get("/orders/:orderId", {
    preHandler: middlewaresController.verifyUserToken,
    handler: orderController.getOrderById,
  });
  fastify.put("/orders/:orderId", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: orderController.updatePaymentStatus,
  });
  fastify.post("/orders/user/:userId", {
    preHandler: middlewaresController.verifyUserToken,
    handler: orderController.createOrder,
  });
  fastify.delete("/orders/:orderId", {
    preHandler: middlewaresController.verifyUserToken,
    handler: orderController.deleteOrderById,
  });
}

export default orderRoutes;
