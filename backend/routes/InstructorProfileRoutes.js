import { instructorProfileController } from "../controllers/instructorProfileController.js";

async function profileRoutes(fastify, options) {
  fastify.get("/instructorProfile", {
    handler: instructorProfileController.getAllInstructorProfiles,
  });
  fastify.get("/instructorProfile/:id", {
    handler: instructorProfileController.getInstructorProfileById,
  });
  fastify.put("/instructorProfile", {
    preHandler: middlewaresController.verifyInstructorToken,
    handler: profileController.modifyInstructorProfile,
  });
}

export default profileRoutes;
