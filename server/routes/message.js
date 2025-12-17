import express from "express";
import Message from "../model/message.js";

const router = express.Router();

router.get("/conversation", async (req, res) => {
  const { user1, user2 } = req.query;
  if (!user1 || !user2) return res.json([]);
  const msgs = await Message.find({
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 }
    ]
  }).sort({ time: 1 });
  res.json(msgs);
});

router.get("/contacts", async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) return res.json([]);
    
    const messages = await Message.find({
      $or: [
        { sender: username },
        { receiver: username }
      ]
    }).sort({ time: -1 });
    
    // Get unique users (excluding self)
    const uniqueUsers = new Set();
    messages.forEach(msg => {
      const otherUser = msg.sender === username ? msg.receiver : msg.sender;
      uniqueUsers.add(otherUser);
    });
    
    const contacts = Array.from(uniqueUsers).map(user => ({ username: user }));
    res.json(contacts);
  } catch (err) {
    res.json([]);
  }
});

export default router;