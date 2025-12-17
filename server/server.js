import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import setupSocket from "./socket.js";


dotenv.config();


dotenv.config();


connectDB();
const app = express();
app.use(cors());
app.use(express.json());


app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);


const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });


setupSocket(io);


server.listen(process.env.PORT || 5000, () => console.log("Server running on port " + (process.env.PORT || 5000)));