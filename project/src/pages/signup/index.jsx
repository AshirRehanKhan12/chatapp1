import { useState } from "react";

export default function Signup({ goLogin, doSignup, message }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-full w-full flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-10 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-white text-4xl font-extrabold tracking-tight mb-2">
            Join Us
          </h1>
          <p className="text-slate-400">Create your account to start chatting</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Username</label>
            <input
              placeholder="Choose a username"
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Email Address</label>
            <input
              placeholder="name@example.com"
              type="email"
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Password</label>
            <input
              placeholder="••••••••"
              type="password"
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-4 rounded-xl mt-8 shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
          onClick={() => doSignup(username, email, password)}
        >
          Create Account
        </button>

        {message && (
          <div className="mt-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-center text-sm text-red-400 font-medium">{message}</p>
          </div>
        )}

        <p className="text-slate-500 text-sm text-center mt-8">
          Already a member?{" "}
          <span onClick={goLogin} className="text-emerald-400 font-semibold cursor-pointer hover:underline">
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}