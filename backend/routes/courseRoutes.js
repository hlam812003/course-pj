import { courseController } from "../controllers/courseController.js";

async function courseRoutes(fastify, options) {
  fastify.get("/courses", { handler: courseController.getAllCourses });
  fastify.get("/courses/:id", { handler: courseController.getCourseById });

  fastify.post("/courses", {
    preHandler: middlewaresController.verifyInstructorToken,
    handler: courseController.createCourse,
  });

  fastify.put("/courses/:id", {
    preHandler: middlewaresController.verifyInstructorToken,
    handler: courseController.updateCourse,
  });

  fastify.delete("/courses/:id", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: courseController.deleteCourse,
  });
}

export default courseRoutes;
