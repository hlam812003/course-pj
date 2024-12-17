import Fastify from "fastify";
import connectToDatabase from "./db.js";
import dotenv from "dotenv";
import athRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/shoppingCartRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import instructorProfileRoutes from "./routes/InstructorProfileRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import axios from "axios";

import * as fastifyJwt from "@fastify/jwt";

import fastifyCookie from "@fastify/cookie";
import couponRoutes from "./routes/couponRoutes.js";

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

fastify.register(athRoutes);
fastify.register(cartRoutes);
fastify.register(categoryRoutes);
fastify.register(couponRoutes);
fastify.register(courseRoutes);
fastify.register(enrollmentRoutes);
fastify.register(instructorProfileRoutes);
fastify.register(lessonRoutes);
fastify.register(orderRoutes);
fastify.register(progressRoutes);
fastify.register(reviewRoutes);
fastify.register(userRoutes);

const startServer = async () => {
  try {
    await connectToDatabase();
    const port = process.env.PORT || 3000;
    await fastify.listen({ port });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();
