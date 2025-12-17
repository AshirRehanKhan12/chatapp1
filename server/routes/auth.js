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


res.json({ success: true });
});


export default router;