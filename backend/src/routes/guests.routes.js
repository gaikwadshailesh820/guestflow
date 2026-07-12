const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const controller = require("../controllers/guest.controller");
const { asyncHandler } = require("../utils/asyncHandler");

// Protect all guest routes
router.use(verifyToken);
  
router.get(
  "/search",
  asyncHandler(controller.searchGuests)
);

router.get(
  "/",
  asyncHandler(controller.getGuests)
);

router.get(
  "/:id",
  asyncHandler(controller.getGuest)
);

router.post(
  "/",
  asyncHandler(controller.createGuest)
);

router.put(
  "/:id",
  asyncHandler(controller.updateGuest)
);

router.delete(
  "/:id",
  asyncHandler(controller.deleteGuest)
);

module.exports = router;