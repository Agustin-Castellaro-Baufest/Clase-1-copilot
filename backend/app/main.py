from fastapi import FastAPI, HTTPException, status

from app.auth import authenticate_user, create_access_token, create_refresh_token, decode_refresh_token
from app.config import settings
from app.models import AccessTokenResponse, LoginRequest, RefreshRequest, TokenResponse

app = FastAPI(
    title="JWT Authentication API",
    description="FastAPI application demonstrating JWT-based authentication with access and refresh tokens.",
    version="1.0.0",
)


@app.post(
    "/auth/login",
    response_model=TokenResponse,
    status_code=status.HTTP_200_OK,
    summary="Obtain access and refresh tokens",
)
def login(body: LoginRequest) -> TokenResponse:
    """
    Authenticate with **username** and **password**.

    Returns an access token (valid for 300 seconds) and a refresh token
    (valid for 24 hours).
    """
    if not authenticate_user(body.username, body.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return TokenResponse(
        access_token=create_access_token(body.username),
        refresh_token=create_refresh_token(body.username),
        expires_in=settings.ACCESS_TOKEN_EXPIRE_SECONDS,
    )


@app.post(
    "/auth/refresh",
    response_model=AccessTokenResponse,
    status_code=status.HTTP_200_OK,
    summary="Refresh the access token",
)
def refresh(body: RefreshRequest) -> AccessTokenResponse:
    """
    Exchange a valid **refresh_token** for a new access token.

    The refresh token must have been issued by this service and must not be
    expired.
    """
    username = decode_refresh_token(body.refresh_token)
    if username is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return AccessTokenResponse(
        access_token=create_access_token(username),
        expires_in=settings.ACCESS_TOKEN_EXPIRE_SECONDS,
    )


@app.get("/health", summary="Health check")
def health() -> dict:
    return {"status": "ok"}
