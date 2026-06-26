require("dotenv").config();
const express = require("express");
const cors = require("cors");

const roomsRoutes = require("./src/routes/rooms.routes");
const guestsRoutes = require("./src/routes/guests.routes");
const bookingsRoutes = require("./src/routes/bookings.routes");
const activityRoutes = require("./src/routes/activity.routes");
const notFound = require("./src/middleware/notFound");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

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

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`GuestFlow API listening on http://localhost:${PORT}`);
  console.log(`Allowing requests from origin: ${CORS_ORIGIN}`);
});
