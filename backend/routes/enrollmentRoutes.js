import { enrollmentController } from "../controllers/enrollmentController.js";
import { middlewaresController } from "../middlewares/middlewaresController.js";

async function enrollmentRoutes(fastify, options) {
  fastify.get("/enrollments/course/:courseId", {
    preHandler: middlewaresController.verifyInstructorToken,
    handler: enrollmentController.getEnrollmentsByCourseId,
  });

  fastify.get("/enrollments/user/:userId", {
    preHandler: middlewaresController.verifyUserToken,
    handler: enrollmentController.getEnrollmentsByUserId,
  });

  fastify.post("/enrollments", {
    preHandler: middlewaresController.verifyUserToken,
    handler: enrollmentController.enrollInCourse,
  });

  fastify.delete("/enrollments/:id", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: enrollmentController.cancelEnrollment,
  });
}

export default enrollmentRoutes;
