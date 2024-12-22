import { progressController } from "../controllers/progressController.js";
import { middlewaresController } from "../middlewares/middlewaresController.js";

async function progressRoutes(fastify, options) {
  fastify.post("/progress", {
    preHandler: middlewaresController.verifyUserToken,
    handler: progressController.initializeProgress,
  });
  fastify.get("/progress/course/:courseId", {
    preHandler: middlewaresController.verifyUserToken,
    handler: progressController.getProgressByUserAndCourse,
  });

  fastify.put("/progress/course/:courseId", {
    preHandler: middlewaresController.verifyUserToken,
    handler: progressController.updateProgress,
  });

  fastify.get("/progress/user/:userId", {
    preHandler: middlewaresController.verifyUserToken,
    handler: progressController.getAllProgressByUser,
  });
}

export default progressRoutes;
