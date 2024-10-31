const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../controllers/message.controller");
const protectRoute = require("../middlewares/protectRoute");
const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessages);

module.exports = router;
