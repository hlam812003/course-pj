import { User } from "../models/user";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const userController = {
    deleteUserById: async(request, reply) => {
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
      },
      updateUserById: async (request, reply) => {
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
      },
      getUserById: async (request, reply) => {
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
    },
    getAllUsers: async (request, reply) => {
        try {
      
          const users = await User.find();
          
      
          return reply.status(200).send(users);
        } catch (error) {
      
          console.error('Error fetching users:', error);
          return reply.status(500).send({ message: 'Error fetching users', error: error.message });
        }
    }

}