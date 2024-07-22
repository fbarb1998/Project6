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

## API Routes
- Authorization Requirement: All sauce routes require the Authorization header with format "Bearer <token>". User must match sauce userId for modifications, else return "403: unauthorized request".

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
