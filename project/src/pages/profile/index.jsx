export default function Profile({ username, goChat }) {

  return (
    <div className="h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 w-96 p-8 rounded-xl shadow-xl">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Profile
        </h1>

        <div className="bg-gray-700 rounded-xl p-6 text-center mb-8">
          <div className="text-6xl font-bold mb-4">
            {username[0].toUpperCase()}
          </div>

          <p className="text-xl">{username}</p>
        </div>

        <button
          onClick={goChat}
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-md"
        >
          Back to chat
        </button>

      </div>
    </div>
  );
}
