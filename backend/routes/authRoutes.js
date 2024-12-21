import { authController } from "../controllers/authController.js";
import { middlewaresController } from "../middlewares/middlewaresController.js";
async function authRoutes(fastify, options) {
  fastify.post("/register", authController.registerUser);
  fastify.post("/login", authController.LoginUser);
  fastify.post("/logout", {
    preHandler: middlewaresController.verifyToken,
    handler: authController.logout,
  });
}

export default authRoutes;