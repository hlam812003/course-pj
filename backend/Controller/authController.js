import bcrypt from 'bcrypt';
import { User } from '../models/user';

export const authController = {
    registerUser: async(req, res) => 
        {
        try {
            //handle Data
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
      
            return reply.status(201).send({ message: 'User created successfully', user: newUser});
          } catch (error) {
            console.error(error);
            return reply.status(500).send(error);
          }
        
    },
    LoginUser: async(req, res) =>{
        try{
            const {username, password} = req.body;
            //check exist
            const user = await User.findOne({username}) ;
            if(!user)
            {
                res.status(401).send({ message: 'Invalid username' })
            }
            const isPassValid = await bcrypt.compare(password, user.password)
            if(!isPassValid){
                res.status(401).send({ message: 'Invalid password' })
            }
            const token = await reply.jwtSign({
                id: user._id,
                username: user.username,
                role: user.role 
              },  
              {
                expiresIn: '2h' // Token will expire in 1 hour
              });

            res.status(200).send({user, token})
        }catch(error){
            console.log(error);
            res.status(500).send({ message: 'Error logging in' });
        }
    }
}