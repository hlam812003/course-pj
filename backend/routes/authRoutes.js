import { authController } from "../controllers/authController.js";

async function authRoutes(fastify, options) {
  fastify.post("/register", haauthController.registerUser);
  fastify.post("/login", authController.loginUser);
  fastify.post("/logout", {
    preHandler: middlewaresController.verifyToken,
    handler: authController.logout,
  });
}

export default authRoutes;
