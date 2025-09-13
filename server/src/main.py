from fastapi import FastAPI
import uvicorn
from .employee.routers import router_user
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/test")
def test():
    return "message: " " Hello, have a nice day!"


app.include_router(router_user)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
