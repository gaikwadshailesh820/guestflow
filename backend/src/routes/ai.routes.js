const express = require("express");
const { recommendRoom } = require("../controllers/ai.controller");

const router = express.Router();

// Route configuration matching the frontend POST request
router.post("/recommend-room", recommendRoom);

module.exports = router;