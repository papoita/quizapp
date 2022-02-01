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


  //create register post route



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









  return router;
};

//when do we need to get from the database : results, students,
