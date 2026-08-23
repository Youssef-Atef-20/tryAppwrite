import React, { useState } from "react";

const AppwriteDbGuide = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-8 glass-panel rounded-2xl p-5 border border-pink-500/20 bg-slate-950/60">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">🗄️</span>
          <div>
            <h4 className="text-sm font-bold text-white">
              Appwrite Database Setup Guide (<code className="text-pink-400 font-mono">freelance_db</code>)
            </h4>
            <p className="text-xs text-slate-400">
              Optional: How to store invoices permanently in Appwrite Cloud Collections
            </p>
          </div>
        </div>

        <button className="text-xs text-pink-400 font-semibold px-3 py-1 bg-pink-500/10 rounded-lg border border-pink-500/20">
          {open ? "Hide Guide ▲" : "Show Setup Steps ▼"}
        </button>
      </div>

      {open && (
        <div className="mt-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-slate-300 space-y-3 font-sans leading-relaxed">
          <p>Follow these steps in your <a href="https://cloud.appwrite.io" target="_blank" rel="noopener noreferrer" className="text-pink-400 underline">Appwrite Console</a> to set up the backend database collection:</p>

          <ol className="list-decimal list-inside space-y-2 text-slate-300">
            <li>
              Go to <strong>Databases</strong> &rarr; Click <strong>Create Database</strong> &rarr; Set ID to <code className="text-pink-300 font-mono">freelance_db</code>.
            </li>
            <li>
              Inside <code className="text-pink-300 font-mono">freelance_db</code>, click <strong>Create Collection</strong> &rarr; Set ID to <code className="text-pink-300 font-mono">invoices</code>.
            </li>
            <li>
              Add the following attributes to the <code className="text-pink-300 font-mono">invoices</code> collection:
              <ul className="list-disc list-inside ml-5 mt-1 space-y-1 font-mono text-xs text-pink-300">
                <li><code className="text-slate-200">invoiceNumber</code> (String, 64)</li>
                <li><code className="text-slate-200">clientName</code> (String, 128)</li>
                <li><code className="text-slate-200">clientEmail</code> (String, 128)</li>
                <li><code className="text-slate-200">projectTitle</code> (String, 256)</li>
                <li><code className="text-slate-200">amount</code> (Float or Double)</li>
                <li><code className="text-slate-200">currency</code> (String, 10)</li>
                <li><code className="text-slate-200">dueDate</code> (String, 64)</li>
                <li><code className="text-slate-200">status</code> (String, 32)</li>
                <li><code className="text-slate-200">notes</code> (String, 512, Optional)</li>
              </ul>
            </li>
            <li>
              Under Collection <strong>Settings</strong> &rarr; <strong>Permissions</strong> &rarr; Add <code className="text-pink-300 font-mono">Any</code> or <code className="text-pink-300 font-mono">Users</code> with Read, Create, Update, Delete access.
            </li>
          </ol>

          <div className="p-3 bg-slate-900 rounded-xl border border-white/5 text-xs text-slate-400 font-mono">
            Note: Appwrite Invoicer automatically uses reactive in-memory state fallback if Database tables are not created yet!
          </div>
        </div>
      )}
    </div>
  );
};

export default AppwriteDbGuide;
