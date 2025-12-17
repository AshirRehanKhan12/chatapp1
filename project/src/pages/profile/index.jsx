export default function Profile({ username, goChat }) {
  const displayUsername = username || "";
  const initial = displayUsername.length > 0 ? displayUsername[0].toUpperCase() : "?";

  return (
    <div className="h-full w-full text-white flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-sm p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-32 h-32 bg-slate-800 border-4 border-slate-900 rounded-full flex items-center justify-center text-5xl font-black text-blue-500 shadow-xl mb-6">
            {initial}
          </div>

          <h1 className="text-2xl font-bold mb-1">User Profile</h1>
          <p className="text-slate-400 font-medium mb-8">@{displayUsername || "guest_user"}</p>

          <div className="w-full bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mb-10 text-center">
            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Display Name</div>
            <div className="text-lg font-semibold">{displayUsername || "No Username Set"}</div>
          </div>

          <button
            onClick={() => goChat()}
            className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Chat
          </button>
        </div>
      </div>
    </div>
  );
}