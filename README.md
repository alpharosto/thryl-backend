Thryl Backend Proxy Service

A production-grade Node.js backend service that acts as a proxy between clients and the (mocked) Thryl APIs.
This backend handles authentication, token management, tournament listing with filtering & pagination, and includes complete DevOps setup with logging, Docker, CI, and health checks.

🚀 Features
Backend Functionality

🔐 Authentication Proxy (Login + OTP Verify)

🔑 In-memory token storage (as per assignment)

🏆 Tournament listing with:

Filtering (segment=all|ongoing)

Pagination (page, limit)

Clean mapped response

⚡ Internal proxy: Client → Backend → Thryl API → Backend → Client

🧱 Centralized error handling

🧩 Clean architecture (controllers/services/routes/middleware)

DevOps

🐳 Dockerized backend service

🏗️ Multi-stage Docker build (production-grade)

🔁 docker-compose with health checks

📜 Structured logging using Pino (JSON logs)

⚙️ GitHub Actions CI pipeline

🌱 Environment variable configuration via .env

🛠️ Tech Stack
Layer	Technology
Runtime	Node.js
Framework	Express.js
HTTP Client	Axios
Logging	Pino + Pretty renderer
Containerization	Docker, Docker Compose
CI/CD	GitHub Actions
Development	Nodemon
Mock API	Custom Express mock server (port 5500)
📁 Project Structure
thryl-backend/
├── src/
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Auth, logger, error handling
│   ├── routes/            # Route definitions
│   ├── services/          # External API calls
│   ├── store/             # In-memory token store
│   ├── utils/             # Logger, axios client
│   └── app.js             # Application entry
├── mock-api/              # Mock Thryl API on port 5500
├── .github/workflows/ci.yml
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── postman_collection.json
└── README.md

🔧 Installation & Local Development
1. Clone Repository
git clone git@github.com:alpharosto/thryl-backend.git
cd thryl-backend

2. Install Dependencies
npm install

3. Setup Environment Variables
cp .env.example .env


.env values:

PORT=5000
THRYL_API_BASE_URL=http://localhost:5500

4. Start Mock Thryl API
npm run mock


Runs at → http://localhost:5500

5. Start Backend
npm run dev


Runs at → http://localhost:5000

🐳 Docker Deployment
Run with docker-compose
docker-compose up --build


Backend is available at:

👉 http://localhost:3000

Healthcheck
curl http://localhost:3000/health

🏗️ Multi-Stage Dockerfile

Included in repository:

Stage 1: Build (installs deps, prepares environment)

Stage 2: Runtime (production deps only)

Reduces image size significantly

🔁 docker-compose.yml Features

Exposes backend on 3000:3000

Loads .env

Includes healthcheck

Restart policy enabled

📜 Structured Logging

Implemented using Pino, with pretty printing in development.

Examples:

INFO  [LOGIN] phone=9999999999 status=success
INFO  [VERIFY OTP] tokenStored=true userId=user-001
INFO  [TOURNAMENTS] segment=ongoing page=1 limit=20

⚙️ GitHub Actions CI

Located at:

.github/workflows/ci.yml


CI pipeline includes:

Checkout code

Install dependencies

Linting

Build verification

Docker image build test

📬 API Endpoints
1. Health Check
GET /health

Response:
{ "status": "ok" }

2. Authentication
Login
POST /api/auth/login


Body:

{ "phoneNumber": "9999999999" }


Response:

{
  "success": true,
  "requestId": "REQ-12345"
}

Verify OTP
POST /api/auth/verify-otp


Body:

{
  "phoneNumber": "9999999999",
  "otp": "1234"
}


Response:

{
  "success": true,
  "token": "mock-token-123456",
  "userId": "user-001",
  "expiresIn": 3600
}


✔ Token is stored in-memory
✔ Required before tournament access

3. Tournaments
GET /api/tournaments

Query parameters:
name	values	description
segment	all / ongoing	filter by status
page	number	default: 1
limit	number	default: 20
Response:
{
  "segment": "ongoing",
  "page": 1,
  "limit": 20,
  "total": 50,
  "items": [
    {
      "id": "T001",
      "name": "PUBG Winter Clash",
      "status": "ongoing",
      "prizepool": 25000,
      "participants": 120,
      "maxparticipants": 500
    }
  ]
}

🧪 Testing with Postman

Import postman_collection.json

Set env variable:

base_url = http://localhost:5000


Run sequence:

Login

Verify OTP

Tournaments

📝 Assumptions & Notes
1. Real Thryl APIs are unavailable

A fully functional Mock Thryl API is implemented at port 5500.

2. Token stored in-memory

Per assignment requirements — no database/Redis used.

3. Tournament response normalization

Since real schema is unknown, a consistent normalized mapping layer was created.

4. OTP always succeeds (simulated)

No SMS gateway required.

5. Pagination + filtering implemented server-side

Assignment requires backend-side filtering and paging.

6. DevOps choices

Multi-stage Docker build for optimized production image

CI pipeline assumes Node.js 18 target environment

Healthcheck at /health

7. Logging strategy

Structured JSON logging adopted as production best practice.

🚀 Development Scripts
npm run dev      # Development server with nodemon
npm start        # Production server
npm run mock     # Run mock Thryl API

🤝 Contributing

Standard PR workflow using branches.

📄 License

This project was created for a backend + DevOps assignment.