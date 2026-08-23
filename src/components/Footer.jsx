const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-950/80 backdrop-blur-md py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-3">
          <img
            src="/tangent_logo.png"
            alt="Tangent Logo"
            className="w-8 h-8 rounded-lg shadow-md shadow-pink-500/20 border border-white/10 object-cover"
          />
          <div className="text-sm font-semibold text-slate-300">
            <span className="text-white font-bold">Tangent</span> Invoicing Platform
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <a href="#privacy" className="hover:text-pink-400 transition-colors">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:text-pink-400 transition-colors">
            Terms of Service
          </a>
          <a href="#support" className="hover:text-pink-400 transition-colors">
            Support & Help
          </a>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          © {new Date().getFullYear()} Tangent Inc. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
