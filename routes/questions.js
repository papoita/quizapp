const express = require('express');
const router = express.Router();

module.exports = (db) =>
{
  //CREATE
  router.post("/", (req, res) =>
  {
    // const user_id = 1;
    // // const quiz_id = db.query(`SELECT * FROM questions JOIN quizzes on questions.quiz_id = quizzes.id WHERE questions.quiz_id = $1;`, [quiz_id]).then(data => data.rows[0]);

    // const { question, answer_1, answer_2, answer_3, answer_correct } = req.body;

    // const question = db.query(`INSERT INTO questions (user_id, quiz_id, question, answer_1, answer_2, answer_3, answer_correct) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`, [user_id, question, answer_1, answer_2, answer_3, answer_correct]).then(data => data.rows[0]);
    // return res.status(201).send({ message: "Question Created!", question })
  });

  //READ/
  //all questions related to a specific quiz
  router.get("/", (req, res) =>
  {
    const user_id = 1;


    const quiz_id = db.query(`SELECT * FROM questions JOIN quizzes on questions.quiz_id = quizzes.id WHERE questions.quiz_id = $1;`, [quiz_id]).then(data => data.rows[0]);

    const questions = db.query(`SELECT * FROM questions;`).then(data => data.rows);
    return res.status(201).send({ message: "List of all questions related to quiz", questions })
  });

  //one question related to a specific quiz
  router.get("/:id", (req, res) =>
  {
    const user_id = 1;
    const { question_id } = req.session;

    // const question = db.query(`SELECT * FROM questions WHERE id = $1;`, [req.params.id]).then(data => data.rows[0]);
    // return res.status(201).send({ message: "Question found", question })
  });

  //UPDATE
  router.put("/:id/edit", (req, res) =>
  {
    const { user_id } = req.session;
    const { question_id } = req.session;

    const question = db.query(`SELECT * FROM questions WHERE id = $1;`, [req.params.id]).then(data => data.rows[0]);
    if (!question)
    {
      return res.status(201).send({ message: "Question not found" })
    }

    const questionBelongsToUser = quiz.user_id === user.id;
    if (!questionBelongsToUser)
    {
      return res.status(400).send({ message: "You are not the owner of this question" })
    }

    // const { question, answer_1, answer_2, answer_3, answer_correct } = req.body;
    // if (!question || !answer_1 || !answer_2 || !answer_3 || answer_correct)
    // {
    //   return res.status(400).send({
    //     message: "A question needs three false answers and one true answer"
    //   })
    // }

    const updatedQuestion = db.query(`UPDATE questions SET question = $1, answer_1 = $2, answer_2 = $3, answer_3 = $4, answer_correct = $5 RETURNING *`, [req.params.question, req.params.answer_1, req.params.answer_2, req.params.answer_3, req.params.answer_correct])
    return res.status(200).send({ message: "Question Updated!", question: updatedQuestion })
  });

  //DELETE
  router.delete("/:id/delete", (req, res) =>
  {
    const { user_id } = req.session;

    const question = db.query(`SELECT * FROM questions WHERE id = $1;`, [req.params.id]).then(data => data.rows[0]);
    if (!question)
    {
      return res.status(400).send({
        message: "question not found"
      })
    }

    const questionBelongsToUser = quiz.user_id === user.id;
    if (!questionBelongsToUser)
    {
      return res.status(400).send({ message: "You are not the owner of this question" })
    }

    db.query(`DELETE FROM questions WHERE id = $1`, [req.params.id])
    return res.status(204).send()
  });


  return router;
};
