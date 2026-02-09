const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  agentName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  deals: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Sale", saleSchema);
