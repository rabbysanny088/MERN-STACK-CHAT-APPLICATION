const express = require("express");
const { Signup, Logout, Login } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", Signup);

router.post("/login", Login);

router.post("/logout", Logout);

module.exports = router;
