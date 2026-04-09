"""
config.py — AI Harness configuration.
Loads from environment variables (.env.local at repo root, then .env in this dir).
"""

import os
from pathlib import Path
from dotenv import load_dotenv

PROJECT_ROOT = Path(__file__).resolve().parents[1]

load_dotenv(PROJECT_ROOT / ".env.local")
load_dotenv(PROJECT_ROOT / ".env")
load_dotenv(Path(__file__).resolve().parent / ".env")

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")
OPENAI_MODEL = os.environ.get("OPENAI_MODEL", "gpt-4o")  # gpt-5.4 when available

DATABASE_URL_READONLY = os.environ.get(
    "DATABASE_URL_READONLY",
    "postgresql://dev:devpassword@localhost:5433/intex2_social_media",
)

HARNESS_API_KEY = os.environ.get("HARNESS_API_KEY", "dev-harness-key")

MAX_TOOL_ROUNDS = 10
