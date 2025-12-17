import { useState } from "react";

export default function Login({ goSignup, doLogin, message }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-full w-full flex items-center justify-center p-4 bg-slate-950">
      <div className="bg-slate-900 border border-slate-800 p-10 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-white text-4xl font-extrabold tracking-tight mb-2">Welcome Back</h1>
          <p className="text-slate-400">Please enter your details to sign in</p>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Username</label>
            <input
              placeholder="Enter your username"
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Password</label>
            <input
              placeholder="••••••••"
              type="password"
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl mt-8 shadow-lg shadow-blue-900/20 transition-all active:scale-95"
          onClick={() => doLogin(username, password)}
        >
          Sign In
        </button>
        {message && (
          <div className="mt-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-center text-sm text-red-400 font-medium">{message}</p>
          </div>
        )}
        <p className="text-slate-500 text-sm text-center mt-8">
          New to the platform?{" "}
          <span onClick={goSignup} className="text-blue-400 font-semibold cursor-pointer hover:underline">
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}