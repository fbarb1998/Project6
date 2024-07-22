# Piiquante API Documentation
## Project Context
Piiquante specializes in creating spicy sauces with secret recipes. To expand their reach and engage more users, they aim to develop a web application where users can share their favorite sauces and interact by liking or disliking sauces added by others.

# API Requirements
## Endpoint Overview

## POST /api/auth/signup
- Request Body: { email: string, password: string }
- Response: { message: string }
- Function: Hashes user password and adds user to the database.
  
## POST /api/auth/login
- Request Body: { email: string, password: string }
- Response: { userId: string, token: string }
- Function: Checks user credentials, returns user's ID and a signed JWT token.

## GET /api/sauces
- Response: Array of sauces
- Function: Returns all sauces from the database.

## GET /api/sauces/
- Response: Single sauce object
- Function: Returns sauce details based on provided ID.

## POST /api/sauces
- Request Body: { sauce: String, image: File }
- Response: { message: String }
- Function: Captures and saves image, parses stringified sauce, and saves to database. Initializes likes, dislikes, usersLiked, and usersDisliked.

## PUT /api/sauces/
- Request Body: Sauce as JSON or { sauce: String, image: File }
- Response: { message: String }
- Function: Updates sauce details, including image if uploaded.

## DELETE /api/sauces/
- Response: { message: String }
- Function: Deletes sauce with provided ID.

## POST /api/sauces/
/like
- Request Body: { userId: String, like: Number }
- Response: { message: String }
- Function: Sets like status for the user. Updates like/dislike counts and manages user preferences.

## API Errors
All errors are returned as { message: String } without modification.

# API Routes
- Authorization Requirement: All sauce routes require the Authorization header with format "Bearer <token>". User must match sauce userId for modifications, else return "403: unauthorized request".

## Authorization Requirement
All routes related to sauces require authentication using a JSON Web Token (JWT). This token is sent from the frontend with the Authorization header in the format: "Bearer <token>". This ensures that only authenticated users can access and modify sauce data.

# User Routes

## POST /api/auth/signup

Function: Allows a user to create a new account by providing an email and password. The password is securely hashed before storing in the database. Upon successful creation, it responds with a simple message indicating success.

## POST /api/auth/login

Function: Allows a user to log in by providing their email and password. The API checks the credentials, and if they are valid, it returns the user's ID and a signed JWT token. This token contains the user's ID and is used for subsequent authenticated requests.
Sauce Routes

## GET /api/sauces

Function: Retrieves all sauces stored in the database. This endpoint returns an array of sauce objects, each containing details such as name, manufacturer, description, main pepper ingredient, image URL, heat level, likes, dislikes, and user interactions (usersLiked, usersDisliked).

## GET /api/sauces/

Function: Retrieves a single sauce based on the provided sauce ID (:id). It returns the detailed information of the sauce matching the given ID, including all attributes specified in the Sauce data model.

## POST /api/sauces

Function: Allows users to add a new sauce to the database. The request body includes a stringified JSON object for sauce details (sauce) and a file (image) for the sauce image. The API captures and saves the image, parses the sauce details, initializes likes/dislikes counters, and arrays for usersLiked and usersDisliked. Upon successful creation, it responds with a message confirming the sauce was saved.

## PUT /api/sauces/

Function: Updates an existing sauce with the provided sauce ID (:id). The request body can either include a JSON object with updated sauce details or a file (image) to update the sauce image. The API checks if a file is uploaded and updates the image URL accordingly. It then updates other sauce details as specified. Upon successful update, it responds with a message confirming the sauce was updated.

## DELETE /api/sauces/

Function: Deletes a sauce from the database based on the provided sauce ID (:id). Before deletion, it verifies the user's authorization by checking if the userID of the current authenticated user matches the userID of the sauce owner. If authorized, it deletes the sauce and responds with a message confirming deletion.

## POST /api/sauces/
/like

Function: Manages user interaction with sauces by allowing them to like or dislike a sauce. The request body includes the userID of the user and a numeric value (like) indicating their action: 1 for like, 0 for canceling like/dislike, -1 for dislike. The API updates the likes/dislikes counters based on the action and manages the arrays (usersLiked, usersDisliked) to track user preferences. Upon successful update, it responds with a message confirming the action was processed.

# Additional Considerations
Error Handling: All API responses for errors follow a consistent structure ({ message: String }) to ensure clarity and ease of debugging.

## Middleware: Use of middleware like multer for handling file uploads and authorization middleware to validate JWT tokens and enforce user authentication before accessing sauce routes.

## Security: Implementation of security best practices, such as hashing passwords, unique email validation, and securing MongoDB access without hindering local development.

# Data Models

## Sauce
- userId: String (MongoDB unique identifier of user who created the sauce)
- name: String (Name of the sauce)
- manufacturer: String (Manufacturer of the sauce)
- description: String (Description of the sauce)
- mainPepper: String (Main pepper ingredient)
- imageUrl: String (URL for sauce image)
- heat: Number (Heat level of the sauce, 1-10)
- likes: Number (Number of users liking the sauce)
- dislikes: Number (Number of users disliking the sauce)
- usersLiked: [String] (Array of user IDs who liked the sauce)
- usersDisliked: [String] (Array of user IDs who disliked the sauce)

## User
- email: String (User's email address, unique)
password: String (Hashed password)
- Security Requirements
- User passwords are hashed securely.
- Authentication is enforced on all sauce routes.
- Email addresses are unique using appropriate Mongoose plugins.
- MongoDB database security does not obstruct local deployment.
- Mongoose plugin ensures proper database error reporting.
- Use of latest software versions with security updates.

# GitHub Repository
- Pull the front-end app from the project repository.
- Steps to start:
  1. Clone repo.
  2. Run npm install in terminal/command prompt.
  3. Run npm start for backend on http://localhost:3000 only.
  4. Use VSCode with LiveShare extension for frontend server.
