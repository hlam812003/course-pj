import { userController } from "../controllers/userController.js";
import { middlewaresController } from "../middlewares/middlewaresController.js";

async function userRoutes(fastify, options) {
  fastify.get("/user/:id", {
    preHandler: middlewaresController.verifyUserToken,
    handler: userController.getUserById,
  });

  fastify.get("/users", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: userController.getAllUsers,
  });

  fastify.put("/users/:id", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: userController.updateUserById,
  });

  fastify.delete("/users/:id", {
    preHandler: middlewaresController.verifyAdminToken,
    handler: userController.deleteUserById,
  });
}

export default userRoutes;
