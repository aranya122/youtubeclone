
# Project Title

Youtube Clone

This is a YouTube clone application built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to upload, view, like, and comment on videos, as well as interact with a modern user interface similar to YouTube.


## Features

- Video Upload: Upload videos with metadata such as title, description, and category.

- Video Playback: Watch videos with the ability to play, pause, and seek.

- Like/Dislike Videos: Users can like or dislike videos.

- Comments: Comment on videos and interact with other users' comments.

- Search Functionality: Search for videos based on title or description.

- User Authentication: Users can sign up, log in, and maintain their session.

- Responsive Design: Mobile-friendly design to view and interact with videos on all devices.


## Tech Stack

- Frontend:

React.js

Redux (for state management)

React Router (for navigation)

Axios (for API requests)

Tailwind CSS (for styling)

- Backend:

Node.js

Express.js

MongoDB (for storing user data, videos, comments, etc.)

Multer (for handling file uploads)

JWT (JSON Web Token) for authentication
## Github Repository Link
https://github.com/aranya122/youtubeclone


## Installation

Install my-project with npm
```bash
  npm install
```
 Set up environment variables:

Create a .env file in the project root directory.

Add the following environment variables:

 - URL=your_mongodb_connection_string
  - JWT_SECRET=your_jwt_secret



4. Run the application:

npm start

- The server should be running at http://localhost:5000.
- Connected to MONGODB
```bash
  npm run dev
  ```
    
## Authentication

- POST /api/auth/register: Register a new user.

- POST /api/auth/login: Login and obtain a JWT token.
## Products

 - GET /api/products: Get all products.

 - GET /api/products/:id: Get a single product by ID.

- POST /api/products: Add a new product (admin only).

- PUT /api/products/:id: Update a product (admin only).

- DELETE /api/products/:id: Delete a product (admin only).
## Cart 


- POST /api/cart: Add an item to the cart.

- PUT /api/cart/:id: Update an item in the cart.

- DELETE /api/cart/:id: Remove an item from the cart.

- GET /api/cart: Get all items in the cart for the authenticated user.