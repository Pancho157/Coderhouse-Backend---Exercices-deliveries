const mongoose = require("mongoose");

// --------------------- Messages Schema & Model ------------------------
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

// --------------------- Messages Schema & Model ------------------------
const UserSchema = mongoose.Schema(
  {
    alias: {
      type: String,
      required: [true, "Alias is required"],
      unique: true,
      dropDups: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      dropDups: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "La contraseña debe tener 6 caracteres como mínimo"],
    },
  },
  { timestamps: false, versionKey: false }
);

let Users = mongoose.model("users", UserSchema);

module.exports = { Message, Users };
