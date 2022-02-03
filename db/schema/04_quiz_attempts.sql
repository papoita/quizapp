DROP TABLE IF EXISTS quiz_attempts CASCADE;
CREATE TABLE quiz_attempts (
  id SERIAL PRIMARY KEY NOT NULL,
  score INTEGER,
  date DATE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
