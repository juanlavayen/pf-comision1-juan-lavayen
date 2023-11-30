const express = require("express");
const router = express.Router();
const User = require("../models/User");

app.use(cors());
app.use(express.json());
app.use(bearer());

router.use(cors());


module.exports = router;
