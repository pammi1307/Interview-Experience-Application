# Interview-Experience-Application

A full-stack web application that allows users to submit and view their interview experiences. Built with React.js for the frontend and Node.js for the backend, with MongoDB as the database.

## Features

- User Authentication (Register/Login)
- Create Interview Experience Submissions
- View All Submissions
- View Personal Submissions
- Responsive Design

### Frontend
- React.js
- React Router DOM
- Axios
- Context API for State Management
- CSS for Styling

### Backend
- Node.js
- MongoDB with Mongoose
- JWT for Authentication
- Bcrypt for Password Hashing
- CORS

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

## Installation & Setup

1. Clone the repository: <br>
    bash <br>
    git clone https://github.com/pammi1307/Interview-Experience-Application.git <br>
    cd interview-experience

2. Backend Setup: <br>
    bash <br>
    cd server <br>
    npm install 

Create .env file with the following variables: <br>
NODE_ENV=development <br>
PORT=5000 <br>
MONGO_URI=your_mongodb_connection_string <br>
JWT_SECRET=your_jwt_secret <br>

Start the server <br>
npm run dev <br>

3. Frontend Setup: <br>

    bash <br>
    cd client <br>
    npm install <br>
    npm start <br>

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Authentication
- POST /api/users/register - Register a new user
- POST /api/users/login - Login user

### Submissions
- POST /api/submissions - Create a new submission
- GET /api/submissions - Get all submissions (paginated)
- GET /api/submissions/me - Get user's submissions

## Design Choices

1. **Authentication**
   - JWT-based authentication for secure API access
   - Token stored in localStorage for persistence
   - Protected routes using custom middleware

2. **State Management**
   - Context API for global state management
   - Separate contexts for authentication and submissions
   - Custom hooks for state access

3. **Database Schema**
   - User model with password hashing
   - Submission model with references to users
   - Timestamps for tracking creation/updates

4. **UI/UX**
   - Responsive grid layout for submissions
   - Form validation with error messages
   - Loading states for better user experience
   - Clean and minimal design

## Dependencies

### Frontend Dependencies
json <br>
{ <br>
"axios": "^1.3.4", <br>
"react": "^18.2.0", <br>
"react-dom": "^18.2.0", <br>
"react-router-dom": "^6.9.0", <br>
"react-scripts": "5.0.1", <br>
"react-toastify": "^9.1.2" <br>
} <br>

### Backend Dependencies
json <br>
{ <br>
"bcryptjs": "^2.4.3", <br>
"cors": "^2.8.5", <br>
"dotenv": "^16.0.3", <br>
"express": "^4.18.2", <br>
"jsonwebtoken": "^9.0.0", <br>
"mongoose": "^7.0.3" <br>
} <br>

## Error Handling

- Frontend form validation
- Backend API validation
- JWT token expiration handling
- Database error handling
- User-friendly error messages

## Security Features

- Password hashing using bcrypt
- JWT authentication
- Protected routes
- Input validation
- CORS configuration

