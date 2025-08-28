# Review My Code

A Node.js backend project for user authentication and code review management.

## Project Structure

```
backend/
  config/
    db.js                # Database connection setup
  controllers/
    userController.js    # User-related logic
  middleware/
    errorHandler.js      # Error handling middleware
    handleValidation.js  # Validation middleware
    protectRoutes.js     # Route protection middleware
  models/
    User.js              # User model
  routes/
    userAuth.js          # User authentication routes
  utils/
    generator/
      tokenGenerator.js  # JWT token generation
    validators/
      authValidator.js   # Auth input validation
server.js                # Entry point for the server
package.json             # Project dependencies and scripts
```

## Features
- User authentication (register, login)
- JWT token generation
- Input validation
- Error handling middleware
- Protected routes

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
1. Clone the repository:
   ```powershell
   git clone https://github.com/Code-Themba/review-my-code.git
   cd review-my-code
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```

### Running the Server
```powershell
npm start
```

The server will start on the port specified in your environment variables or default to 3000.

## Environment Variables
Create a `.env` file in the root directory and add the following:
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## API Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
MIT
