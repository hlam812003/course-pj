import { couponController } from "../controllers/couponController.js";
import { middlewaresController } from "../middlewares/middlewaresController.js";

async function couponRoutes(fastify, options) {
  fastify.get("/coupons/:id", { handler: couponController.getCouponById });

  fastify.get("/coupons", {
    handler: couponController.getAllCoupons,
  });

  fastify.post("/coupons", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: couponController.createCoupon,
  });

  fastify.put("/coupons/:id", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: couponController.updateCouponById,
  });

  fastify.delete("/coupons/:id", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: couponController.deleteCouponById,
  });
}

export default couponRoutes;
