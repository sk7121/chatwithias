const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  createConversation,
  getMyConversations,
} = require("../controllers/conversationController");

router.post("/", auth, createConversation);

router.get("/", auth, getMyConversations);

module.exports = router;
