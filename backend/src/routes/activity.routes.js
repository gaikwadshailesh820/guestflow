const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const controller = require("../controllers/activity.controller");
const { asyncHandler } = require("../utils/asyncHandler");

// Protect all activity routes
router.use(verifyToken);

router.get(
  "/",
  asyncHandler(controller.getActivities)
);

router.get(
  "/:id",
  asyncHandler(controller.getActivity)
);

router.post(
  "/",
  asyncHandler(controller.createActivity)
);

router.put(
  "/:id",
  asyncHandler(controller.updateActivity)
);

router.delete(
  "/:id",
  asyncHandler(controller.deleteActivity)
);

module.exports = router;