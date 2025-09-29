Production Dashboard

A modern web application for visualizing production data, featuring user authentication, interactive charts, and a calendar integration. Built with a full-stack architecture using React for the frontend and FastAPI for the backend, this dashboard provides secure access to insights and scheduling tools.FeaturesUser Authentication: Secure JWT-based login and user registration.
Data Visualization: Interactive charts (e.g., bar, line, pie) for production metrics.
Calendar Integration: Full-featured calendar using a React library for scheduling and event management.
Responsive Design: Optimized for desktop and mobile devices.
API-Driven: Backend endpoints for fetching and managing data securely.

Tech StackFrontend: React (with TypeScript), Vite (build tool), Rechart (for visualizations), React Calendar (for scheduling).
Backend: FastAPI (Python framework), SQLAlchemy (ORM), JWT (authentication).
Database: PostgreSQL (configurable via DATABASE_URL environment variable).
Other: Pytest (testing), Uvicorn (server).

Prerequisites
Node.js (v21+ for frontend).
Python (3.12+ for backend).
Git for cloning the repository.

Installation
Frontend
Navigate to the frontend directory (or root if integrated):

cd frontend

Install dependencies:

npm install

Run the development server:

npm run dev

The app will be available at http://localhost:5173 (default Vite port).

Backend
Navigate to the server directory:

cd server

Install dependencies:

pip install -r requirements.txt

Set up environment variables (create a .env file):

DATABASE_URL=your_database_connection_string
SECRET_KEY=your_jwt_secret_key # For JWT signing

Run the development server:

uvicorn src.main:app --reload --host 0.0.0.0 --port 8000

The API will be available at http://localhost:8000. Check interactive docs at http://localhost:8000/docs.

Running the Full Application
Start the backend server (as above).
Start the frontend dev server (as above).
Open http://localhost:5173 in your browser.
Register a new user via the login form, then authenticate to access visualizations.

The frontend proxies API requests to the backend (configure VITE_API_URL=http://localhost:8000 in .env if needed).

TestingBackend TestsRun pytest in the server directory:

cd server
pytest

Ensure DATABASE_URL is set for integration tests.

Deployment

Frontend: Build with npm run build and deploy to Render/AWS.
Backend: Use Docker or deploy to AWS/Render.
