import { useState } from "react";

export default function Login({ goSignup, doLogin, message }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl w-96 shadow-lg">
        <h1 className="text-white text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <input
          placeholder="Username"
          className="mb-4 w-full p-3 rounded-md bg-gray-700 text-white"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="mb-6 w-full p-3 rounded-md bg-gray-700 text-white"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
          onClick={() => doLogin(username, password)}
        >
          Login
        </button>

        {message && (
          <p className="text-center mt-4 text-sm text-red-400">
            {message}
          </p>
        )}

        <p className="text-gray-400 text-sm text-center mt-4">
          Don't have an account?{" "}
          <span
            onClick={goSignup}
            className="text-indigo-400 cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
