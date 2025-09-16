from fastapi import FastAPI
import uvicorn
from .employee.routers import router_user
from .charts.routers import router_charts
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def test():
    return "message: " " Hello, have a nice day!"


app.include_router(router_user)
app.include_router(router_charts)


load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))
PORT = int(os.getenv("PORT",8000))


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=PORT)
