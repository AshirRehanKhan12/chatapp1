import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API } from "../../api/api";

const AVATAR_COLORS_MAP = {
  slate: "bg-slate-700",
  blue: "bg-blue-600",
  red: "bg-red-600",
  green: "bg-green-600",
  purple: "bg-purple-600",
  pink: "bg-pink-600",
  indigo: "bg-indigo-600",
  amber: "bg-amber-600"
};

export default function Chat({ username, userProfile, messages, sendMessage, goProfile, recipient, setRecipient }) {
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [recipientProfile, setRecipientProfile] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Fetch contacts when component mounts or username changes
    if (username) {
      axios.get(`${API}/messages/contacts`, { params: { username } })
        .then(res => setContacts(res.data))
        .catch(() => setContacts([]));
    }
  }, [username]);

  useEffect(() => {
    if (search.trim()) {
      const delay = setTimeout(() => {
        axios.get(`${API}/auth/search`, { params: { query: search, exclude: username } })
          .then(res => setSearchResults(res.data))
          .catch(() => setSearchResults([]));
      }, 300);
      return () => clearTimeout(delay);
    } else {
      setSearchResults([]);
    }
  }, [search, username]);

  useEffect(() => {
    if (recipient) {
      axios.get(`${API}/auth/profile`, { params: { username: recipient } })
        .then(res => {
          if (res.data.success) {
            setRecipientProfile(res.data.user);
          }
        })
        .catch(() => setRecipientProfile(null));
    }
  }, [recipient]);

  const getAvatarBg = (user) => {
    const colorClass = AVATAR_COLORS_MAP[user.avatarColor] || AVATAR_COLORS_MAP.slate;
    return colorClass;
  };

  return (
    <div className="flex h-full w-full bg-slate-950">
      <aside className="w-72 border-r border-slate-800 flex flex-col bg-slate-900/40">
        <div className="p-4 border-b border-slate-800">
          <input
            placeholder="Search users..."
            className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {search ? (
            (searchResults || []).map((u) => (
              <div
                key={u.username}
                onClick={() => { setRecipient(u.username); setSearch(""); }}
                className="p-4 cursor-pointer hover:bg-slate-800 border-b border-slate-800/50 flex items-center gap-3"
              >
                <div className={`w-8 h-8 ${getAvatarBg(u)} rounded-full flex items-center justify-center text-xs font-bold`}>
                  {u.username[0].toUpperCase()}
                </div>
                <span className="text-sm font-medium">{u.username}</span>
              </div>
            ))
          ) : (
            // Show contacts and current recipient when not searching
            <>
              {contacts.length > 0 && (
                <>
                  <div className="px-4 pt-3 pb-2 text-xs font-semibold text-slate-400 uppercase">Recent Chats</div>
                  {contacts.map((u) => (
                    <div
                      key={u.username}
                      onClick={() => setRecipient(u.username)}
                      className={`p-4 cursor-pointer hover:bg-slate-800 border-b border-slate-800/50 flex items-center gap-3 ${
                        recipient === u.username ? "bg-slate-800/60" : ""
                      }`}
                    >
                      <div className={`w-8 h-8 ${getAvatarBg(u)} rounded-full flex items-center justify-center text-xs font-bold`}>
                        {u.username[0].toUpperCase()}
                      </div>
                      <span className="text-sm font-medium">{u.username}</span>
                    </div>
                  ))}
                </>
              )}
              {recipient && !contacts.find(c => c.username === recipient) && (
                <div className="p-4 bg-blue-600/10 border-l-4 border-blue-500 flex items-center gap-3">
                  <div className={`w-8 h-8 ${userProfile?.avatarColor ? AVATAR_COLORS_MAP[userProfile.avatarColor] : AVATAR_COLORS_MAP.slate} rounded-full flex items-center justify-center text-xs font-bold`}>
                    {recipient[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-bold text-blue-400">{recipient}</span>
                </div>
              )}
            </>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="pt-6 pb-4 px-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/20">
          <h1 className="font-bold text-lg">{recipient ? `Chat: ${recipient}` : "Select a user"}</h1>
          <button onClick={goProfile} className="text-sm bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg border border-blue-500">Profile</button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          {recipient ? (
            messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === username ? "justify-end" : "justify-start"} gap-2`}>
                {msg.sender !== username && recipientProfile && (
                  <div className={`w-8 h-8 ${AVATAR_COLORS_MAP[recipientProfile.avatarColor] || AVATAR_COLORS_MAP.slate} rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1`}>
                    {recipientProfile.username[0].toUpperCase()}
                  </div>
                )}
                <div className={`flex flex-col ${msg.sender === username ? "items-end" : "items-start"}`}>
                  <div className={`p-3 rounded-xl max-w-[70%] ${msg.sender === username ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-200"}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
                {msg.sender === username && userProfile && (
                  <div className={`w-8 h-8 ${AVATAR_COLORS_MAP[userProfile.avatarColor] || AVATAR_COLORS_MAP.slate} rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1`}>
                    {userProfile.username[0].toUpperCase()}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 italic">Search for a user to start chatting</div>
          )}
          <div ref={endRef}></div>
        </main>

        {recipient && (
          <footer className="p-4 border-t border-slate-800">
            <div className="flex gap-2">
              <input
                className="flex-1 p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (sendMessage(text), setText(""))}
                placeholder="Type a message..."
              />
              <button onClick={() => { sendMessage(text); setText(""); }} className="bg-blue-600 px-4 py-2 rounded-lg font-bold">Send</button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}