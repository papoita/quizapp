const express = require('express');
const router = express.Router();

module.exports = (db) =>
{
  //CREATE
  router.post("/", (req, res) =>
  {
    // const { user_id } = req.session;
    const user_id = 1;
    const quiz_id = req.body.quiz_id;
    const userAnswers = [];
    const quizAnswers = [];
    const date = new Date().toJSON().slice(0,10);
    let score = 0;

    //Helper Functions
    const gettingUserAnswers = (object) => {
      for (let obj in object) {
        userAnswers.push(object[obj]);
      }
      userAnswers.shift();
      return userAnswers;
    };

    const gettingQuizAnswers = (array) => {
      for (let obj of array) {
        quizAnswers.push(obj["answer_correct"]);
      }
      return quizAnswers;
    };

    const comparingAnswers = (array, array2) => {
      for (let i = 0; i < array.length; i++) {
        if (array[i] === array2[i]){
          score++;
        }
      }

      return db.query(`INSERT INTO quiz_attempts (quiz_id, user_id, score, date) VALUES ($1,$2,$3,$4) RETURNING *;`, [quiz_id, user_id, score, date]);
    };


    db.query(`SELECT answer_correct FROM questions WHERE quiz_id = $1;`, [quiz_id])
    .then(data => {

      comparingAnswers(gettingUserAnswers(req.body), gettingQuizAnswers(data.rows))
      .then(results => {

        return res.redirect(`/results/${results.rows[0].id}`);

      });
    }).catch(err => {
      console.log("Error occured in attempts.js!:", err);
    });

  });


  //READ
  //all
  // router.get("/", (req, res) =>
  // {
  //   const user_id = 1;

  //   const attempts = db.query(`SELECT * FROM quiz_attempts;`).then(data => data.rows);
  //   // return res.status(201).send({ message: "List of all attempts", attempts })
  // });

  //one api/attempts/:id
  router.get("/:id", (req, res) =>
  {
    // console.log("hello ");
    // const user_id = 1;
    // const attempt = db.query(`SELECT score, COUNT(questions.id) FROM quiz_attempts JOIN questions ON quiz_attempts.quiz_id = questions.quiz_id WHERE id = $1 GROUP BY score;`, [req.params.id]).then(data => data.rows[0]);
    // return res.status(201).send({ message: "attempt found", attempt })


    const attempt = db.query(`SELECT * FROM quiz_attempts;`).then(data => res.status(201).send(data.rows));

    // return res.status(201).send({ message: "attempt found", attempt })

    // const attempt = db.query(`SELECT score, COUNT(quiz.id) FROM quiz_attempts JOIN questions ON quiz_attempts.quiz_id = questions.quiz_id WHERE quiz_attempts.id = $1 GROUP BY score;`, [req.params.id]).then(data => data.rows[0]);
    // return res.status(201).send({ message: "attempt found", attempt })
  });

  //UPDATE
  // router.put("/:id/edit", (req, res) =>
  // {
  //   const { user_id } = req.session;

  //   const attempt = db.query(`SELECT * FROM quiz_attempts WHERE id = $1;`, [req.params.id]).then(data => data.rows[0]);
  //   if (!attempt)
  //   {
  //     return res.status(400).send({
  //       message: "attempt not found"
  //     })
  //   }

  //   const attemptBelongsToUser = quiz_attempts.user_id === user.id;
  //   if (!attemptBelongsToUser)
  //   {
  //     return res.status(400).send({ message: "You are not the creator of this attempt" })
  //   }

  //   const { score } = req.body;
  //   if (!score)
  //   {
  //     return res.status(400).send({
  //       message: "An attempt needs a score"
  //     })
  //   }
  //   const updatedAttemp = db.query(`UPDATE quiz_attempts SET score = $1 WHERE id = $3 RETURNING *`, [score, req.params.id])
  //   return res.status(200).send({ message: "Attempt Updated!", attempt: updatedAttemp })

  // });

  //DELETE
  // router.delete("/:id/delete", (req, res) =>
  // {
  //   const { user_id } = req.session;

  //   const attempt = db.query(`SELECT * FROM quiz_attempts WHERE id = $1;`, [req.params.id]).then(data => data.rows[0]);
  //   if (!attempt)
  //   {
  //     return res.status(400).send({
  //       message: "attempt not found"
  //     })
  //   }

  //   const attemptBelongsToUser = quiz_attempts.user_id === user.id;
  //   if (!attemptBelongsToUser)
  //   {
  //     return res.status(400).send({ message: "You are not the creator of this attempt" })
  //   }

  //   db.query(`DELETE FROM quiz_attempts WHERE id = $1`, [req.params.id])
  //   return res.status(204).send()
  // });


  return router;
};
