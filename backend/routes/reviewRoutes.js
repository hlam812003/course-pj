import { reviewController } from "../controllers/reviewController.js";
import { middlewaresController } from "../middlewares/middlewaresController.js";

async function reviewRoutes(fastify, options) {
  fastify.get("/reviews/course/:courseId", {
    handler: reviewController.getReviewsByCourseId,
  });
  fastify.get("/reviews/:id", {
    preHandler: middlewaresController.verifyUserToken,
    handler: reviewController.getReviewById,
  });
  fastify.post("/reviews/course", {
    preHandler: middlewaresController.verifyUserToken,
    handler: reviewController.createReview,
  });
  fastify.delete("/reviews/:id", {
    preHandler: middlewaresController.verifyUserToken,
    handler: reviewController.deleteReviewById,
  });
}

export default reviewRoutes;
