# Production Dashboard

A modern web application for visualizing production data, featuring user authentication, interactive charts, and calendar integration. Built with React frontend and FastAPI backend, providing secure access to insights, scheduling, and user management.

## Features

- User Authentication: JWT-based registration and login. Landing page with buttons for Guest (limited access) and Admin (full access) login.
- Data Visualization: Interactive charts (bar, line, pie) for production metrics using Recharts.
- Calendar Integration: Full-featured calendar for scheduling and event management.
- Admin Panel: User management dashboard for Admins.
- Responsive Design: Optimized for desktop and mobile.

## Tech Stack

- Frontend: React (TypeScript), Vite, Recharts, React Calendar.
- Backend: FastAPI (Python), SQLAlchemy, JWT.
- Database: PostgreSQL.
- Other: Pytest, Uvicorn.

## Prerequisites

- Node.js (v21+).
- Python (3.12+).
- Git.

## Installation

Frontend

```cd frontend
npm install
npm run dev
```

Backend

```cd server
pip install -r requirements.txt
# Set .env: DATABASE_URL, SECRET_KEY, ALGORITHM, PYTHON_ENV
uvicorn src.main:app --reload
```

## Running the App

- Start backend.
- Start frontend.
- Open http://localhost:5173, register/login via form or use Guest/Admin buttons.

## Testing

- Backend

```cd server
pytest
```

- Fronend

```cd client
npm run test
```

## Deployment

Deployed on Render.
Please visit: https://productiondashboardclient.onrender.com/
