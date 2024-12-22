import { shoppingCartController } from "../controllers/shoppingCartController.js";
import { middlewaresController } from "../middlewares/middlewaresController.js";

const shoppingCartRoutes = async (fastify, options) => {
  // Schema for userId parameter
  const paramsSchema = {
    type: 'object',
    properties: {
      userId: { type: 'string' },
      courseId: { type: 'string' }
    }
  };

  // Get cart by user ID
  fastify.get("/shoppingCart/user/:userId", {
    schema: {
      params: paramsSchema
    },
    preHandler: middlewaresController.verifyUserToken,
    handler: shoppingCartController.getCartByUserId,
  });
  
  // Add course to cart
  fastify.post("/shoppingCart/course/:courseId", {
    schema: {
      params: paramsSchema
    },
    preHandler: middlewaresController.verifyUserToken,
    handler: shoppingCartController.addCourseToCart,
  });

  // Create or update cart
  fastify.put("/shoppingCart", {
    schema: {
      body: {
        type: 'object',
        required: ['user', 'courses'],
        properties: {
          user: { type: 'string' },
          courses: { 
            type: 'array',
            items: {
              type: 'object',
              properties: {
                course: { type: 'string' },
                quantity: { type: 'number' }
              }
            }
          }
        }
      }
    },
    preHandler: middlewaresController.verifyUserToken,
    handler: shoppingCartController.createOrUpdateCart,
  });

  // Remove course from cart
  fastify.delete("/shoppingCart/course/:courseId", {
    schema: {
      params: paramsSchema
    },
    preHandler: middlewaresController.verifyUserToken,
    handler: shoppingCartController.removeCourseFromCart,
  });

  // Clear entire cart
  fastify.delete("/shoppingCart/:userId", {
    schema: {
      params: paramsSchema
    },
    preHandler: middlewaresController.verifyUserToken,
    handler: shoppingCartController.clearCart,
  });
}

export default shoppingCartRoutes;
