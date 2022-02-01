/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

//CREATE
//router.post("/", (...))

//READALL
//router.get("/", (...))
//views folder -res.render

//READONE
//router.get("/:id", (...))
//views folder -res.render

//UPDATE
//router.put("/:id/edit", (...))

//DELETE
//router.delete("/:id/delete", (...))

//DESTROY
//router.delete("/:id/destroy", (...))


const express = require('express');
const router = express.Router();


module.exports = (db) =>
{
  //CREATE
  //router.post("/", (...))

  //register
  router.post("/register", (req, res) =>
  {
    req.session = null;
    return res.redirect("/register");
  });

  //login - requires user exists
  router.post("/login", (req, res) =>
  {
    const email = req.body.email;
    const password = req.body.password;
    return res.redirect("/my_quizzes");
  });

  //logout
  router.post("/logout", (req, res) =>
  {
    req.session = null;
    return res.redirect("/");
  });
  return router;
};


