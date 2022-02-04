const express = require('express');
const { user } = require('pg/lib/defaults');
const router = express.Router();

module.exports = (db) =>
{
  //register
  router.post("/register", (req, res) =>
  {
    const { user_id } = req.session;
    if (user_id)
    {
      return res.status(400).send({ message: "User already has a session", user })
    }

    const { email, password } = req.body;
    if (!email || !password)
    {
      return res.status(400).send({ message: "You need an email and password" })
    }

    const emailExists = db.query(`SELECT * FROM users WHERE email = $1;`, [email]).then(data => data.rows[0]);
    if (emailExists)
    {
      return res.status(400).send({ message: "Email already in use" })
    }

    const user = db.query(`INSERT INTO users (email, password) VALUES($1, $2);`, [email, password]).then(data => data.rows[0]);
    return res.status(201).send({ message: "User Created!", user })
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


