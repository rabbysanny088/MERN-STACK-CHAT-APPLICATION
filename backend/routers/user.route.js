const express = require("express");
const protectRoute = require("../middlewares/protectRoute");
const {
  getUsersForSidebar,
  Profile,
} = require("../controllers/user.controller");
const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/profile/:id", protectRoute, Profile);

module.exports = router;
