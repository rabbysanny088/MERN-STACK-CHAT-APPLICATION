const express = require("express");
const protectRoute = require("../middlewares/protectRoute");
const { getUsersForSidebar } = require("../controllers/user.controller");
const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);

module.exports = router;
