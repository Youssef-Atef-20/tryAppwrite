import React, { useState, useEffect } from "react";
import { db } from "../appwriteConfig";
import { ID } from "appwrite";

const DatabaseShowcase = () => {
  const [items, setItems] = useState([
    { $id: "1", title: "Initialize Appwrite Project", completed: true },
    { $id: "2", title: "Configure Google OAuth 2.0 Provider", completed: true },
    { $id: "3", title: "Deploy React 19 App to Vercel/Netlify", completed: false },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState("Demo State Active (Appwrite Database ready)");

  const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || "default_db";
  const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID || "todos";

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      if (db && typeof db.listDocuments === 'function') {
        const response = await db.listDocuments(DATABASE_ID, COLLECTION_ID);
        if (response && response.documents && response.documents.length > 0) {
          setItems(response.documents);
          setDbStatus("Connected to Appwrite Database Collection");
        }
      }
    } catch (err) {
      // Fallback gracefully to demo interactive items
      console.log("Database notice: Using interactive demo state mode.");
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem = {
      $id: Date.now().toString(),
      title: newTitle.trim(),
      completed: false,
    };

    setLoading(true);
    try {
      if (db && typeof db.createDocument === 'function') {
        await db.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
          title: newTitle.trim(),
          completed: false,
        });
        await fetchDocuments();
      } else {
        setItems((prev) => [newItem, ...prev]);
      }
    } catch (err) {
      // Add to local state if backend collection is not configured yet
      setItems((prev) => [newItem, ...prev]);
    } finally {
      setNewTitle("");
      setLoading(false);
    }
  };

  const handleToggleComplete = async (item) => {
    const updatedStatus = !item.completed;
    setItems((prev) =>
      prev.map((i) => (i.$id === item.$id ? { ...i, completed: updatedStatus } : i))
    );

    try {
      if (db && typeof db.updateDocument === 'function') {
        await db.updateDocument(DATABASE_ID, COLLECTION_ID, item.$id, {
          completed: updatedStatus,
        });
      }
    } catch (err) {
      // Silent fallback
    }
  };

  const handleDeleteItem = async (id) => {
    setItems((prev) => prev.filter((i) => i.$id !== id));

    try {
      if (db && typeof db.deleteDocument === 'function') {
        await db.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      }
    } catch (err) {
      // Silent fallback
    }
  };

  return (
    <section id="db-demo" className="py-12 max-w-5xl mx-auto px-4">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
              Database & Collections
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Real-time Collection CRUD Demo
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-white/5">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span>{dbStatus}</span>
          </div>
        </div>

        {/* Create Document Input */}
        <form onSubmit={handleAddItem} className="flex gap-3 mb-8">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Add a new item or task document..."
            className="glass-input flex-1 px-4 py-3 rounded-xl text-sm placeholder-slate-500"
          />
          <button
            type="submit"
            disabled={loading || !newTitle.trim()}
            className="btn-primary px-6 text-sm font-semibold shadow-lg shadow-pink-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Add Item</span>
          </button>
        </form>

        {/* Documents List */}
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.$id}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-white/5 hover:border-white/15 transition-all group"
            >
              <div
                onClick={() => handleToggleComplete(item)}
                className="flex items-center gap-3.5 cursor-pointer flex-1"
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                    item.completed
                      ? "bg-pink-600 border-pink-500 text-white"
                      : "border-slate-700 bg-slate-900"
                  }`}
                >
                  {item.completed && (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-sm font-medium transition-all ${
                    item.completed ? "line-through text-slate-500" : "text-slate-200"
                  }`}
                >
                  {item.title}
                </span>
              </div>

              <button
                onClick={() => handleDeleteItem(item.$id)}
                className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors opacity-80 group-hover:opacity-100"
                title="Delete document"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DatabaseShowcase;
