const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: { type: String, required: true },
    author: [
      new mongoose.Schema(
        {
          email: { type: String, required: true }, // es el email del usuario
          name: String,
          lastName: String,
          age: String,
          alias: { type: String, required: true },
          avatar: String,
        },
        { _id: false }
      ),
    ],
  },
  { _id: false, timestamps: true } // CreatedAt y UpdatedAt
);

let Message = mongoose.model("messages", MessageSchema);

module.exports = { Message };
