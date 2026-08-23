import React, { useState } from "react";
import { account } from "../lib/appwrite";
import { OAuthProvider } from "appwrite";

const AuthShowcase = ({ currentUser, setCurrentUser }) => {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  const handleGoogleSignUp = () => {
    try {
      setLoading(true);
      setAuthError(null);

      const redirectSuccess = window.location.origin;
      const redirectFailure = `${window.location.origin}?auth_error=google_failed`;

      account.createOAuth2Session(
        OAuthProvider.Google,
        redirectSuccess,
        redirectFailure
      );
    } catch (err) {
      console.error("OAuth Exception:", err);
      setAuthError(err.message || "Could not launch Google OAuth redirect.");
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await account.deleteSession("current");
      setCurrentUser(null);
    } catch (err) {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="google-auth" className="py-12 max-w-4xl mx-auto px-4">
      
      {/* Main Glass Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden shadow-2xl">
        
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Appwrite OAuth 2.0 Provider
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Sign Up with Google
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            One-click Google single sign-on authentication powered by Appwrite Web SDK.
          </p>
        </div>

        {authError && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-xs sm:text-sm text-rose-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">⚠️</span>
              <span>{authError}</span>
            </div>
            <button
              onClick={() => setShowSetupGuide(true)}
              className="text-xs text-pink-400 hover:underline font-medium"
            >
              Setup Console Guide
            </button>
          </div>
        )}

        {/* Action / State Area */}
        {!currentUser ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <button
              id="btn-siwg"
              onClick={handleGoogleSignUp}
              disabled={loading}
              className="w-full sm:w-auto min-w-[280px] btn-primary py-4 px-8 text-base shadow-2xl shadow-pink-500/30 justify-center rounded-2xl font-bold tracking-wide"
            >
              <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>{loading ? "Connecting to Google..." : "Continue with Google"}</span>
            </button>

            <button
              onClick={() => setShowSetupGuide(!showSetupGuide)}
              className="text-xs text-slate-400 hover:text-pink-400 transition-colors underline pt-2"
            >
              {showSetupGuide ? "Hide Appwrite Google OAuth Setup Steps" : "How to configure Google OAuth in Appwrite Console"}
            </button>
          </div>
        ) : (
          <div id="session-info" className="glass-panel p-6 rounded-2xl bg-slate-950/70 border border-emerald-500/30">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white text-lg font-extrabold shadow-lg shadow-pink-500/20">
                  {currentUser.name ? currentUser.name[0].toUpperCase() : "G"}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {currentUser.name || "Authenticated Google User"}
                  </h3>
                  <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                    Signed in via Google OAuth 2.0
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                disabled={loading}
                className="btn-secondary text-xs px-4 py-2"
              >
                Sign Out
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-white/5">
                <span className="text-slate-500 block mb-1">User ID ($id):</span>
                <span className="text-pink-400 font-semibold">{currentUser.$id}</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-white/5">
                <span className="text-slate-500 block mb-1">Email Address:</span>
                <span className="text-slate-200">{currentUser.email || "Google Account"}</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-white/5">
                <span className="text-slate-500 block mb-1">Session Status:</span>
                <span className="text-emerald-400 font-semibold">Active & Valid</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-white/5">
                <span className="text-slate-500 block mb-1">Auth Provider:</span>
                <span className="text-slate-200">OAuth2 / Google</span>
              </div>
            </div>
          </div>
        )}

        {/* Setup Guide Accordion */}
        {showSetupGuide && (
          <div id="setup-guide" className="mt-8 p-6 bg-slate-950/90 rounded-2xl border border-pink-500/20 text-left space-y-4">
            <h4 className="text-sm font-bold text-pink-400 uppercase tracking-wider flex items-center gap-2">
              <span>⚙️</span> How to Enable Google OAuth in Appwrite Console
            </h4>
            
            <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-300 space-y-2.5 leading-relaxed font-sans">
              <li>
                Go to <a href="https://cloud.appwrite.io" target="_blank" rel="noopener noreferrer" className="text-pink-400 underline">Appwrite Cloud Console</a> & navigate to your project.
              </li>
              <li>
                Go to <strong>Auth</strong> &rarr; <strong>Settings</strong> &rarr; <strong>OAuth2 Providers</strong> &rarr; Enable <strong>Google</strong>.
              </li>
              <li>
                Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-pink-400 underline">Google Cloud Console</a> &rarr; Credentials &rarr; Create <strong>OAuth 2.0 Client ID</strong> (Web Application).
              </li>
              <li>
                Add Appwrite's redirect URI into Google OAuth Authorized Redirect URIs:
                <code className="block mt-1 p-2 bg-slate-900 rounded border border-white/10 text-pink-300 font-mono text-[11px] overflow-x-auto">
                  https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/YOUR_PROJECT_ID
                </code>
              </li>
              <li>
                Copy the <strong>Appwrite Project ID</strong> into <code className="text-pink-300 font-mono">.env</code> as <code className="text-pink-300 font-mono">VITE_APPWRITE_PROJECT_ID</code>.
              </li>
            </ol>
          </div>
        )}

      </div>
    </section>
  );
};

export default AuthShowcase;
