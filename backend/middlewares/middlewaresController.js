export const middlewaresController = {

    verifyToken: async (request, reply, next) => {
      try {
        const token = request.headers.authorization;
        if (!token) {
          return reply.status(401).send({ message: 'Access token is missing' });
        }
        const accessToken = token.split(' ')[1];
        if (!accessToken) {
          return reply.status(401).send({ message: 'Token format is invalid' });
        }
        await request.jwtVerify();
        next();
      } catch (error) {
        console.error(error);
        return reply.status(401).send({ message: 'Not authenticated or expired token' });
      }
    },
  
    // Verify if the user is an admin
    verifyAdminToken: async (request, reply, next) => {
      try {
        await middlewaresController.verifyToken(request, reply, async () => {
          if (request.user.role !== 'admin') {
            return reply.status(403).send({ message: 'Access forbidden: Admins only' });
          }
          next();
        });
      } catch (error) {
        console.error(error);
        return reply.status(401).send({ message: 'Not authenticated or expired token' });
      }
    },
  
    // Verify if the user is an instructor or admin
    verifyInstructorToken: async (request, reply, next) => {
      try {

        await middlewaresController.verifyToken(request, reply, async () => {
 
          if (request.user.role !== 'instructor' && request.user.role !== 'admin') {
            return reply.status(403).send({ message: 'Access forbidden: Instructors or Admins only' });
          }

          next();
        });
      } catch (error) {
        console.error(error);
        return reply.status(401).send({ message: 'Not authenticated or expired token' });
      }
    },
  
    // Verify if the user can access their own resource or is an admin
    verifyUserToken: async (request, reply, next) => {
      try {

        await middlewaresController.verifyToken(request, reply, async () => {

          if (request.user.id !== request.params.id && request.user.role !== 'admin') {
            return reply.status(403).send({ message: 'Access forbidden' });
          }

          next();
        });
      } catch (error) {
        console.error(error);
        return reply.status(401).send({ message: 'Not authenticated or expired token' });
      }
    }
  };
  