Thryl Backend Proxy Service
A lightweight Node.js backend service that acts as a proxy between clients and Thryl APIs. This service handles authentication, token management, tournament data retrieval with filtering and pagination, providing a clean and consistent API interface.

🚀 Features
Authentication Proxy - Handles login and OTP verification with Thryl APIs

Token Management - Secure in-memory token storage

Tournament Management - Retrieve tournaments with server-side filtering and pagination

Clean API Design - Consistent response structure and error handling

Docker Support - Containerized deployment with health checks

Comprehensive Documentation - Postman collection and API specifications

🛠️ Tech Stack
Runtime: Node.js

Framework: Express.js

HTTP Client: Axios

Containerization: Docker + Docker Compose

Environment Management: dotenv

Development: Nodemon

📁 Project Structure
text
thryl-backend/
├── src/
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── utils/          # Utility functions
│   └── app.js          # Main application file
├── Dockerfile
├── docker-compose.yml
├── package.json
├── .env.example
├── postman_collection.json
└── README.md
🔧 Installation & Setup
Prerequisites
Node.js (v14 or higher)

npm or yarn

Docker (optional, for containerized deployment)

Local Development
Clone and setup the repository

bash
git clone git@github.com-personal:alpharosto/thryl-backend.git
cd thryl-backend
Install dependencies

bash
npm install
Configure environment variables

bash
cp .env.example .env
Edit .env file with your configuration:

env
PORT=5000
THRYL_API_BASE_URL=https://api.thryl.app
NODE_ENV=development
Start development server

bash
npm run dev
The server will start on http://localhost:5000

🐳 Docker Deployment
Build and run with Docker Compose
bash
docker-compose up --build
Check service health
bash
curl http://localhost:5000/health
📬 API Endpoints
Health Check
GET /health

Response:

json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:00:00.000Z",
  "uptime": "2 hours"
}
Authentication
Login
POST /api/auth/login

Request:

json
{
  "phoneNumber": "9999999999"
}
Response:

json
{
  "success": true,
  "message": "OTP sent successfully"
}
Verify OTP
POST /api/auth/verify-otp

Request:

json
{
  "phoneNumber": "9999999999",
  "otp": "1234"
}
Response:

json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "user_123456",
  "message": "Authentication successful"
}
Tournaments
Get Tournaments
GET /api/tournaments

Query Parameters:

segment (optional): ongoing | all - Filter tournaments by status

page (optional): Number - Pagination page number (default: 1)

limit (optional): Number - Items per page (default: 20)

Headers:

Authorization: Bearer <token> (required)

Response:

json
{
  "success": true,
  "data": [
    {
      "id": "tournament_123",
      "name": "Weekly Championship",
      "status": "ongoing",
      "startDate": "2024-01-15T10:00:00Z",
      "endDate": "2024-01-22T10:00:00Z",
      "participants": 150,
      "prizePool": 5000
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
🧪 Testing with Postman
Import postman_collection.json from the project root into Postman

Set up Postman environment variables:

base_url: http://localhost:5000

Test the complete workflow:

Login → Send phone number

Verify OTP → Complete authentication

Get Tournaments → Use returned token to fetch tournament data

🔒 Security & Architecture
Token Storage: In-memory storage (as per assignment requirements)

Error Handling: Comprehensive error middleware with consistent responses

Request Logging: All incoming requests are logged for monitoring

Input Validation: Basic validation for required parameters

CORS: Enabled for cross-origin requests

Rate Limiting: Basic rate limiting implemented

🚀 Development Scripts
bash
npm run dev      # Start development server with hot reload
npm start        # Start production server
npm test         # Run tests (if available)
📌 Assumptions & Notes
The actual Thryl API URL is not provided, so https://api.thryl.app is used as a placeholder

Token storage is implemented in-memory for assignment purposes (production would use Redis/database)

Tournament API response structure is normalized since the actual service response format is unknown

Pagination and filtering are implemented server-side for consistency

Error responses follow a standardized format across all endpoints

🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

📝 License
This project was developed as part of a backend + DevOps assignment.