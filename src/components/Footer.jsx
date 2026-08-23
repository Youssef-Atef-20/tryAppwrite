import React from "react";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-950/80 backdrop-blur-md py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center font-bold text-white text-sm">
            a
          </div>
          <div className="text-sm font-semibold text-slate-300">
            React Starter Kit for <span className="text-pink-500">Appwrite</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <a
            href="https://appwrite.io/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition-colors"
          >
            Documentation
          </a>
          <a
            href="https://appwrite.io/discord"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition-colors"
          >
            Community Discord
          </a>
          <a
            href="https://github.com/appwrite/appwrite"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition-colors"
          >
            GitHub Repository
          </a>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Built with React 19 & Appwrite JS SDK
        </div>

      </div>
    </footer>
  );
};

export default Footer;
