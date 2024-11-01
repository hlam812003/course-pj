import Fastify from "fastify";
import connectToDatabase from "./db.js";
import dotenv from "dotenv";
//import adminRoutes from './routes/admin.js';
import UserRoutes from "./routes/user.js";

import * as fastifyJwt from "@fastify/jwt";

import fastifyCookie from "@fastify/cookie";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyJwt, {
  secret: "supersecret",
});
fastify.register(fastifyCookie, {
  secret: "my-secret", // for cookies signature
});
//fastify,register(AdminRoutes);

fastify.register(UserRoutes);

const startServer = async () => {
  try {
    await connectToDatabase();
    const port = process.env.PORT || 3000;
    await fastify.listen({ port });
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();
