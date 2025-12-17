import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../api/api";

const AVATAR_COLORS = [
  { name: "slate", bg: "bg-slate-700", text: "text-slate-200" },
  { name: "blue", bg: "bg-blue-600", text: "text-blue-100" },
  { name: "red", bg: "bg-red-600", text: "text-red-100" },
  { name: "green", bg: "bg-green-600", text: "text-green-100" },
  { name: "purple", bg: "bg-purple-600", text: "text-purple-100" },
  { name: "pink", bg: "bg-pink-600", text: "text-pink-100" },
  { name: "indigo", bg: "bg-indigo-600", text: "text-indigo-100" },
  { name: "amber", bg: "bg-amber-600", text: "text-amber-100" }
];

export default function Profile({ username, userProfile, setUserProfile, goChat, doLogout }) {
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarColor, setAvatarColor] = useState("slate");
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const displayUsername = username || "";
  const initial = displayUsername.length > 0 ? displayUsername[0].toUpperCase() : "?";

  useEffect(() => {
    if (userProfile) {
      setFullName(userProfile.fullName || "");
      setBio(userProfile.bio || "");
      setAvatarColor(userProfile.avatarColor || "slate");
      setLoading(false);
    }
  }, [userProfile]);

  const getAvatarStyle = (color) => {
    const colorObj = AVATAR_COLORS.find(c => c.name === color);
    return colorObj ? colorObj : AVATAR_COLORS[0];
  };

  async function handleSaveProfile() {
    try {
      const res = await axios.post(`${API}/auth/update-profile`, {
        username,
        fullName,
        bio,
        avatarColor
      });
      if (res.data.success) {
        setUserProfile(res.data.user);
        setMessage("Profile updated successfully!");
        setIsEditing(false);
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to update profile");
      }
    } catch (err) {
      setMessage("Error updating profile");
    }
  }

  if (loading) {
    return <div className="h-full w-full text-white flex items-center justify-center">Loading...</div>;
  }

  const currentColor = getAvatarStyle(avatarColor);

  return (
    <div className="h-full w-full text-white flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md max-h-[90vh] rounded-3xl shadow-2xl relative overflow-hidden flex flex-col">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

        <div className="relative z-10 flex flex-col items-center overflow-y-auto p-10">
          <div className={`w-32 h-32 ${currentColor.bg} border-4 border-slate-900 rounded-full flex items-center justify-center text-5xl font-black ${currentColor.text} shadow-xl mb-6`}>
            {initial}
          </div>

          <h1 className="text-2xl font-bold mb-1">User Profile</h1>
          <p className="text-slate-400 font-medium mb-8">@{displayUsername || "guest_user"}</p>

          {isEditing ? (
            <>
              <div className="w-full mb-6">
                <label className="block text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  maxLength="50"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="w-full mb-6">
                <label className="block text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  maxLength="150"
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 resize-none"
                />
                <p className="text-xs text-slate-500 mt-1">{bio.length}/150</p>
              </div>

              <div className="w-full mb-6">
                <label className="block text-xs text-slate-400 uppercase tracking-widest font-bold mb-3">Avatar Color</label>
                <div className="grid grid-cols-4 gap-2">
                  {AVATAR_COLORS.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setAvatarColor(color.name)}
                      className={`h-10 rounded-lg ${color.bg} border-2 ${
                        avatarColor === color.name ? "border-white" : "border-slate-600"
                      } transition-all`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {message && (
                <div className="w-full bg-green-600/20 border border-green-600 rounded-lg p-3 mb-4 text-sm text-green-300 text-center">
                  {message}
                </div>
              )}

              <div className="w-full flex gap-3">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all active:scale-95"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to Profile
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="w-full bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mb-4">
                {fullName && (
                  <>
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Full Name</div>
                    <div className="text-lg font-semibold mb-4">{fullName}</div>
                  </>
                )}
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Username</div>
                <div className="text-lg font-semibold">{displayUsername || "No Username Set"}</div>
              </div>

              {bio && (
                <div className="w-full bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mb-6">
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Bio</div>
                  <div className="text-sm leading-relaxed text-slate-300">{bio}</div>
                </div>
              )}

              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all mb-3 active:scale-95"
              >
                Edit Profile
              </button>

              <button
                onClick={doLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all mb-3 active:scale-95"
              >
                Logout
              </button>

              <button
                onClick={() => goChat()}
                className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Chat
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}