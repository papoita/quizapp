const express = require('express');
const router = express.Router();

module.exports = (db) =>
{
  //register
  router.post("/register", (req, res) =>
  {
    const email = req.body.email;
    const password = req.body.password;
    const userExists = findUserByEmail(email, users);
    if (userExists)
    {
      res.status(403);
      return res.render("/login", {
        user: null,
        error: "Try loging in: email already in use",
      });
    }
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


