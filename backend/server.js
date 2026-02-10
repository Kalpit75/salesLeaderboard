const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000,  
  socketTimeoutMS: 45000,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("Mongo Error:", err));

app.use("/api", require("./routes/sales"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

