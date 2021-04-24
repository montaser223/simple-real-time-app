const express = require("express");
const router = express.Router();
const messages = [];
const users = {};

router.get("/:id", (req, res) => {
  if (users[req.params.id] == undefined) {
    users[req.params.id] = messages.length - 1;
    res.status(200).json(messages);
  } else {
    if (users[req.params.id] == messages.length - 1)
      return res.status(200).json([]);
    const newArr = messages.filter((msg, i) => i > users[req.params.id]);
    res.status(200).json(newArr);
    users[req.params.id] = messages.length - 1;
  }
});

router.post("/", (req, res) => {
  messages.push(req.body);
  res.status(204).end();
});

module.exports = router;
