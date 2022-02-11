

const express = require('express');
const router = express.Router();

module.exports = (db) =>
{

  // router.get("/", (req, res) =>
  // {
  //   res.send("Welcome to QUIZAPP: the best way to test your knowledge");
  // });

  //GET RENDER USER AUTHORIZATION ENDPOINTS

  //register
  router.get("/register", (req, res) =>
  {
    const user = null;
    res.render("my_quizzes", { user, error: null });
  });

  //login - display login page
  router.get("/login", (req, res) =>
  {
    return res.render("login", { user, error: null });
  });

  // GET RENDER QUIZ ENDPOINTS

  //GET HOME ENDPOINT
  router.get("/", (req, res) =>
  {
    db.query(`SELECT quizzes.*, users.username FROM quizzes JOIN users ON users.id = quizzes.user_id
    WHERE public = true
    ORDER BY id;`)
      .then(data =>
      {
        const quizzes = data.rows;
        const templateVars = {
          quizzes
        }
        return res.render("index", templateVars);
      })
      .catch(err =>
      {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  //My quizzes page private requires logged user, this will be the same route as login endpoint because they will have the same look and feel in this case show the list of private quizzes. put login in this route retrieving the user scpecific quizzes
  router.get("/myquizzes", (req, res) =>
  {
    db.query(`SELECT quizzes.*, users.username FROM quizzes JOIN users ON users.id = quizzes.user_id
    WHERE users.id = 1
    ORDER BY id;`)
      .then(data =>
      {
        const quizzes = data.rows;
        const templateVars = {
          quizzes
        }
        return res.render("index", templateVars);
      })
      .catch(err =>
      {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  // quizz create form
  router.get("/quizzes/create", (req, res) =>
  {
    return res.render("quiz_create");
  });

  // New quiz created
  router.get("/quiz_new/:id/", (req, res) =>
  {
    const quiz_id = Number(req.params.id);
    db.query('SELECT * FROM quizzes WHERE id = $1', [quiz_id])
    .then(data => {
      const quiz = data.rows[0];
      if (!quiz.id) {
        return res
        .status(500)
        .send({ error: "Quiz not found" })
      }
      const templateVars = quiz;
      return res.render("quiz_new", templateVars);
    }).catch(err => {
      res
        .status(500)
        .json({ error: err.message })
    })
  })

  // Quiz results
  router.get("/results/:id/", (req, res) =>
  {
    const attempt_id = Number(req.params.id);
    db.query(`SELECT quiz_attempts.*, quizzes.quiz_name, COUNT(questions.*) AS number_of_questions
    FROM quiz_attempts
    JOIN quizzes ON quiz_attempts.quiz_id = quizzes.id
    JOIN questions ON questions.quiz_id = quizzes.id
    WHERE quiz_attempts.id = $1
    GROUP BY quiz_attempts.id, quizzes.quiz_name`, [attempt_id])
    .then(data => {
      const attempt = data.rows[0];
      if (!attempt.id) {
        return res
        .status(500)
        .send({ error: "Results not found" })
      }
      const templateVars = attempt;
      return res.render("quiz_results", templateVars);
    }).catch(err => {
      res
        .status(500)
        .json({ error: err.message })
    })

  });

  //see only one quiz or show newly created quiz
  // router.get("/quizzes/:id", (req, res) =>
  // {
  //   //quiz belongs to user
  //   //const quizBelongsToUser = quiz.user_id === validUser.id;
  //   //user logged
  //   //user not logged

  //   db.query(`SELECT * FROM quizzes WHERE id = $1;`, [req.params.id])
  //     .then(data =>
  //     {
  //       const users = data.rows;
  //       res.json({ users });
  //     })
  //     .catch(err =>
  //     {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  //   //like this name file
  //   res.render("quiz_attempt");
  // });

  //see only one quiz or show newly created quiz
  // router.get("/quizzes/:id/edit", (req, res) =>
  // {
  //   //quiz belongs to user
  //   //const quizBelongsToUser = quiz.user_id === validUser.id;
  //   //user logged


  //   db.query(`SELECT * FROM quizzes WHERE id = $1;`, [req.params.id])
  //     .then(data =>
  //     {
  //       const users = data.rows;
  //       res.json({ users });
  //     })
  //     .catch(err =>
  //     {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  //   //like this name file
  //   res.render("show_quiz");
  // });

  // GET ATTEMPTS ENDPOINTS
  //show result of a specific quiz attempted, make link to share wihtin this route, display in ejs the url if someone want to share it
  //RENDER all
  // router.get("/attempts", (req, res) =>
  // {
  //   res.render("show_attempt")
  // });

  //RENDER one
  // router.get("/attempts/:id/", (req, res) =>
  // {
  //   res.render("show_attempt")
  // });

  router.get("/share_quiz", (req, res) =>
  {
    //share the link to api/quizzes/:id
    // we need the user_id, score, and number of quiz questions
    res.render("test_page"); //placeholder
  });

  router.get("/share_results", (req, res) =>
  {
    //share the link to api/attempts/:id
    res.render("test_page"); //placeholder
  });

  router.get("*", (req, res) =>
  {
    //puede ser otro render not-found-404.ejs
    res.send("Page not found");
  });

  //share attempt.js (https://github.com/papoita/quizapp/blob/master/docs/wireframes/share_attempt.pdf)

  // info we'll need for this page
  // username & quiz_name & quiz_id & quiz_attempt.score & COUNT(id) questions WHERE quiz_id = quiz_id


  return router;
};
