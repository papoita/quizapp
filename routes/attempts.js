const express = require('express');
const router = express.Router();

module.exports = (db) =>
{
  //CREATE
  router.post("/", (req, res) =>
  {
    const user_id = 1;
    const quiz_id = db.query(`SELECT * FROM questions JOIN quizzes on questions.quiz_id = quizzes.id WHERE questions.quiz_id = $1;`, [quiz_id]).then(data => data.rows[0]);

    const { question, answer_1, answer_2, answer_3, answer_correct } = req.body;

    const attempt = db.query(`INSERT INTO attempts (score, date) VALUES($1, $2) RETURNING *;`, [score, date]).then(data => data.rows[0]);
    return res.status(201).send({ message: "Attempt Created!", question })
  });


  //READ
  //all
  router.get("/", (req, res) =>
  {
    const user_id = 1;

    const attempts = db.query(`SELECT * FROM quiz_attempts;`).then(data => data.rows);
    return res.status(201).send({ message: "List of all attempts", attempts })
  });

  //one
  router.get("/:id", (req, res) =>
  {
    const user_id = 1;
    const attempt = db.query(`SELECT * FROM quiz_attempts WHERE id = $1;`, [req.params.id]).then(data => data.rows[0]);
    return res.status(201).send({ message: "attempt found", attempt })
  });

  //UPDATE
  router.put("/:id/edit", (req, res) =>
  {
    const { user_id } = req.session;

    const attempt = db.query(`SELECT * FROM quiz_attempts WHERE id = $1;`, [req.params.id]).then(data => data.rows[0]);
    if (!attempt)
    {
      return res.status(400).send({
        message: "attempt not found"
      })
    }

    const attemptBelongsToUser = quiz_attempts.user_id === user.id;
    if (!attemptBelongsToUser)
    {
      return res.status(400).send({ message: "You are not the creator of this attempt" })
    }

    const { score } = req.body;
    if (!score)
    {
      return res.status(400).send({
        message: "An attempt needs a score"
      })
    }
    const updatedAttemp = db.query(`UPDATE quiz_attempts SET score = $1 WHERE id = $3 RETURNING *`, [score, req.params.id])
    return res.status(200).send({ message: "Attempt Updated!", attempt: updatedAttemp })

  });

  //DELETE
  router.delete("/:id/delete", (req, res) =>
  {
    const { user_id } = req.session;

    const attempt = db.query(`SELECT * FROM quiz_attempts WHERE id = $1;`, [req.params.id]).then(data => data.rows[0]);
    if (!attempt)
    {
      return res.status(400).send({
        message: "attempt not found"
      })
    }

    const attemptBelongsToUser = quiz_attempts.user_id === user.id;
    if (!attemptBelongsToUser)
    {
      return res.status(400).send({ message: "You are not the creator of this attempt" })
    }

    db.query(`DELETE FROM quiz_attempts WHERE id = $1`, [req.params.id])
    return res.status(204).send()
  });


  return router;
};



