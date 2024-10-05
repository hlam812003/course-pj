import { User } from '../models/user.js';
import mongoose from 'mongoose';

async function getUserById(request, reply) {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ message: 'Invalid user ID' });
    }


    const user = await User.findById(id);

    // If user is not found, return a 404 response
    if (!user) {
      return reply.status(404).send({ message: 'User not found' });
    }


    return reply.status(200).send(user);
  } catch (error) {
    // Handle any errors that occur
    console.error('Error fetching user by ID:', error);
    return reply.status(500).send({ message: 'Error fetching user', error: error.message });
  }
}

export default getUserById;