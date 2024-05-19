const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  hours: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Record", recordSchema);
