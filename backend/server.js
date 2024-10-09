import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import connectToDatabase from './db.js';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin.js';

dotenv.config();

const fastify = Fastify({
  logger: true
});

fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
});

fastify.register(adminRoutes);

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