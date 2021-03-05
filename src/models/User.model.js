const { Schema, model } = require("mongoose");
const bcrytp = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: [true, "Username must be unique"],
      trim: true,
      minlength: [4, "Username must contain at least 4 characters"],
      required: [true, "Username is required"],
    },
    password: {
      type: String,
      minlength: [8, "Password must contain at least 8 characters"],
      required: [true, "Password is required"],
    },
    name: {
      type: String,
      lowercase: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  if (!password || password.length < 6) {
    return password;
  }
  const hash = await bcrytp.hash(password, 13);
  return hash;
};

userSchema.statics.checkPassword = async (password, dbHash) => {
  const result = await bcrytp.compare(password, dbHash);
  return result;
};

module.exports = model("User", userSchema);
