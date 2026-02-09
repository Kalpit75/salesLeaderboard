const Sale = require("../models/Sale");

// Add Sale
exports.addSale = async (req, res) => {
  try {
    const sale = new Sale(req.body);
    await sale.save();

    res.status(201).json({ message: "Sale added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    // Aggregate total amount and deals per agent
    const result = await Sale.aggregate([
      {
        $group: {
          _id: "$agentName",
          totalAmount: { $sum: "$amount" },
          totalDeals: { $sum: "$deals" }
        }
      }
    ]);

    // Step 1: Sort by totalAmount descending, then agentName ascending
    result.sort((a, b) => {
      if (b.totalAmount !== a.totalAmount) {
        return b.totalAmount - a.totalAmount; // higher amount first
      }
      return a._id.localeCompare(b._id); // alphabetical order for tie
    });

    // Step 2: Assign unique rank
    const leaderboard = result.map((item, index) => ({
      rank: index + 1, // unique rank
      agentName: item._id,
      totalAmount: item.totalAmount,
      totalDeals: item.totalDeals
    }));

    res.json(leaderboard);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
