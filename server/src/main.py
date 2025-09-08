from fastapi import FastAPI
import uvicorn
from .employee.routers import router_user

app = FastAPI()


@app.get("/test")
def test():
    return ("message: " " Hello, have a nice day!")

app.include_router(router_user)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
