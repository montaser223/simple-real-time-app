const express = require("express");
const router = express.Router();
const subscribers = {};

router.get("/", (req, res) => {
  const id = Math.ceil(Math.random() * 1000 + 1);
  subscribers[id] = res;
});

router.post("/", (req, res) => {
  Object.entries(subscribers).forEach(([id, response]) => {
    response.json(req.body);
    delete subscribers[id];
  });
  res.status(204).end();
});

module.exports = router;
