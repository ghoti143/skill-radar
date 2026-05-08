CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS jobs (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  company     TEXT,
  description TEXT NOT NULL,
  skills      TEXT[],
  embedding   vector(512),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
