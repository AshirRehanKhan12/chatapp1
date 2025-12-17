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
  const [userProfile, setUserProfile] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(API);
    setSocket(newSocket);
    newSocket.on("receive", (msg) => {
      setMessages(prev => {
        const isRelated = 
          (msg.sender === recipient && msg.receiver === username) || 
          (msg.sender === username && msg.receiver === recipient);
        return isRelated ? [...prev, msg] : prev;
      });
    });
    return () => newSocket.close();
  }, [recipient, username]);

  useEffect(() => {
    if (page === "chat" && recipient) {
      axios.get(`${API}/messages/conversation`, {
        params: { user1: username, user2: recipient }
      }).then(res => setMessages(res.data))
      .catch(() => setMessages([]));
    }
  }, [page, recipient, username]);

  async function sendMessage(text) {
    if (socket && text.trim() && recipient) {
      socket.emit("send", { sender: username, receiver: recipient, text: text.trim() });
    }
  }

  function goChat(name) {
    if (name) {
      setUsername(name);
      socket?.emit("join", name);
    }
    setPage("chat");
  }

  async function doSignup(u, p) {
    try {
      const res = await axios.post(API + "/auth/signup", { username: u, password: p });
      if (res.data.success) { setMessage("Signup success!"); setPage("login"); }
      else setMessage("User exists");
    } catch { setMessage("Error"); }
  }

  async function doLogin(u, p) {
    try {
      const res = await axios.post(API + "/auth/login", { username: u, password: p });
      if (res.data.success) {
        setUsername(u);
        setUserProfile(res.data.user);
        socket?.emit("join", u);
        setPage("chat");
      } else setMessage("Invalid login");
    } catch { setMessage("Error"); }
  }

  function doLogout() {
    setUsername("");
    setUserProfile(null);
    setRecipient(null);
    setMessages([]);
    setMessage("");
    setPage("login");
  }

  return (
    <div className="h-screen w-full bg-slate-950 overflow-hidden text-slate-200">
      {page === "login" && <Login goSignup={() => setPage("signup")} doLogin={doLogin} message={message} />}
      {page === "signup" && <Signup goLogin={() => setPage("login")} doSignup={doSignup} message={message} />}
      {page === "chat" && (
        <Chat 
          username={username} 
          userProfile={userProfile}
          messages={messages} 
          sendMessage={sendMessage} 
          goProfile={() => setPage("profile")}
          recipient={recipient}
          setRecipient={setRecipient}
        />
      )}
      {page === "profile" && <Profile username={username} userProfile={userProfile} setUserProfile={setUserProfile} goChat={() => setPage("chat")} doLogout={doLogout} />}
    </div>
  );
}