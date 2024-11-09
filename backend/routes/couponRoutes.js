import { couponController } from "../controllers/couponController.js";

async function couponRoutes(fastify, options) {
  fastify.get("/coupons/:id", { handler: couponController.getCouponById });

  fastify.get("/coupons", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: couponController.getAllCoupons,
  });

  fastify.post("/coupons", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: couponController.createCoupon,
  });

  fastify.put("/coupons/:id", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: couponController.updateCoupon,
  });

  fastify.delete("/coupons/:id", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: couponController.deleteCoupon,
  });
}

export default couponRoutes;
