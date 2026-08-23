import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { account } from "./lib/appwrite";
import "./App.css";

function AppContent() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    try {
      setLoadingUser(true);
      const user = await account.get();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-[#0b0c10] text-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-slate-400 font-mono">Loading FreelanceInvoicer...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 selection:bg-pink-500 selection:text-white flex flex-col justify-between">
      <div>
        <Navbar
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          loadingUser={loadingUser}
        />

        <Routes>
          {/* Protected Dashboard Route */}
          <Route
            path="/"
            element={
              currentUser ? (
                <Dashboard currentUser={currentUser} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Login Route */}
          <Route
            path="/login"
            element={
              !currentUser ? (
                <Login setCurrentUser={setCurrentUser} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* SignUp Route */}
          <Route
            path="/signup"
            element={
              !currentUser ? (
                <SignUp setCurrentUser={setCurrentUser} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Protected Profile Route */}
          <Route
            path="/profile"
            element={
              currentUser ? (
                <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} replace />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
