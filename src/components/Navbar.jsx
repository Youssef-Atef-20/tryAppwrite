import React, { useState } from "react";
import { account } from "../lib/appwrite";
import { OAuthProvider } from "appwrite";

const Navbar = ({ currentUser, setCurrentUser, loadingUser, onOpenCreateModal }) => {
  const [authLoading, setAuthLoading] = useState(false);

  const handleGoogleAuth = () => {
    try {
      setAuthLoading(true);
      const redirectSuccess = window.location.origin;
      const redirectFailure = `${window.location.origin}?auth_error=failed`;
      
      account.createOAuth2Session(
        OAuthProvider.Google,
        redirectSuccess,
        redirectFailure
      );
    } catch (err) {
      console.error("Google OAuth error:", err);
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setAuthLoading(true);
      await account.deleteSession("current");
      setCurrentUser(null);
    } catch (err) {
      console.error("Logout Error:", err);
      setCurrentUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-white/10 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-500 p-[1px] shadow-lg shadow-pink-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-bold text-pink-500 text-xl">
              <span className="pink-gradient-text font-black">a</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white">FreelanceInvoicer</span>
              <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-pink-500/15 text-pink-400 border border-pink-500/30 rounded-full">
                Appwrite DB
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium">Billing & Invoice Management</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          <button
            onClick={onOpenCreateModal}
            className="btn-primary text-xs px-3.5 py-2 shadow-lg shadow-pink-500/20 flex items-center gap-1.5"
          >
            <span>+ New Invoice</span>
          </button>

          {/* User Status / Login */}
          {loadingUser ? (
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-white/10">
              <div className="w-3 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : currentUser ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-slate-900/90 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-sm">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold border border-emerald-500/40">
                  ✓
                </div>
                <span className="text-white font-medium max-w-[110px] truncate text-xs">
                  {currentUser.name || currentUser.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                disabled={authLoading}
                className="btn-secondary text-xs px-3 py-1.5"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={handleGoogleAuth}
              disabled={authLoading}
              className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Google Login</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
};

export default Navbar;