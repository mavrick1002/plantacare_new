// backend -- routes-- notifications.js

const express = require("express");
const Plant = require("../models/plant");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const now = new Date();
    const plants = await Plant.find({ userId: req.userId });

    const notifications = plants.map((plant) => {
      const { name, lastWatered, lastFertilized } = plant;
      const messages = [];

      // 2 minutes in milliseconds
      const intervalMs = 2 * 60 * 1000;

      // Water notification
      if (lastWatered) {
        const lastWateredDate = new Date(lastWatered);
        if (now - lastWateredDate >= intervalMs) {
          messages.push(`It's time to water your plant "${name}"!`);
        }
      }

      // Fertilizer notification
      if (lastFertilized) {
        const lastFertilizedDate = new Date(lastFertilized);
        if (now - lastFertilizedDate >= intervalMs) {
          messages.push(`It's time to fertilize your plant "${name}"!`);
        }
      }

      return { plant: name, messages };
    });

    res.status(200).json(notifications.filter((n) => n.messages.length > 0));
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
