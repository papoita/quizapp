/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //FRONT END routes I think al these routes go in the server file

//BACKEND routes -require access or reading db


//homepage -
  router.get("/", (req, res) => {
  return res.redirect("/homepage");
  //return res.redirect("/quizzes");
});

 //View Quizzes = All quizzes page ? Would this be the same as homepage? public
router.get("/quizzes", (req, res) => {
  return res.redirect("/homepage");
});

//login - display login page
  router.get("/login", (req, res) => {
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
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
 return res.redirect("/my_quizzes");
 //return res.redirect("/${user}");
});

//register routes? .get / .post

//logout
app.post("/logout", (req, res) => {
  req.session = null;
  return res.redirect("/homepage");
});

 //My quizzes page private requires logged user
router.get("/:user", (req, res) => {
  return res.redirect("/my_quizzes");
});

//create a quiz logged in vs not logged in? how to handle that (regardless textarea input public vs private and goes into database)
router.get("/quizzes/new", (req, res) => {
  return res.render("quizzes_new");
});
//OR? &? private
router.get("/:user/new", (req, res) => {
  return res.redirect("quizzes_new", { user});
});

//post a new quiz public
router.post("/quizzes/new", (req, res) =>{
 return res.redirect("/homepage");
 //return res.redirect("/${user}");
  });

//post a new quiz private
router.post("/:user/new", (req, res) =>{
 return res.redirect("/my_quizzes");
 //return res.redirect("/${user}"); we can decide this endpoint name is it a variable, calling JSON
  });

// Specific Quizz link
  router.get("/:quiz.id", (req, res) => {
    //this would be for our login route
    //any changes here will affect how we call files in server.js
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //Post answers to a specific quiz
    router.post("/:quiz.id", (req, res) =>{
//here is where we post a new student
//for example registering a new student
  });

  //Results from a specific attempted quiz are displayed ${quiz.id.result}?
  router.get("/:quiz.id.result", (req, res) => {
    //this would be for our login route
    //any changes here will affect how we call files in server.js
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/quizzes.json", (req, res) => {
  res.json(quizzesDatabase);
});

  router.get("* ", (req, res) => {
  res.send("Page not found");
});

  return router;
};

//when do we need to get from the database : results, students,
