import { courseController } from "../controllers/courseController.js";
import { middlewaresController } from "../middlewares/middlewaresController.js";

async function courseRoutes(fastify, options) {
  fastify.get("/courses", { handler: courseController.getAllCourses });
  fastify.get("/courses/:id", { handler: courseController.getCourseById });

  fastify.post("/courses", {
    preHandler: middlewaresController.verifyInstructorToken,
    handler: courseController.createCourse,
  });

  fastify.put("/courses/:id", {
    preHandler: middlewaresController.verifyInstructorToken,
    handler: courseController.updateCourseById,
  });

  fastify.delete("/courses/:id", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: courseController.deleteCourseById,
  });
}

export default courseRoutes;
