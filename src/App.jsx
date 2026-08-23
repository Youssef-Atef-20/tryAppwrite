import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Pricing from "./pages/Pricing";
import { account } from "./lib/appwrite";
import "./App.css";

function AppContent() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [userPlan, setUserPlan] = useState("Free");

  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    try {
      setLoadingUser(true);
      const user = await account.get();
      setCurrentUser(user);

      // Load plan from storage
      const savedPlan = localStorage.getItem(`plan_${user.$id}`);
      if (savedPlan) {
        setUserPlan(savedPlan);
      }
    } catch (err) {
      setCurrentUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  const handleUpgradePlan = (newPlan) => {
    setUserPlan(newPlan);
    if (currentUser?.$id) {
      localStorage.setItem(`plan_${currentUser.$id}`, newPlan);
    }
  };

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-[#0b0c10] text-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-slate-400 font-mono">Loading Tangent Platform...</span>
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
          userPlan={userPlan}
        />

        <main id="main-content">
          <Routes>
            {/* Protected Dashboard Route */}
            <Route
              path="/"
              element={
                currentUser ? (
                  <Dashboard currentUser={currentUser} userPlan={userPlan} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Public Pricing Route */}
            <Route
              path="/pricing"
              element={
                <Pricing userPlan={userPlan} onUpgradePlan={handleUpgradePlan} />
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
                  <Profile
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    userPlan={userPlan}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Catch-all Fallback */}
            <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} replace />} />
          </Routes>
        </main>
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
