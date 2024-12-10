import { lessonController } from "../controllers/lessonController.js";
import { middlewaresController } from "../middlewares/middlewaresController.js";

async function lessonRoutes(fastify, options) {
  fastify.get("/lessons/course/:courseId", {
    handler: lessonController.getLessonsByCourseId,
  });

  fastify.get("/lessons/:id", {
    handler: lessonController.getLessonById,
  });

  fastify.post("/lessons/course/:courseId", {
    preHandler: middlewaresController.verifyInstructorToken,
    handler: lessonController.createLesson,
  });

  fastify.put("/lessons/:id", {
    preHandler: middlewaresController.verifyInstructorToken,
    handler: lessonController.updateLessonById,
  });

  fastify.delete("/lessons/:id", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: lessonController.deleteLessonById,
  });
}

export default lessonRoutes;
