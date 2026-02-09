const express = require("express");
const router = express.Router();

const {
  addSale,
  getLeaderboard
} = require("../controllers/salesController");

router.post("/sales", addSale);
router.get("/leaderboard", getLeaderboard);

module.exports = router;
