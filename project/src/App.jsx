import { useState, useEffect } from "react";


import Login from "./pages/login";
import Signup from "./pages/signup";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import { API } from "./api/api";
import axios from "axios";
import { io } from "socket.io-client";


import "./App.css";


export default function App() {
const [page, setPage] = useState("login");
const [username, setUsername] = useState("");
const [message, setMessage] = useState("");
const [messages, setMessages] = useState([]);
const [socket, setSocket] = useState(null);


useEffect(() => {
const newSocket = io(API);
setSocket(newSocket);

newSocket.on("receive", (msg) => {
setMessages(prev => [...prev, msg]);
});

return () => newSocket.close();
}, []);


useEffect(() => {
if (page === "chat") {
loadMessages();
}
}, [page]);


async function loadMessages() {
try {
const res = await axios.get(API + "/messages/all");
setMessages(res.data);
} catch (err) {
console.error("Failed to load messages:", err);
}
}


async function sendMessage(text) {
if (socket && text.trim()) {
socket.emit("send", { sender: username, text: text.trim() });
}
}


function goLogin() {
setPage("login");
setMessage("");
}


function goSignup() {
setPage("signup");
setMessage("");
}


function goChat(name) {
if (name) setUsername(name);
setPage("chat");
setMessage("");
}


function goProfile() {
setPage("profile");
setMessage("");
}


async function doSignup(username, email, password) {
try {
const res = await axios.post(API + "/auth/signup", {
username,
password,
});

if (res.data.success) {
setMessage("Signup successful! Please login.");
goLogin();
} else {
setMessage("Username already taken");
}
} catch (err) {
setMessage("Signup failed. Please try again.");
}
}


async function doLogin(username, password) {
try {
const res = await axios.post(API + "/auth/login", {
username,
password,
});

if (res.data.success) {
goChat(username);
} else {
setMessage("Invalid username or password");
}
} catch (err) {
setMessage("Login failed. Please try again.");
}
}


if (page === "login") {
return <Login goSignup={goSignup} doLogin={doLogin} message={message} />;
}


if (page === "signup") {
return <Signup goLogin={goLogin} doSignup={doSignup} message={message} />;
}


if (page === "chat") {
return <Chat username={username} messages={messages} sendMessage={sendMessage} goProfile={goProfile} />;
}


if (page === "profile") {
return <Profile username={username} goChat={goChat} />;
}


return null;
}