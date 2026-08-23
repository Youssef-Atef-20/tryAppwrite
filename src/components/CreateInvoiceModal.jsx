import React, { useState } from "react";

const CreateInvoiceModal = ({ isOpen, onClose, onCreateInvoice }) => {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [status, setStatus] = useState("Pending");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clientName || !projectTitle || !amount) return;

    setLoading(true);

    const invoiceNumber = `INV-${Math.floor(1000 + Math.random() * 9000)}`;

    const newInvoice = {
      $id: Date.now().toString(),
      invoiceNumber,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim() || "client@example.com",
      projectTitle: projectTitle.trim(),
      amount: parseFloat(amount),
      currency,
      dueDate,
      status,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
    };

    await onCreateInvoice(newInvoice);
    setLoading(false);
    onClose();

    // Reset form
    setClientName("");
    setClientEmail("");
    setProjectTitle("");
    setAmount("");
    setNotes("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 font-bold text-lg">
              ✏️
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Create New Invoice</h2>
              <p className="text-xs text-slate-400">Generate invoice for your client & project</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Client Name <span className="text-pink-500">*</span>
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Acme Corp / John Doe"
                className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm placeholder-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Client Email
              </label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="e.g. client@acme.com"
                className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm placeholder-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Project Title / Scope of Work <span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              required
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="e.g. Full-Stack Web Development & Appwrite Backend"
              className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm placeholder-slate-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Amount <span className="text-pink-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm placeholder-slate-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-900 text-white"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="EGP">EGP (E£)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Initial Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-900 text-white"
              >
                <option value="Pending">Pending (Unpaid)</option>
                <option value="Paid">Paid</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Notes / Terms
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Net 14 days payment terms"
                className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm placeholder-slate-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary text-xs px-4 py-2.5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary text-xs px-6 py-2.5 shadow-lg shadow-pink-500/25"
            >
              {loading ? "Generating Invoice..." : "Create & Save Invoice"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default CreateInvoiceModal;
