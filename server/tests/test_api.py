from fastapi.testclient import TestClient
from ..src.main import app
from sqlalchemy import create_engine, StaticPool
from sqlalchemy.orm import sessionmaker
from ..src.database.core import get_db, Base
from ..src.database.entities import Employee


DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}, poolclass=StaticPool
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


client = TestClient(app)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


def setup() -> None:
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    db_user = Employee(
        firstName="Mark",
        email="example@example.de",
        lastName="Duckan",
        password_hash="$2b$12$Ao2RuLoyLT2XJTq/AULyg.GsfsD2UKKRQZVovoPCichISUtnf4Ea6",
    )
    session.add(db_user)
    session.commit()
    session.close()


def teardown() -> None:
    Base.metadata.drop_all(bind=engine)


def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == ["message: " " Hello, have a nice day!"]


def test_signup_user():
    try:
        setup()
        response = client.post(
            "/users/signup",
            json={
                "email": "example@se.de",
                "firstName": "John",
                "lastName": "Zink",
                "password": "123qwe",
            },
        )
        assert response.status_code == 200, response.text
        data = response.json()
        assert "example@se.de" in data
        assert "User with email example@se.de is created"
    finally:
        teardown()


def test_signin_user():
    try:
        setup()
        response = client.post(
            "/users/signin", json={"email": "example@example.de", "password": "123123"}
        )
        assert response.status_code == 200, response.text
        data = response.json()
        assert data["message"] == "Login successful"
        assert data["user_exists"] == True
        assert data["userRole"] == "user"
    finally:
        teardown()


def test_logout_user():
    response = client.delete("/users/signout")
    assert response.status_code == 200, response.text
    data = response.json()
    assert data["message"] == "Logout successfuly"
