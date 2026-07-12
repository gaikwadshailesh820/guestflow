const express = require("express");
const passport = require("../config/passport");
const authLimiter = require("../middleware/rateLimiter");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/validation");
const {
  register,
  login,
  logout,
  googleCallback,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", authLimiter, registerValidation, register);
router.post("/login", authLimiter, loginValidation, login);
router.post("/logout", authLimiter, logout);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: `${process.env.FRONTEND_URL || "http://localhost:5173"}/login` }),
  googleCallback
);

module.exports = router;
