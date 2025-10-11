from fastapi.testclient import TestClient
from ..src.main import app
from sqlalchemy import create_engine, StaticPool
from sqlalchemy.orm import sessionmaker
from ..src.database.core import get_db
from ..src.database.entities import Employee, Base
import uuid
from httpx import AsyncClient, ASGITransport
import pytest
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine


DATABASE_URL = "sqlite+aiosqlite:///:memory:"

engine = create_async_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}, poolclass=StaticPool
)
TestingAsyncSessionLocal = async_sessionmaker(autocommit=False, autoflush=False, bind=engine)


async def override_get_db():
    async with TestingAsyncSessionLocal() as db:
        try:
            yield db
        finally:
            await db.aclose()


app.dependency_overrides[get_db] = override_get_db

TEST_USER_ID = str(uuid.uuid4())


async def setup() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    async with TestingAsyncSessionLocal() as session:
        db_user = Employee(
            firstName="Mark",
            email="example@example.de",
            lastName="Duckan",
            password_hash="$2b$12$Ao2RuLoyLT2XJTq/AULyg.GsfsD2UKKRQZVovoPCichISUtnf4Ea6",  # Upewnij się, że to hash dla "123123"
            id=TEST_USER_ID,
        )
        session.add(db_user)
        await session.commit()


async def teardown() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest.mark.asyncio
async def test_read_root():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://testserver") as client:
        response = await client.get("/")
        assert response.status_code == 200
        assert response.json() == {"message": "Hello, have a nice day!"}

@pytest.mark.asyncio
async def test_signup_user():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://testserver") as client:
        try:
            await setup()
            response = await client.post(
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
            await teardown()


@pytest.mark.asyncio
async def test_signin_user():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://testserver") as client:
        try:
            await setup()
            response = await client.post(
                "/users/signin", json={"email": "example@example.de", "password": "123123"}
            )
            assert response.status_code == 200, response.text
            data = response.json()
            assert data["message"] == "Login successful"
            assert data["user_exists"] == True
            assert data["userRole"] == "user"
        finally:
            await teardown()


@pytest.mark.asyncio
async def test_logout_user():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://testserver") as client:
        response = await client.delete("/users/signout")
        assert response.status_code == 200, response.text
        data = response.json()
        assert data["message"] == "Logout successfully"


@pytest.mark.asyncio
async def test_edit_user():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://testserver") as client:
        try:
            await setup()

            response = await client.put(
                f"/users/{TEST_USER_ID}",
                json={
                    "email": "newexample@example.de",
                    "firstName": "NewName",
                    "lastName": "NewLastName",
                    "id": TEST_USER_ID,
                    "role": "user",
                },
            )
            assert response.status_code == 200, response.text
            data = response.json()
            assert data["firstName"] == "NewName"
            assert data["lastName"] == "NewLastName"
            assert data["email"] == "newexample@example.de"
            assert data["id"] == TEST_USER_ID
        finally:
            await teardown()
