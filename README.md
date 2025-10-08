<span style="font-size: 34px;"> Production Dashboard </span>

A modern web application for visualizing production data, featuring user authentication, interactive charts, and calendar integration. Built with React frontend and FastAPI backend, providing secure access to insights, scheduling, and user management.

<span style="font-size: 24px;"> Features </span>

- User Authentication: JWT-based registration and login. Landing page with buttons for Guest (limited access) and Admin (full access) login.
- Data Visualization: Interactive charts (bar, line, pie) for production metrics using Recharts.
- Calendar Integration: Full-featured calendar for scheduling and event management.
- Admin Panel: User management dashboard for Admins.
- Responsive Design: Optimized for desktop and mobile.

<span style="font-size: 24px;">Tech Stack </span>

- Frontend: React (TypeScript), Vite, Recharts, React Calendar.
- Backend: FastAPI (Python), SQLAlchemy, JWT.
- Database: PostgreSQL.
- Other: Pytest, Uvicorn.

<span style="font-size: 24px;"> Prerequisites </span>

- Node.js (v21+).
- Python (3.12+).
- Git.

<span style="font-size: 24px;">Installation</span>

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

<span style="font-size: 24px;">Running the App </span>

- Start backend.
- Start frontend.
- Open http://localhost:5173, register/login via form or use Guest/Admin buttons.

<span style="font-size: 24px;">Testing </span>

- Backend

```cd server
pytest
```

- Fronend

```cd client
npm run test
```

<span style="font-size: 24px;"> Deployment </span>

Deployed on Render.
