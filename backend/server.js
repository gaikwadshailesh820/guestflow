const roomsRoutes = require("./src/routes/rooms.routes");
const guestsRoutes = require("./src/routes/guests.routes");
const bookingsRoutes = require("./src/routes/bookings.routes");
const activityRoutes = require("./src/routes/activity.routes");
const authRoutes = require("./src/routes/auth.routes");

require("dotenv").config();
const passport = require("./src/config/passport");
const express = require("express");
const cors = require("cors");

const notFound = require("./src/middleware/notFound");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(passport.initialize());

// Tiny request logger — helps when demoing/screenshotting the Network tab.
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "GuestFlow API is running", health: "/api/health" });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/rooms", roomsRoutes);
app.use("/api/guests", guestsRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/auth", authRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`GuestFlow API listening on http://localhost:${PORT}`);
  console.log(`Allowed origins: ${allowedOrigins.join(", ")}`);
});
