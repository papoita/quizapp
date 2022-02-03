DROP TABLE IF EXISTS quiz_attempts CASCADE;
CREATE TABLE quiz_attempts (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id),
  score INTEGER,
  date DATE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
