import { useState, useEffect, useRef } from "react";

export default function Chat({ username, messages, sendMessage, goProfile }) {

  const [text, setText] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">

      <div className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
        <h1 className="font-bold text-2xl">
          Chat Room
        </h1>

        <button
          className="text-indigo-400"
          onClick={goProfile}
        >
          Profile
        </button>
      </div>

      <div className="flex-1 overflow-y-scroll p-4 space-y-3">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 max-w-lg rounded-xl ${
              msg.sender === username
                ? "ml-auto bg-indigo-600"
                : "mr-auto bg-gray-700"
            }`}
          >
            <span className="block text-sm text-gray-300">
              {msg.sender}
            </span>

            {msg.text}
          </div>
        ))}

        <div ref={endRef}></div>
      </div>

      <div className="p-4 bg-gray-800 flex gap-3">
        <input
          placeholder="Message..."
          className="flex-1 p-3 rounded-md bg-gray-700"
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <button
          onClick={() => {
            sendMessage(text);
            setText("");
          }}
          className="bg-indigo-600 hover:bg-indigo-700 px-6 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}
