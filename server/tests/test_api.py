from fastapi.testclient import TestClient
from ..src.main import app
import os

os.environ['DATABASE_URL'] = 'sqlite:///:memory:'


client = TestClient(app)


def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == ["message: " " Hello, have a nice day!"]
