import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { account } from "../lib/appwrite";

const Navbar = ({ currentUser, setCurrentUser, loadingUser, onOpenCreateModal, userPlan = "Free" }) => {
  const [authLoading, setAuthLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setAuthLoading(true);
      await account.deleteSession("current");
      setCurrentUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout Error:", err);
      setCurrentUser(null);
      navigate("/login");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-white/10 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/tangent_logo.png"
            alt="Tangent Logo"
            width="40"
            height="40"
            className="w-10 h-10 rounded-xl shadow-lg shadow-pink-500/20 border border-white/10 object-cover"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white">Tangent</span>
              <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded-full border ${
                userPlan === "Pro" || userPlan === "Agency"
                  ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                  : "bg-pink-500/15 text-pink-400 border-pink-500/30"
              }`}>
                {userPlan === "Pro" ? "Pro ⚡" : userPlan === "Agency" ? "Agency 🚀" : "Free Plan"}
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium">Invoicing & Financial Hub</span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {currentUser && (
            <Link
              to="/"
              className={`transition-colors ${
                location.pathname === "/" ? "text-pink-400 font-bold" : "text-slate-300 hover:text-white"
              }`}
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/pricing"
            className={`transition-colors ${
              location.pathname === "/pricing" ? "text-pink-400 font-bold" : "text-slate-300 hover:text-white"
            }`}
          >
            Pricing & Plans
          </Link>
          {currentUser && (
            <Link
              to="/profile"
              className={`transition-colors ${
                location.pathname === "/profile" ? "text-pink-400 font-bold" : "text-slate-300 hover:text-white"
              }`}
            >
              Profile
            </Link>
          )}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {currentUser && onOpenCreateModal && (
            <button
              onClick={onOpenCreateModal}
              className="btn-primary text-xs px-3.5 py-2 shadow-lg shadow-pink-500/20 flex items-center gap-1.5"
            >
              <span>+ New Invoice</span>
            </button>
          )}

          {/* User Status / Login */}
          {loadingUser ? (
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-white/10">
              <div className="w-3.5 h-3.5 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : currentUser ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="flex items-center gap-2 bg-slate-900/90 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-sm hover:border-emerald-500/60 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold border border-emerald-500/40">
                  {currentUser.name ? currentUser.name[0].toUpperCase() : "✓"}
                </div>
                <span className="text-white font-medium max-w-[110px] truncate text-xs">
                  {currentUser.name || currentUser.email}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                disabled={authLoading}
                className="btn-secondary text-xs px-3 py-1.5"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn-secondary text-xs px-3.5 py-1.5">
                Log In
              </Link>
              <Link to="/signup" className="btn-primary text-xs px-3.5 py-1.5 shadow-md shadow-pink-500/20">
                Sign Up
              </Link>
            </div>
          )}

        </div>

      </div>
    </header>
  );
};

export default Navbar;