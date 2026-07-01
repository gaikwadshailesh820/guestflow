const express = require("express");
const router = express.Router();

const controller = require("../controllers/activity.controller");
const { asyncHandler } = require("../utils/asyncHandler");

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