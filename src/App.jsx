import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AuthShowcase from "./components/AuthShowcase";
import Footer from "./components/Footer";
import { account } from "./lib/appwrite";
import "./App.css";

function App() {
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
      // User is unauthenticated or session not created yet
      setCurrentUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 selection:bg-pink-500 selection:text-white flex flex-col justify-between">
      <div>
        <Navbar 
          currentUser={currentUser} 
          setCurrentUser={setCurrentUser} 
          loadingUser={loadingUser}
        />
        
        <main className="max-w-7xl mx-auto px-4 pb-12">
          <Hero 
            currentUser={currentUser}
            onExploreAuth={() => scrollToSection("google-auth")}
          />

          <AuthShowcase 
            currentUser={currentUser} 
            setCurrentUser={setCurrentUser} 
          />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
