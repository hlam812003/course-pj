import bcrypt from 'bcrypt';
import { User } from '../models/user';
import redis from 'redis';

const redisClient = redis.createClient();

redisClient.connect().catch(console.error);

export const authController = {
    registerUser: async (req, res) => {
        try {
            // Handle Data
            const { username, password, email, role } = req.body;
            
            // Check required fields
            if (!username || !password || !email) {
              return res.status(400).send({ message: 'Missing required fields' });
            }
        
            // Check if user already exists
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
              return res.status(400).send({ message: 'User with this username or email already exists' });
            }
        
            // Hash password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
        
            // Create new user
            const newUser = new User({
              username,
              password: hashedPassword,
              email,
              role,
            });
        
            // Save user to database
            await newUser.save();
      
            return res.status(201).send({ message: 'User created successfully', user: newUser });
        } catch (error) {
            console.error(error);
            return res.status(500).send(error);
        }
    },

    LoginUser: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Check if user exists
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(401).send({ message: 'Invalid username' });
            }

            // Validate password
            const isPassValid = await bcrypt.compare(password, user.password);
            if (!isPassValid) {
                return res.status(401).send({ message: 'Invalid password' });
            }

            // Generate access token
            const token = await res.jwtSign({
                id: user._id,
                username: user.username,
                role: user.role 
            },  
            {
                expiresIn: '2h' 
            });

            // Generate refresh token
            const refreshToken = await res.jwtSign({
                id: user._id,
                username: user.username,
                role: user.role 
            },  
            {
                expiresIn: '7d'
            });

            // Store refresh token in Redis
            await redisClient.set(user._id.toString(), refreshToken);

            // Set refresh token as an HTTP-only cookie
            res.cookie('refreshToken', refreshToken, { 
                httpOnly: true,
                secure: true, 
                path: '/', 
                sameSite: 'none'
            });

            res.status(200).send({ user, token });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: 'Error logging in' });
        }
    },

    requestRefreshToken: async (req, res) => {
        try {
            // Get refresh token from cookies
            const oldRefreshToken = req.cookies.refreshToken;
            if (!oldRefreshToken) {
                return res.status(403).send({ message: 'Refresh token not found' });
            }

            // Verify the refresh token
            const decoded = await res.jwtVerify(oldRefreshToken);
            if (!decoded) {
                return res.status(403).send({ message: 'Invalid refresh token' });
            }

            // Check if the user exists
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(403).send({ message: 'User not found' });
            }

            // Check if the refresh token matches the one in Redis
            const storedRefreshToken = await redisClient.get(user._id.toString());
            if (storedRefreshToken !== oldRefreshToken) {
                return res.status(403).send({ message: 'Invalid refresh token' });
            }

            // Generate a new access token
            const newAccessToken = await res.jwtSign({
                id: user._id,
                username: user.username,
                role: user.role 
            },  
            {
                expiresIn: '2h' 
            });

            // Generate a new refresh token
            const newRefreshToken = await res.jwtSign({
                id: user._id,
                username: user.username,
                role: user.role 
            },  
            {
                expiresIn: '7d'
            });

            // Store the new refresh token in Redis and delete the old one
            await redisClient.set(user._id.toString(), newRefreshToken);

            // Update refresh token cookie
            res.cookie('refreshToken', newRefreshToken, { 
                httpOnly: true,
                secure: true, 
                path: '/', 
                sameSite: 'none'
            });

            res.status(200).send({ accessToken: newAccessToken });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: 'Error refreshing token' });
        }
    },
    logout: async (req, res) => {
        try {
            // Get refresh token from cookies
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(403).send({ message: 'Refresh token not found' });
            }

            // Verify the refresh token
            const decoded = await res.jwtVerify(refreshToken);
            if (!decoded) {
                return res.status(403).send({ message: 'Invalid refresh token' });
            }

            // Delete the refresh token from Redis
            await redisClient.del(decoded.id.toString());

            // Clear the refresh token cookie
            res.clearCookie('refreshToken', { path: '/' });

            res.status(200).send({ message: 'User logged out successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: 'Error logging out' });
        }
    }
};
