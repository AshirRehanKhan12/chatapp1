import express from "express";
import Message from "../model/message.js";

const router = express.Router();

router.get("/all", async (req, res) => {
const msgs = await Message.find();
res.json(msgs);
});


export default router;