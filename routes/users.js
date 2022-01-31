/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) =>
{
  //FRONT END routes I think al these routes go in the server file

  //BACKEND routes -require access or reading db


  //homepage -
  router.get("/", (req, res) =>
  {
    //homepage would be the ejs
    return res.render("homegage");
    //return res.redirect("/quizzes");
  });

  //View Quizzes = All quizzes page ? Would this be the same as homepage? public
  // router.get("/quizzes", (req, res) => {
  //   return res.redirect("/homepage");
  // });

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

  //login - requires user exists
  router.post("/login", (req, res) =>
  {
    const email = req.body.email;
    const password = req.body.password;
    return res.redirect("/my_quizzes");
    //return res.redirect("/${user}");

  });

  //register routes? .get / .post

  //logout
  router.post("/logout", (req, res) =>
  {
    req.session = null;
    return res.redirect("/");
  });

  //My quizzes page private requires logged user, this will be the same route as login endpoint because they will have the same look and feel in this case show the list of private quizzes. put login in this route retrieving the user scpecific quizzes
  router.get(":id/quizzes", (req, res) =>
  {
    //ejs my_quizzes
    return res.render("my_quizzes");
  });

  //create a quiz logged in vs not logged in? how to handle that (regardless textarea input public vs private and goes into database)
  // router.get("/quizzes/new", (req, res) => {
  //   return res.render("quizzes_new");
  // });
  //OR? &? private
  router.get(":id/quizzes/new", (req, res) =>
  {
    return res.render("quizzes_new", { user });
  });

  //post a new quiz (privat/public is boolean but decided on the erd)
  router.post(":id/quizzes/new", (req, res) =>
  {

    return res.redirect("my_quizzes");

  });





  return router;
};

//when do we need to get from the database : results, students,
