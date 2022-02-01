

const express = require('express');
const router = express.Router();

module.exports = (db) =>
{
  //homepage -
  router.get("/", (req, res) =>
  {
    //homepage would be the ejs
    return res.render("index");
    //return res.redirect("/quizzes");
  });

  //login - display login page
  router.get("/login", (req, res) =>
  {
    //this would be for our login route
    //any changes here will affect how we call files in server.js
    // db.query(`SELECT * FROM users;`)
    //   .then(data => {
    //     const users = data.rows;
    //     res.json({ users });
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });
    return res.render("quiz_login", { user, error: null });
  });

  //My quizzes page private requires logged user, this will be the same route as login endpoint because they will have the same look and feel in this case show the list of private quizzes. put login in this route retrieving the user scpecific quizzes
  router.get("/myquizzes", (req, res) =>
  {
    //ejs my_quizzes
    return res.render("my_quizzes");
  });

  //create a quiz logged in vs not logged in? how to handle that (regardless textarea input public vs private and goes into database)
  // router.get("/quizzes/new", (req, res) => {
  //   return res.render("quizzes_new");
  // });
  //OR? &? private
  router.get("/quizzes/new", (req, res) =>
  {
    return res.render("quizzes_new", { user });
  });

  return router;
};

