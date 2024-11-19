import { progressController } from "../controllers/progressController.js";
import { middlewaresController } from "../middlewares/middlewaresController.js";

async function progressRoutes(fastify, options) {
  fastify.get("/progress/:courseId", {
    preHandler: middlewaresController.verifyUserToken,
    handler: progressController.getSelfProgress,
  });

  fastify.put("/progress/:courseId", {
    preHandler: middlewaresController.verifyUserToken,
    handler: progressController.updateSelfProgress,
  });
}

export default progressRoutes;
