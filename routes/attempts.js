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
    return res.redirect("share_attempt");
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



