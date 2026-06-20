from datetime import datetime, timedelta, timezone
from typing import Optional

from jose import JWTError, jwt
from passlib.context import CryptContext

from app.config import settings

# ---------------------------------------------------------------------------
# Password hashing
# ---------------------------------------------------------------------------
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ---------------------------------------------------------------------------
# In-memory user store (single admin user for demonstration)
# ---------------------------------------------------------------------------
# Passwords are stored as bcrypt hashes. The value below is the hash of
# "admin123" generated with passlib.
_USERS: dict[str, str] = {
    "admin": pwd_context.hash("admin123"),
}


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(username: str, password: str) -> bool:
    hashed = _USERS.get(username)
    if hashed is None:
        return False
    return verify_password(password, hashed)


# ---------------------------------------------------------------------------
# JWT helpers
# ---------------------------------------------------------------------------
def _create_token(data: dict, expire_seconds: int, token_type: str) -> str:
    payload = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(seconds=expire_seconds)
    payload.update({"exp": expire, "token_type": token_type})
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def create_access_token(username: str) -> str:
    return _create_token(
        {"sub": username},
        settings.ACCESS_TOKEN_EXPIRE_SECONDS,
        "access",
    )


def create_refresh_token(username: str) -> str:
    return _create_token(
        {"sub": username},
        settings.REFRESH_TOKEN_EXPIRE_SECONDS,
        "refresh",
    )


def decode_refresh_token(token: str) -> Optional[str]:
    """Validate a refresh token and return the username (sub) or None."""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        token_type: str = payload.get("token_type", "")
        username: str = payload.get("sub", "")
        if token_type != "refresh" or not username:
            return None
        return username
    except JWTError:
        return None
