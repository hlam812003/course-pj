import { authController } from '../Controller/authController.js';
import { userController } from '../Controller/userController.js';
import { middlewaresController } from '../middlewares/middlewaresController.js';

async function UserRoutes(fastify, options) {
    // Register a new user
    fastify.post('/users', { handler: authController.registerUser });

    // Login user
    fastify.post('/users/login', {
        preHandler: authController.requestRefreshToken,
        handler: authController.LoginUser
    });

    // Get a user by ID
    fastify.get('/users/:id', {
        preHandler: middlewaresController.verifyUserToken,
        handler: userController.getUserById
    });

    // Get all users
    fastify.get('/users', {
        preHandler: middlewaresController.verifyUserToken,
        handler: userController.getAllUsers
    });

    // Update user by ID
    fastify.put('/users/:id', {
        preHandler: middlewaresController.verifyUserToken,
        handler: userController.updateUserById
    });

    // Delete user by ID
    fastify.delete('/users/:id', {
        preHandler: middlewaresController.verifyUserToken,
        handler: userController.deleteUserById
    });

    // Logout user
    fastify.post('/users/logout', {
        preHandler: middlewaresController.verifyUserToken,
        handler: authController.logout
    });
}

export default UserRoutes;