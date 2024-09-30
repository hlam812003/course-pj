import Fastify from 'fastify';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Kết nối MongoDB
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('MongoDB connection error:', err));

// Đăng ký các route
// fastify.register(require('./routes/auth')); // Đăng ký route cho đăng ký người dùng

// Lắng nghe cổng
const fastify = Fastify({
  logger: true
})

const main = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server is running on port 3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main();
