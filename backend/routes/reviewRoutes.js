import { reviewController } from "../controllers/reviewController.js";
import { middlewaresController } from "../middlewares/middlewaresController.js";

async function reviewRoutes(fastify, options) {
  fastify.put("/reviews/:id", {
    preHandler: middlewaresController.verifyUserToken,
    handler: reviewController.modifyReview,
  });
}

export default reviewRoutes;
