

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
    db.query(`SELECT * FROM quizzes WHERE public = true;`)
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
    db.query(`SELECT * FROM quizzes WHERE user_id = 1;`)
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

  //see only one quiz or show newly created quiz
  router.get("/quizzes/:id", (req, res) =>
  {
    //quiz belongs to user
    //const quizBelongsToUser = quiz.user_id === validUser.id;
    //user logged
    //user not logged

    db.query(`SELECT * FROM quizzes WHERE id = $1;`, [req.params.id])
      .then(data =>
      {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err =>
      {
        res
          .status(500)
          .json({ error: err.message });
      });
    //like this name file
    res.render("show_quiz");
  });

  //see only one quiz or show newly created quiz
  router.get("/quizzes/:id/edit", (req, res) =>
  {
    //quiz belongs to user
    //const quizBelongsToUser = quiz.user_id === validUser.id;
    //user logged


    db.query(`SELECT * FROM quizzes WHERE id = $1;`, [req.params.id])
      .then(data =>
      {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err =>
      {
        res
          .status(500)
          .json({ error: err.message });
      });
    //like this name file
    res.render("show_quiz");
  });

  // GET ATTEMPTS ENDPOINTS
  //show result of a specific quiz attempted, make link to share wihtin this route, display in ejs the url if someone want to share it
  //RENDER all
  router.get("/attempts", (req, res) =>
  {
    res.render("show_attempt")
  });

  //RENDER one
  router.get("/attempts/:id/", (req, res) =>
  {
    res.render("show_attempt")
  });

  router.get("*", (req, res) =>
  {
    //puede ser otro render not-found-404.ejs
    res.send("Page not found");
  });

  return router;
};

