
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
async function addUser(request, reply) {
    try {
      const { username, password, email, role } = request.body;
  
      // Check field
      if (!username || !password || !email) {
        return reply.status(400).send({ message: 'Missing required fields' });
      }
  
      // check exist
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return reply.status(400).send({ message: 'User with this username or email already exists' });
      }
  
      // cryted
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create new 
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        role,
      });
  
      // Save 
      await newUser.save();
  
      return reply.status(201).send({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error(error);
      return reply.status(500).send(error);
    }
  }
export default addUser ;
