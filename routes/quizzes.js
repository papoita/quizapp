//CRUD quizz specific


const express = require('express');
const router = express.Router();

module.exports = (db) =>
{
  //CREATE
  //router.post("/", (...))

  //create a quiz
  router.post("/new", (req, res) =>
  {

    res.redirect("/quiz/:id", { user });
  });

  // edit quiz or its visibility (public or private)
  router.put("/:id/edit", (req, res) =>
  {
    //if public redirect to homepage?
    //if private redirect to myquizzes?
    //or just reload quizz page
    res.redirect("/quiz/:id");
  });

  //DELETE
  //router.delete("/:id/delete", (...))
  // delete quiz
  // router.delete("/:id/delete", (req, res) =>
  // {
  //   //if public redirect to homepage?
  //   //if private redirect to myquizzes?
  //   //or just reload quizz page
  //   res.redirect("users/:id");
  // });

  //Post answers to a specific quiz
  router.post("/:id", (req, res) =>
  {
    //if user is loggin in then pass user id if not then just attempt
    //save results to database
    res.redirect("/attempt/:id");
  });

  return router;
};







