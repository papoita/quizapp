

const express = require('express');
const router = express.Router();

module.exports = (db) =>
{
  // GET HOME ENDPOINT
  router.get("/", (req, res) =>
  {
    return res.render("index");
  });

  //GET RENDER USER AUTHORIZATION ENDPOINTS

  //login - display login page
  router.get("/login", (req, res) =>
  {
    return res.render("login", { user, error: null });
  });

  // GET RENDER QUIZ ENDPOINTS

  //My quizzes page private requires logged user, this will be the same route as login endpoint because they will have the same look and feel in this case show the list of private quizzes. put login in this route retrieving the user scpecific quizzes
  router.get("users/:id", (req, res) =>
  {
    //ejs my_quizzes
    return res.render("my_quizzes");
  });

  router.get("users/:id", (req, res) =>
  {
    //ejs my_quizzes
    return res.render("my_quizzes");
  });

  //see only one quiz or show newly created quiz
  router.get("/quiz/:id", (req, res) =>
  {

    db.query(`SELECT * FROM quizzes;`)
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

  // quizz create form
  router.get("/quiz/create", (req, res) =>
  {
    return res.render("create_quiz", { user });
  });

  // new quiz created shareable link
  router.get("/quiz/new", (req, res) =>
  {
    return res.render("new_quiz", { user });
  });

  // GET ATTEMPTS ENDPOINTS
  //show result of a specific quiz attempted, make link to share wihtin this route, display in ejs the url if someone want to share it
  router.get("/attempt/:id/", (req, res) =>
  {
    res.render("show_attempt")
  });

  return router;
};

