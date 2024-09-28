const User = require('../models/user');

async function userRoutes(fastify, options) {

  // Route: Lấy tất cả người dùng
  fastify.get('/users', async (request, reply) => {
    try {
      const users = await User.find();
      reply.send(users);
    } catch (err) {
      reply.status(500).send({ error: 'Failed to fetch users' });
    }
  });

  // Route: Lấy thông tin người dùng theo ID
  fastify.get('/users/:id', async (request, reply) => {
    try {
      const user = await User.findById(request.params.id);
      if (!user) {
        return reply.status(404).send({ error: 'User not found' });
      }
      reply.send(user);
    } catch (err) {
      reply.status(500).send({ error: 'Failed to fetch user' });
    }
  });

  // Route: Thêm người dùng mới
  fastify.post('/users', async (request, reply) => {
    try {
      const newUser = new User(request.body);
      await newUser.save();
      reply.status(201).send(newUser);
    } catch (err) {
      reply.status(400).send({ error: 'Failed to create user' });
    }
  });

  // Route: Sửa thông tin người dùng theo ID
  fastify.put('/users/:id', async (request, reply) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(request.params.id, request.body, { new: true });
      if (!updatedUser) {
        return reply.status(404).send({ error: 'User not found' });
      }
      reply.send(updatedUser);
    } catch (err) {
      reply.status(400).send({ error: 'Failed to update user' });
    }
  });

  // Route: Xóa người dùng theo ID
  fastify.delete('/users/:id', async (request, reply) => {
    try {
      const deletedUser = await User.findByIdAndDelete(request.params.id);
      if (!deletedUser) {
        return reply.status(404).send({ error: 'User not found' });
      }
      reply.send({ message: 'User deleted successfully' });
    } catch (err) {
      reply.status(500).send({ error: 'Failed to delete user' });
    }
  });
}

module.exports = userRoutes;
