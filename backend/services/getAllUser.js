import { User } from '../models/user.js';

async function getAllUsers(request, reply) {
  try {

    const users = await User.find();
    

    return reply.status(200).send(users);
  } catch (error) {

    console.error('Error fetching users:', error);
    return reply.status(500).send({ message: 'Error fetching users', error: error.message });
  }
}

export default getAllUsers;