import express from "express";
import User from "../model/user.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const exists = await User.findOne({ username });
  if (exists) return res.json({ success: false, msg: "Username taken" });
  const user = new User({ username, password });
  await user.save();
  res.json({ success: true });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) return res.json({ success: false });
  res.json({ 
    success: true,
    user: {
      username: user.username,
      bio: user.bio,
      avatarColor: user.avatarColor,
      fullName: user.fullName
    }
  });
});

router.get("/profile", async (req, res) => {
  try {
    const { username } = req.query;
    const user = await User.findOne({ username });
    if (!user) return res.json({ success: false });
    res.json({
      success: true,
      user: {
        username: user.username,
        bio: user.bio,
        avatarColor: user.avatarColor,
        fullName: user.fullName
      }
    });
  } catch (err) {
    res.json({ success: false });
  }
});

router.post("/update-profile", async (req, res) => {
  try {
    const { username, bio, avatarColor, fullName } = req.body;
    const user = await User.findOneAndUpdate(
      { username },
      { bio, avatarColor, fullName },
      { new: true }
    );
    if (!user) return res.json({ success: false });
    res.json({
      success: true,
      user: {
        username: user.username,
        bio: user.bio,
        avatarColor: user.avatarColor,
        fullName: user.fullName
      }
    });
  } catch (err) {
    res.json({ success: false });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { query, exclude } = req.query;
    const users = await User.find({
      username: { $regex: query, $options: "i", $ne: exclude }
    }).select("username avatarColor").limit(10);
    res.json(users);
  } catch (err) {
    res.json([]);
  }
});

export default router;