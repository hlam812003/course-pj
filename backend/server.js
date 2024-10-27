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

//fastify,register(AdminRoutes);
fastify.register(fastifyCookie, {
  secret: "my-secret", // for cookies signature
  hook: "onRequest", // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
  parseOptions: {}, // options for parsing cookies
});

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
