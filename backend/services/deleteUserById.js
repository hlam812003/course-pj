import { User } from '../models/user.js';
import mongoose from 'mongoose';

async function deleteUserById(request, reply) {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ message: 'Invalid user ID' });
    }


    const deletedUser = await User.findByIdAndDelete(id);


    if (!deletedUser) {
      return reply.status(404).send({ message: 'User not found' });
    }

    return reply.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {

    console.error('Error deleting user:', error);
    return reply.status(500).send({ message: 'Error deleting user', error: error.message });
  }
}

export default deleteUserById;
