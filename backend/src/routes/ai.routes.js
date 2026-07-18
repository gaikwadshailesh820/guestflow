const express = require("express");
const { recommendRoom } = require("../controllers/ai.controller");

const router = express.Router();

router.post("/recommend-room", recommendRoom);

module.exports = router;