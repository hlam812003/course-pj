import Fastify from 'fastify';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin.js';
import fastifyJwt from 'fastify-jwt';

dotenv.config();


const fastify = Fastify({
  logger: true
})


fastify.register(fastifyJwt, 
{
  secret: 'supersecret', 
});

fastify.register(adminRoutes);

const main = async () => {
  try {
    mongoose.connect("mongodb+srv://admin-huyhoang:123@cluster0.e0cvr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/elearningData")
    .then(() => {
      console.log('MongoDB connected');
    }).catch(err => {
      console.error('MongoDB connection error:', err);
    });

    await fastify.listen({ port: 3000 });
    console.log('Server is running on port 3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main();
