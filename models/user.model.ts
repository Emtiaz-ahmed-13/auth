import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  image: String,
});

const User =
  (mongoose.models && mongoose.models.User) ||
  mongoose.model("User", userSchema);

export default User;
