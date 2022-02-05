const express = require('express');
const router = express.Router();

module.exports = (db) =>
{
  //CREATE
  router.post("/", (req, res) =>
  {
    //const { user_id } = req.session;
    const user_id = 1;
    // if (!user_id)
    // {
    //   return res.status(400).send({ message: "User is not logged in" })
    // }

    // const validUser = db.query(`SELECT * FROM users WHERE id = $1;`, [user_id]).then(data => data.rows[0]);
    // if (!validUser)
    // {
    //   return res.status(400).send({ message: "User session is not valid" })
    // }
    console.log(req.body);
    const { quiz_name, public } = req.body;
    if (!quiz_name)
    {
      return res.status(400).send({
        message: "A quizz needs a quiz_name"
      })
    }

    //no user_id insterted right?
    const quiz = db.query(`INSERT INTO quizzes (quiz_name, user_id, public) VALUES($1, $2, $3) RETURNING *;`, [quiz_name, user_id, public]).then(data => data.rows[0]);
    return res.status(201).send({ message: "Quiz Created!", quiz })
  });

  //READ
  //all
  router.get("/", (req, res) =>
  {
    const user_id = 1;
    // const { user_id } = req.session;
    // if (!user_id)
    // {
    //   return res.status(400).send({ message: "User is not logged in" })
    // }

    // const validUser = db.query(`SELECT * FROM users WHERE id = $1;`, [user_id]).then(data => data.rows[0]);
    // if (!validUser)
    // {
    //   return res.status(400).send({ message: "User session is not valid" })
    // }

    const quizzes = db.query(`SELECT * FROM quizzes;`).then(data => data.rows);
    return res.status(201).send({ message: "List of all quizzes", quizzes })
  });

  //one
  router.get("/:id", (req, res) =>
  {
    const user_id = 1;
    // const { user_id } = req.session;
    // if (!user_id)
    // {
    //   return res.status(400).send({ message: "User is not logged in" })
    // }

    // const validUser = db.query(`SELECT * FROM users WHERE id = $1;`, [user_id]).then(data => data.rows[0]);
    // if (!validUser)
    // {
    //   return res.status(400).send({ message: "User session is not valid" })
    // }

    const quiz = db.query(`SELECT * FROM quizzes WHERE id = $1;`, [req.params.id]).then(data => data.rows[0]);
    return res.status(201).send({ message: "Quiz found", quiz })
  });

  //UPDATE
  router.put("/:id/edit", (req, res) =>
  {
    const { user_id } = req.session;
    // if (!user_id)
    // {
    //   return res.status(400).send({ message: "User is not logged in" })
    // }

    // const validUser = db.query(`SELECT * FROM users WHERE id = $1;`, [user_id]).then(data => data.rows[0]);
    // if (!validUser)
    // {
    //   return res.status(400).send({ message: "User session is not valid" })
    // }

    const quiz = db.query(`SELECT * FROM quizzes WHERE id = $1;`, [req.params.id]).then(data => data.rows[0]);
    if (!quiz)
    {
      return res.status(400).send({
        message: "quiz not found"
      })
    }

    const quizBelongsToUser = quiz.user_id === user.id;
    if (!quizBelongsToUser)
    {
      return res.status(400).send({ message: "You are not the owner of this quiz" })
    }

    const { quiz_name, public } = req.body;
    if (!quiz_name || !public)
    {
      return res.status(400).send({
        message: "A quiz needs a quiz_name and a public property"
      })
    }

    const updatedQuiz = db.query(`UPDATE quizzes SET quiz_name = $1, public = $2 WHERE id = $3 RETURNING *`, [quiz_name, public, req.params.id])
    return res.status(200).send({ message: "Quiz Updated!", quiz: updatedQuiz })
  });

  //DELETE
  router.delete("/:id/delete", (req, res) =>
  {
    const { user_id } = req.session;
    // if (!user_id)
    // {
    //   return res.status(400).send({ message: "User is not logged in" })
    // }

    // const validUser = db.query(`SELECT * FROM users WHERE id = $1;`, [user_id]).then(data => data.rows[0]);
    // if (!validUser)
    // {
    //   return res.status(400).send({ message: "User session is not valid" })
    // }

    const quiz = db.query(`SELECT * FROM quizzes WHERE id = $1;`, [req.params.id]).then(data => data.rows[0]);
    if (!quiz)
    {
      return res.status(400).send({
        message: "quiz not found"
      })
    }

    const quizBelongsToUser = quiz.user_id === user_id;
    if (!quizBelongsToUser)
    {
      return res.status(400).send({ message: "You are not the owner of this quiz" })
    }

    db.query(`DELETE FROM quizzes WHERE id = $1`, [req.params.id])
    return res.status(204).send()
  });


  return router;
};
