import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" },
  avatarColor: { type: String, default: "slate" },
  fullName: { type: String, default: "" }
});

export default mongoose.model("User", userSchema);