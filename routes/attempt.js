const express = require('express');
const router = express.Router();

module.exports = (db) =>
{
  router.post("/:id", (req, res) =>
  {
    return res.redirect("share_attempt");
  });

  return router;
};



