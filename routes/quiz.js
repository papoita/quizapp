//CRUD quizz specific

// Specific Quizz link
//it doesn't matter where this is coming from whether it is mylist or public list quiz
const express = require('express');
const router = express.Router();

module.exports = (db) =>
{
  //CREATE
  //router.post("/", (...))

  //READALL
  //router.get("/", (...))

  //READONE
  //router.get("/:id", (...))

  //UPDATE
  //router.put("/:id/edit", (...))

  //DELETE
  //router.delete("/:id/delete", (...))

  //DESTROY
  //router.delete("/:id/destroy", (...))

  router.get("/:id", (req, res) =>
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

  //Post answers to a specific quiz
  router.post("/:id", (req, res) =>
  {
    //if user is loggin in then pass user id if not then just attempt
    //save results to database
    res.redirect(":id/results/:resultid");
  });



  //make link to share wihtin this route only display in wjs the line if someone want to share it
  router.get("/:id/results/:resultid", (req, res) =>
  {

    res.render("show_results")
  });
  return router;
};

