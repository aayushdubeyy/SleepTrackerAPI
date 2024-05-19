// Import the Mongoose library
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  records: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Record",
    },
  ],
});

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("user", userSchema);
