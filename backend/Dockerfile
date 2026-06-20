# syntax=docker/dockerfile:1

FROM python:3.11-slim AS base

# Install Poetry
ENV POETRY_VERSION=1.8.3 \
    POETRY_HOME=/opt/poetry \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_NO_INTERACTION=1

RUN pip install --no-cache-dir "poetry==${POETRY_VERSION}"

WORKDIR /app

# Copy dependency files and install production dependencies
COPY pyproject.toml poetry.lock* ./
RUN /opt/poetry/bin/poetry install --only main --no-root

# Copy application source
COPY app/ ./app/

EXPOSE 8000

CMD ["/opt/poetry/bin/poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
