import { enrollmentController } from "../controllers/enrollmentController.js";
import { middlewaresController } from "../middlewares/middlewaresController.js";

async function enrollmentRoutes(fastify, options) {
  fastify.get("/enrollments/course/:courseId", {
    preHandler: middlewaresController.verifyInstructorToken,
    handler: enrollmentController.enrollInCourse,
  });

  fastify.post("/enrollments/course/:courseId", {
    preHandler: middlewaresController,
    handler: enrollmentController.createEnrollment,
  });

  fastify.put("/enrollments/:id", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: enrollmentController.updateEnrollment,
  });

  fastify.delete("/enrollments/:id", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: enrollmentController.deleteEnrollment,
  });
}

export default enrollmentRoutes;
