const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", (req, res) => {
  const { username, password, email } = req.body;

  const user = new User({
    username,
    password,
    email,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(user);
    }
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = User.findOne({ username, password });

  if (!user) {
    res.status(401).send("Usuario o contraseña incorrectos");
  } else {
    res.status(200).send({ token: user.generateToken() });
  }
});