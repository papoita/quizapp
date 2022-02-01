//CRUD quizz specific

// Specific Quizz link
//it doesn't matter where this is coming from whether it is mylist or public list quiz
const express = require('express');
const router = express.Router();

module.exports = (db) =>
{
  //CREATE
  //router.post("/", (...))

  //create a quiz

  router.post("/new", (req, res) =>
  {
    res.redirect("/quiz/:id");
  });

  //attempt a specific quiz// Does this route requires a .get an dif so... how is it built?
  router.post("/:id", (req, res) =>
  {
    res.redirect("show_result");
  });


  //Post answers to a specific quiz
  router.post("/:id", (req, res) =>
  {
    //if user is loggin in then pass user id if not then just attempt
    //save results to database
    res.redirect("/results/:id");
  });

  return router;
};

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




