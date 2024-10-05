import { User } from '../models/user.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

async function updateUserById(request, reply) {
  try {
    const { id } = request.params;
    const { username, email, role, password } = request.body;


    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.status(400).send({ message: 'Invalid user ID' });
    }


    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(password, saltRounds);
    }


    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    // If user is not found, return a 404 response
    if (!updatedUser) {
      return reply.status(404).send({ message: 'User not found' });
    }


    const { password: _, ...userWithoutPassword } = updatedUser._doc; 

    return reply.status(200).send({ message: 'User updated successfully', user: userWithoutPassword });
  } catch (error) {
    console.error('Error updating user:', error);
    return reply.status(500).send({ message: 'Error updating user', error: error.message });
  }
}

export default updateUserById;