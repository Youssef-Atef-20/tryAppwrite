import React, { useState } from "react";
import { account } from "../lib/appwrite";

const Profile = ({ currentUser, setCurrentUser }) => {
  const [name, setName] = useState(currentUser?.name || "");
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!currentUser) return null;

  const handleUpdateName = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setUpdating(true);
      setMessage("");
      setError("");

      const updatedUser = await account.updateName(name.trim());
      setCurrentUser(updatedUser);
      setMessage("Profile name updated successfully!");
    } catch (err) {
      console.error("Update Name Error:", err);
      setError(err.message || "Failed to update profile name.");
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setCurrentUser(null);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          User Profile
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your account credentials, security settings, and session status
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Avatar Card */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 text-center flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-500 flex items-center justify-center text-white text-3xl font-extrabold shadow-xl shadow-pink-500/20 mb-4">
            {currentUser.name ? currentUser.name[0].toUpperCase() : "U"}
          </div>

          <h2 className="text-xl font-bold text-white mb-1">
            {currentUser.name || "Appwrite User"}
          </h2>
          <p className="text-xs text-slate-400 font-mono mb-4">
            {currentUser.email || "No email"}
          </p>

          <span className="inline-block px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-semibold">
            {currentUser.emailVerification ? "Verified Account" : "Authenticated Session"}
          </span>

          <button
            onClick={handleLogout}
            className="btn-secondary w-full text-xs py-2.5 mt-6 justify-center"
          >
            Sign Out
          </button>
        </div>

        {/* Right Column: Profile Details & Forms */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Account Details Card */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 pb-3 border-b border-white/10 flex items-center gap-2">
              <span>👤</span> Account Details
            </h3>

            {message && (
              <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300">
                {message}
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-300">
                {error}
              </div>
            )}

            <form onSubmit={handleUpdateName} className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="glass-input flex-1 px-4 py-2.5 rounded-xl text-sm"
                  />
                  <button
                    type="submit"
                    disabled={updating}
                    className="btn-primary text-xs px-5 py-2.5"
                  >
                    {updating ? "Saving..." : "Update Name"}
                  </button>
                </div>
              </div>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 bg-slate-950/70 rounded-xl border border-white/5">
                <span className="text-slate-500 block mb-1">User ID:</span>
                <span className="text-pink-400 font-bold">{currentUser.$id}</span>
              </div>

              <div className="p-3.5 bg-slate-950/70 rounded-xl border border-white/5">
                <span className="text-slate-500 block mb-1">Joined Date:</span>
                <span className="text-slate-200">
                  {currentUser.$createdAt ? new Date(currentUser.$createdAt).toLocaleDateString() : "Active User"}
                </span>
              </div>

              <div className="p-3.5 bg-slate-950/70 rounded-xl border border-white/5">
                <span className="text-slate-500 block mb-1">Security Hashing:</span>
                <span className="text-emerald-400 font-semibold">Argon2id / Bcrypt (Appwrite)</span>
              </div>

              <div className="p-3.5 bg-slate-950/70 rounded-xl border border-white/5">
                <span className="text-slate-500 block mb-1">Status:</span>
                <span className="text-emerald-400 font-semibold">Active Session</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;
