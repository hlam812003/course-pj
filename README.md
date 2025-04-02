# Course-PJ: An Online Learning Platform

## Project Overview

Course-PJ is a backend application designed to power an online learning platform. It provides RESTful APIs for user authentication, course management, category handling, enrollment tracking, shopping cart functionalities, and more. The backend is built using Node.js, Fastify, Mongoose, and Redis, providing a scalable and efficient solution for delivering online courses.

## Features and Functionality

*   **User Authentication**: Secure user registration, login, logout, and refresh token management using JWT and bcrypt.
*   **Course Management**: Create, read, update, and delete courses, including functionalities for instructors to manage their courses and admins to oversee all courses.
*   **Category Management**: Organize courses into categories for easy browsing. Admins can create, update, and delete categories.
*   **Enrollment Management**: Track user enrollments in courses, providing insights into course popularity.
*   **Shopping Cart**: Enable users to add courses to a shopping cart and proceed to checkout.
*   **Lesson Management**: Manage course content with lessons, allowing instructors to add, update, and delete lessons within a course.
*   **Review System**: Allow users to leave reviews on courses, providing feedback and ratings.
*   **Instructor Profiles**: Allow instructors to create and manage their profiles, including bio, expertise, and social links.
*   **Course Progress Tracking**: Track user progress within a course, marking completed lessons and calculating overall progress.
*   **Notifications**: Send notifications to users regarding course updates and announcements.
*   **Coupon Management:** Create, update, and manage discount coupons for courses.
*   **Order Management:** Handle user orders, updating payment status and tracking order history.

## Technology Stack

*   **Backend**:
    *   Node.js
    *   Fastify: A web framework for Node.js, known for its speed and efficiency.
    *   Mongoose: An elegant MongoDB object modeling for Node.js.
    *   bcrypt: A library for hashing passwords.
    *   jsonwebtoken: For generating and verifying JWT tokens.
    *   redis: A Redis client for Node.js, used for storing refresh tokens.
    *   dotenv: To manage environment variables.
    *   axios: To make HTTP requests from Node.js.

*   **Database**:
    *   MongoDB Atlas: A cloud-based NoSQL database service.
    *   Redis: An in-memory data structure store, used as a database, cache and message broker.

## Prerequisites

Before setting up the project, ensure you have the following installed:

*   Node.js (v16 or higher)
*   npm (Node Package Manager)
*   MongoDB Atlas account
*   Redis instance (local or cloud-based)

## Installation Instructions

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/hlam812003/course-pj.git
    cd course-pj
    ```

2.  **Install Backend Dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Configure Environment Variables:**

    Create a `.env` file in the `backend` directory and add the following:

    ```
    MONGODB_URI
    COOKIE_SECRET
    PORT=3001
    REDIS_URL
    ```


4.  **Connect to Redis**
    Run the redis server
    ```bash
    redis-server
    ```

5.  **Run the Backend Server:**

    ```bash
    npm run dev
    ```

    The server will start at the specified port (default: 3001).

6.  **Install Frontend Dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

7.  **Configure Frontend Environment Variables:**

    Create a `.env.local` file in the `frontend` directory. The frontend requires no specific environment variables.

8.  **Run the Frontend Development Server:**

    ```bash
    npm run dev
    ```

    The frontend will start at port 3000.

## Usage Guide

After successfully setting up and running the backend, you can access the APIs using tools like Postman or integrate them into your frontend application.

### API Endpoints

Here are some key API endpoints:

*   **Authentication**:
    *   `POST /register`: Register a new user.
        *   Request Body:
            ```json
            {
                "username": "newuser",
                "password": "securepassword",
                "email": "newuser@example.com"
            }
            ```
    *   `POST /login`: Log in an existing user.
        *   Request Body:
            ```json
            {
                "username": "existinguser",
                "password": "securepassword"
            }
            ```
    *   `POST /logout`: Log out a user (requires authentication).

*   **Courses**:
    *   `GET /courses`: Get all courses. Supports pagination with `page` and `limit` query parameters.
        *   Example: `/courses?page=2&limit=10`
    *   `GET /courses/:id`: Get a course by ID.
    *   `POST /courses`: Create a new course (requires instructor or admin role).
        *   Request Body:
            ```json
            {
              "title": "Advanced JavaScript",
              "description": "An in-depth look at JavaScript concepts.",
              "price": 49.99,
              "instructor": "673b8251cacb110b3ca99203",
              "category": "6736fb8d9a701d5ca3768b67",
              "level": "Advanced"
            }
            ```
    *   `PUT /courses/:id`: Update a course by ID (requires instructor or admin role).
    *   `DELETE /courses/:id`: Delete a course by ID (requires admin role).

*   **Categories**:
    *   `GET /categories`: Get all categories.
    *   `POST /categories`: Create a new category (requires admin role).
        *   Request Body:
            ```json
            {
                "name": "Programming",
                "description": "Courses related to programming"
            }
            ```
    *   `PUT /categories/:id`: Update a category by ID (requires admin role).
    *   `DELETE /categories/:id`: Delete a category by ID (requires admin role).

*   **Shopping Cart**:
    *   `POST /shoppingCart/course/:courseId`: Add a course to the shopping cart (requires authentication).
    *   `GET /shoppingCart/user/:userId`: Get the shopping cart for a user (requires authentication).
    *   `DELETE /shoppingCart/course/:courseId`: Remove a course from the shopping cart (requires authentication).
    *   `DELETE /shoppingCart/:userId`: Clear the shopping cart (requires authentication).

### Authentication Middleware

Several routes are protected by authentication middleware. To access these routes, include a valid JWT token in the `Authorization` header as a Bearer token.

```
Authorization: Bearer <your_jwt_token>
```

## API Documentation

Detailed API documentation can be generated using tools like Swagger or Postman. Here's an overview based on the controllers:

### Auth Controller

*   **`registerUser(req, res)`**: Registers a new user.
*   **`LoginUser(req, res)`**: Logs in an existing user, generates and sets access and refresh tokens.
*   **`requestRefreshToken(req, res)`**: Generates a new access token using a refresh token.
*   **`logout(req, res)`**: Logs out a user, clearing the refresh token.

### Category Controller

*   **`createCategory(request, reply)`**: Creates a new category.
*   **`getCategoryById(request, reply)`**: Retrieves a category by ID.
*   **`getAllCategories(request, reply)`**: Retrieves all categories.
*   **`updateCategoryById(request, reply)`**: Updates a category by ID.
*   **`deleteCategoryById(request, reply)`**: Deletes a category by ID.

### Course Controller

*   **`createCourse(request, reply)`**: Creates a new course.
*   **`getCourseById(request, reply)`**: Retrieves a course by ID.
*   **`getAllCourses(request, reply)`**: Retrieves all courses with pagination support.
*   **`updateCourseById(request, reply)`**: Updates a course by ID.
*   **`deleteCourseById(request, reply)`**: Deletes a course by ID.
*    **`getCoursesByCategory(request, reply)`**: Retrieves all courses by category with pagination support.

### Enrollment Controller

*   **`getTopEnrolledCourses(request, reply)`**: Retrieves the top enrolled courses.
*   **`enrollInCourse(request, reply)`**: Enrolls a user in a course.
*   **`getEnrollmentsByUserId(request, reply)`**: Retrieves all enrollments for a specific user.
*   **`getEnrollmentsByCourseId(request, reply)`**: Retrieves all enrollments for a specific course.
*   **`cancelEnrollment(request, reply)`**: Cancels an enrollment.

### Instructor Profile Controller

*   **`createInstructorProfile(request, reply)`**: Creates a new instructor profile.
*   **`getInstructorProfileById(request, reply)`**: Retrieves an instructor profile by user ID.
*   **`getAllInstructorProfiles(request, reply)`**: Retrieves all instructor profiles.
*   **`updateInstructorProfileById(request, reply)`**: Updates an instructor profile by user ID.
*   **`deleteInstructorProfileById(request, reply)`**: Deletes an instructor profile by user ID.

### Lesson Controller

*   **`createLesson(request, reply)`**: Creates a new lesson.
*   **`getLessonById(request, reply)`**: Retrieves a lesson by ID.
*   **`getLessonsByCourseId(request, reply)`**: Retrieves all lessons for a specific course.
*   **`updateLessonById(request, reply)`**: Updates a lesson by ID.
*   **`deleteLessonById(request, reply)`**: Deletes a lesson by ID.

### Notification Controller

*   **`createNotification(request, reply)`**: Creates a new notification.
*   **`getNotificationsByUserId(request, reply)`**: Retrieves all notifications for a user.
*   **`getNotificationById(request, reply)`**: Retrieves a specific notification by ID.
*   **`markAsSeen(request, reply)`**: Marks a notification as seen.
*   **`deleteNotificationById(request, reply)`**: Deletes a notification by ID.

### Order Controller

*   **`createOrder(request, reply)`**: Creates a new order.
*   **`getOrderById(request, reply)`**: Retrieves an order by ID.
*   **`getOrdersByUserId(request, reply)`**: Retrieves all orders for a user.
*   **`updatePaymentStatus(request, reply)`**: Updates the payment status of an order.
*   **`deleteOrderById(request, reply)`**: Deletes an order by ID.

### Progress Controller

*   **`initializeProgress(request, reply)`**: Initializes progress for a user in a course.
*   **`updateProgress(request, reply)`**: Updates progress when a user completes a lesson.
*   **`getProgressByUserAndCourse(request, reply)`**: Gets progress by user and course ID.
*   **`getAllProgressByUser(request, reply)`**: Gets all progress records for a specific user.

### Review Controller

*   **`createReview(request, reply)`**: Creates a new review.
*   **`getReviewsByCourseId(request, reply)`**: Gets reviews for a course.
*   **`getReviewById(request, reply)`**: Gets a review by ID.
*   **`updateReviewById(request, reply)`**: Updates a review by ID.
*   **`deleteReviewById(request, reply)`**: Deletes a review by ID.

### Shopping Cart Controller

*   **`addCourseToCart(request, reply)`**: Adds a course to the shopping cart.
*   **`createOrUpdateCart(request, reply)`**: Creates a new shopping cart or updates an existing one.
*   **`getCartByUserId(request, reply)`**: Retrieves a shopping cart by user ID.
*   **`removeCourseFromCart(request, reply)`**: Removes a course from the shopping cart.
*   **`clearCart(request, reply)`**: Clears all courses in the shopping cart.

### User Controller

*   **`deleteUserById(request, reply)`**: Deletes a user by ID.
*   **`updateUserById(request, reply)`**: Updates a user by ID.
*   **`getUserById(request, reply)`**: Gets a user by ID.
*   **`getAllUsers(request, reply)`**: Gets all users.

### Coupon Controller

*   **`createCoupon(request, reply)`**: Creates a new coupon.
*   **`getCouponById(request, reply)`**: Retrieves a coupon by ID.
*   **`getAllCoupons(request, reply)`**: Retrieves all coupons.
*   **`updateCouponById(request, reply)`**: Updates a coupon by ID.
*   **`deleteCouponById(request, reply)`**: Deletes a coupon by ID.

## Contributing Guidelines

Contributions are welcome! Here are the steps to contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Implement your changes, ensuring code quality and adding necessary tests.
4.  Commit your changes with descriptive commit messages.
5.  Push your branch to your forked repository.
6.  Create a pull request to the main repository.

## License Information

This project has no license specified. All rights are reserved.

## Contact/Support Information

For any questions or support, please contact:

*   Huy Hoang
*   Email: example@example.com
*   GitHub: [https://github.com/hlam812003](https://github.com/hlam812003)