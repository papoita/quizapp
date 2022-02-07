const express = require('express');
const router = express.Router();

module.exports = (db) =>
{
  //CREATE
  router.post("/", (req, res) =>
  {
    // const { user_id } = req.session;
    const user_id = 1;
    let public = req.body.is_public || "FALSE";
    const date = new Date().toJSON().slice(0,10);
    // const validUser = db.query(`SELECT * FROM users WHERE id = $1;`, [user_id]).then(data => data.rows[0]);

    if (!user_id)
    {
      return res.status(400).send({ message: "User is not logged in" })
    }

    // if (!validUser)
    // {
    //   return res.status(400).send({ message: "User session is not valid" })
    // }

    if (!req.body.quiz_name)
    {
      return res.status(400).send({
        Error: "A quiz needs a quiz name!"
      })
    }

    // Helper Function
    const addQuestionsToDb = (object, id) => {
    for(let i = 0; i < object.question.length; i++) {
      db.query(`INSERT INTO questions (question, answer_1, answer_2, answer_3, answer_correct, quiz_id)
      VALUES ($1, $2, $3, $4, $5, $6);`, [object.question[i], object.wrong_answer1[i], object.wrong_answer2[i], object.wrong_answer3[i], object.correct_answer[i], id])
      }
    return;
    };

   db.query(`INSERT INTO quizzes (quiz_name, user_id, date, public) VALUES($1, $2, $3, $4) RETURNING *;`, [req.body.quiz_name, user_id, date, public])
    .then(data => {
      const id = data.rows[0].id;
      console.log(req.body);
      addQuestionsToDb(req.body,id)

      return res.status(201).send("Quiz Created!");

    })
  });

  //READ
  //all
  router.get("/", (req, res) =>
  {
    const user_id = 1;
    // const { user_id } = req.session;
    if (!user_id)
    {
      return res.status(400).send({ message: "User is not logged in" })
    }

    const validUser = db.query(`SELECT * FROM users WHERE id = $1;`, [user_id]).then(data => data.rows[0]);
    if (!validUser)
    {
      return res.status(400).send({ message: "User session is not valid" })
    }

    const quizzes = db.query(`SELECT * FROM quizzes;`).then(data => data.rows);
    return res.status(201).send({ message: "List of all quizzes", quizzes })
  });

  // attempt quiz //api/quizzes/:id
  router.get("/:id", (req, res) =>
  {
    // const { user_id } = req.session;
    const user_id = 1;

    if (!user_id)
    {
      return res.status(400).send({ message: "User is not logged in" })
    }

    const validUser = db.query(`SELECT * FROM users WHERE id = $1;`, [user_id]).then(data => data.rows[0]);
    if (!validUser)
    {
      return res.status(400).send({ message: "User session is not valid" })
    }

    // const quiz_id = db.query(`SELECT * FROM questions JOIN quizzes on questions.quiz_id = quizzes.id WHERE questions.quiz_id = $1;`, [quiz_id])
    // .then(data => data.rows[0]);

    db.query(`SELECT * FROM questions JOIN quizzes on questions.quiz_id = quizzes.id WHERE questions.quiz_id = $1;`, [req.params.id])
    .then(data => {

      const quiz = data.rows;
      const templateVars = { quiz };

      return res.render("quiz_attempt", templateVars);
      // return res.redirect("/");
      // return res.status(201).send({ quiz });
    })
  });



  //UPDATE
  // router.put("/:id/edit", (req, res) =>
  // {
  //   const { user_id } = req.session;
  //   if (!user_id)
  //   {
  //     return res.status(400).send({ message: "User is not logged in" })
  //   }

  //   const validUser = db.query(`SELECT * FROM users WHERE id = $1;`, [user_id]).then(data => data.rows[0]);
  //   if (!validUser)
  //   {
  //     return res.status(400).send({ message: "User session is not valid" })
  //   }

  //   const quiz = db.query(`SELECT * FROM quizzes WHERE id = $1;`, [req.params.id]).then(data => data.rows[0]);
  //   if (!quiz)
  //   {
  //     return res.status(400).send({
  //       message: "quiz not found"
  //     })
  //   }

  //   const quizBelongsToUser = quiz.user_id === validUser.id;
  //   if (!quizBelongsToUser)
  //   {
  //     return res.status(400).send({ message: "You are not the owner of this quiz" })
  //   }

  //   const { quiz_name, public } = req.body;
  //   if (!quiz_name || !public)
  //   {
  //     return res.status(400).send({
  //       message: "A quizz needs a quiz_name and a public property"
  //     })
  //   }

  //   const upadtedQuiz = db.query(`UPDATE quizzes SET quiz_name = $1, public = $2 WHERE id = $3 RETURNING *`, [quiz_name, public, req.params.id])
  //   return res.status(200).send({ message: "Quiz Updated!", quiz: upadtedQuiz })
  // });

  //DELETE
//   router.delete("/:id/delete", (req, res) =>
//   {
//     const { user_id } = req.session;
//     if (!user_id)
//     {
//       return res.status(400).send({ message: "User is not logged in" })
//     }

//     const validUser = db.query(`SELECT * FROM users WHERE id = $1;`, [user_id]).then(data => data.rows[0]);
//     if (!validUser)
//     {
//       return res.status(400).send({ message: "User session is not valid" })
//     }

//     const quiz = db.query(`SELECT * FROM quizzes WHERE id = $1;`, [req.params.id]).then(data => data.rows[0]);
//     if (!quiz)
//     {
//       return res.status(400).send({
//         message: "quiz not found"
//       })
//     }

//     const quizBelongsToUser = quiz.user_id === validUser.id;
//     if (!quizBelongsToUser)
//     {
//       return res.status(400).send({ message: "You are not the owner of this quiz" })
//     }

//     db.query(`DELETE FROM quizzes WHERE id = $1`, [req.params.id])
//     return res.status(204).send()
//   });


  return router;
};
