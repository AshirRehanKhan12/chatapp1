import { useState, useEffect, useRef } from "react";

export default function Chat({ username, messages, sendMessage, goProfile }) {
  const [text, setText] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full w-full text-slate-200 flex flex-col">
      <header className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 p-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
            C
          </div>
          <h1 className="font-bold text-xl tracking-tight">Chat Room</h1>
        </div>

        <button
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          onClick={goProfile}
        >
          <span className="text-sm font-medium">Profile</span>
          <div className="w-6 h-6 bg-slate-600 rounded-full text-[10px] flex items-center justify-center uppercase">
            {username?.[0] || "?"}
          </div>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col ${msg.sender === username ? "items-end" : "items-start"}`}
          >
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1 px-1">
              {msg.sender === username ? "You" : msg.sender}
            </span>
            <div
              className={`p-4 rounded-2xl max-w-[80%] shadow-sm ${
                msg.sender === username
                  ? "bg-blue-600 text-white rounded-tr-none"
                  : "bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none"
              }`}
            >
              <p className="text-[15px] leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </main>

      <footer className="p-4 bg-slate-900 border-t border-slate-800 shrink-0">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            placeholder="Type your message here..."
            className="flex-1 p-4 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
            value={text}
            onKeyPress={e => e.key === 'Enter' && (sendMessage(text), setText(""))}
            onChange={e => setText(e.target.value)}
          />
          <button
            onClick={() => {
              sendMessage(text);
              setText("");
            }}
            className="bg-blue-600 hover:bg-blue-500 px-8 rounded-xl font-bold text-white transition-all shadow-lg active:scale-95"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}