from fastapi import FastAPI, WebSocket
import uvicorn
from .employee.routers import router_user
from .charts.routers import router_charts
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
import random

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))
PORT = int(os.getenv("PORT", 8000))
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:8080,https://productiondashboardclient.onrender.com",
).split(",")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    # allow_origins=[
    #     # "http://localhost:8080",
    #     # "http://localhost:5173",
    #     "https://productiondashboardclient.onrender.com",
    # ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.websocket("/ws")
async def test_websocket(websocket: WebSocket):
    print("A new websocket being created.")
    await websocket.accept()
    while True:
        try:
            # Wait for any message from the client
            await websocket.receive_text()
            # Send message to the client
            resp = {"value": random.uniform(0, 4) + 83}
            await websocket.send_json(resp)
        except Exception as e:
            print("error:", e)
            break
    print("Connection closed")


@app.get("/")
def test():
    return {"message: " " Hello, have a nice day!"}


@app.get("/debug")
async def debug():
    return {"allowed_origins": ALLOWED_ORIGINS, "port": os.getenv("PORT", 8000)}


app.include_router(router_user)
app.include_router(router_charts)


print(f"Starting server on port: {PORT}")
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=PORT)
