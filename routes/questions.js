const express = require('express');
const router = express.Router();

module.exports = (db) =>
{
  //CREATE
  router.post("/:id", (req, res) =>
  {
    return res.redirect("share_attempt");
  });

  //READ
  //all
  router.get("/", (req, res) =>
  {
    return res.redirect("share_attempt");
  });

  //one
  router.get("/:id", (req, res) =>
  {
    const id = parseInt(req.params.id);
    db.query(`SELECT * FROM questions JOIN quizzes on questions.quiz_id = quizzes.id WHERE questions.quiz_id = $1;`, [id])
    .then(data => {
      const quiz = data.rows;
      return res.json({quiz});
    }).catch(err => {
      console.log(err);
    })
  });

  //UPDATE
  router.put("/:id/edit", (req, res) =>
  {
    return res.redirect("share_attempt");
  });

  //DELETE
  router.delete("/:id/delete", (req, res) =>
  {
    return res.redirect("share_attempt");
  });


  return router;
};
