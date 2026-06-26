const express = require("express");
const { activity } = require("../data/store");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

// GET /api/activity — recent activity feed (read-only)
router.get("/", asyncHandler(async (req, res) => {
  res.status(200).json(activity);
}));

module.exports = router;
