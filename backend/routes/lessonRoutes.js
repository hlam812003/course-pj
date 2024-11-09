import { lessonController } from "../controllers/lessonController.js";

async function lessonRoutes(fastify, options) {
  fastify.get("/lessons/:courseId", {
    handler: lessonController.getLessonsByCourseId,
  });

  fastify.post("/lessons/:courseId", {
    preHandler: middlewaresController.verifyInstructorToken,
    handler: lessonController.createLesson,
  });

  fastify.put("/lessons/:id", {
    preHandler: middlewaresController.verifyInstructorToken,
    handler: lessonController.updateLesson,
  });

  fastify.delete("/lessons/:id", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: lessonController.deleteLesson,
  });
}

export default lessonRoutes;
