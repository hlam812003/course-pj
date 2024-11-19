import { instructorProfileController } from "../controllers/instructorProfileController.js";
import { middlewaresController } from "../middlewares/middlewaresController.js";

async function profileRoutes(fastify, options) {
  fastify.post("/instructorProfiles", {
    //preHandler: middlewaresController.verifyInstructorToken,
    handler: instructorProfileController.createInstructorProfile,
  });
  fastify.get("/instructorProfile", {
    handler: instructorProfileController.getAllInstructorProfiles,
  });
  fastify.get("/instructorProfile/:id", {
    handler: instructorProfileController.getInstructorProfileById,
  });
  fastify.put("/instructorProfile", {
    preHandler: middlewaresController.verifyInstructorToken,
    handler: instructorProfileController.updateInstructorProfileById,
  });
}

export default profileRoutes;
