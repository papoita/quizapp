const express = require('express');
const router = express.Router();

module.exports = (db) =>
{
  router.post("/:id", (req, res) =>
  {
    return res.redirect("share_results");
  });



  //make link to share wihtin this route only display in wjs the line if someone want to share it
  router.get("/:id/", (req, res) =>
  {
    res.render("show_results")
  });


  return router;
};



