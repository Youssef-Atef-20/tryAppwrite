import React, { useState } from "react";

const InvoiceList = ({
  invoices,
  onToggleStatus,
  onDeleteInvoice,
  onPreviewInvoice,
  onOpenCreateModal,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "All" ? true : inv.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "Pending":
        return "bg-amber-500/15 text-amber-400 border-amber-500/30";
      case "Draft":
        return "bg-slate-800 text-slate-400 border-slate-700";
      default:
        return "bg-slate-800 text-slate-400 border-slate-700";
    }
  };

  const getCurrencySymbol = (curr) => {
    switch (curr) {
      case "EUR": return "€";
      case "EGP": return "E£";
      case "GBP": return "£";
      default: return "$";
    }
  };

  return (
    <section id="invoices" className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 relative">
      
      {/* Top Filter & Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
        
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-white/5 overflow-x-auto">
          {["All", "Paid", "Pending", "Draft"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                filterStatus === tab
                  ? "bg-pink-600 text-white shadow-md shadow-pink-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search & Add Invoice Actions */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by client or project..."
              className="glass-input w-full pl-9 pr-3 py-2 rounded-xl text-xs placeholder-slate-500"
            />
            <span className="absolute left-3 top-2.5 text-slate-500 text-xs">🔍</span>
          </div>

          <button
            onClick={onOpenCreateModal}
            className="btn-primary text-xs px-4 py-2 flex items-center gap-2 whitespace-nowrap shadow-lg shadow-pink-500/20"
          >
            <span>+ New Invoice</span>
          </button>
        </div>

      </div>

      {/* Invoices List / Table */}
      {filteredInvoices.length === 0 ? (
        <div className="text-center py-16 px-4">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-500 text-2xl border border-white/5">
            📂
          </div>
          <h3 className="text-base font-bold text-white mb-1">No Invoices Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
            {searchTerm
              ? `No invoices matching "${searchTerm}"`
              : `There are no ${filterStatus !== "All" ? filterStatus.toLowerCase() : ""} invoices created yet.`}
          </p>
          <button
            onClick={onOpenCreateModal}
            className="btn-primary text-xs px-5 py-2.5"
          >
            + Create First Invoice
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/60 text-slate-400 font-mono uppercase text-[11px] border-b border-white/10">
              <tr>
                <th className="px-4 py-3">Invoice</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Project Title</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {filteredInvoices.map((inv) => (
                <tr key={inv.$id} className="hover:bg-slate-900/40 transition-colors group">
                  
                  {/* Invoice # */}
                  <td className="px-4 py-4 font-mono font-bold text-pink-400">
                    {inv.invoiceNumber}
                  </td>

                  {/* Client */}
                  <td className="px-4 py-4">
                    <div className="font-semibold text-white">{inv.clientName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{inv.clientEmail}</div>
                  </td>

                  {/* Project */}
                  <td className="px-4 py-4 text-slate-300 font-medium max-w-[200px] truncate">
                    {inv.projectTitle}
                  </td>

                  {/* Due Date */}
                  <td className="px-4 py-4 text-slate-400 font-mono text-xs">
                    {inv.dueDate}
                  </td>

                  {/* Amount */}
                  <td className="px-4 py-4 text-right font-mono font-bold text-white">
                    {getCurrencySymbol(inv.currency)}{Number(inv.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>

                  {/* Status Toggle */}
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => onToggleStatus(inv)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-all hover:scale-105 cursor-pointer ${getStatusBadge(
                        inv.status
                      )}`}
                      title="Click to toggle Paid/Pending"
                    >
                      {inv.status}
                    </button>
                  </td>

                  {/* Action Buttons */}
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onPreviewInvoice(inv)}
                        className="btn-secondary text-xs px-2.5 py-1.5"
                        title="View / Print Invoice"
                      >
                        👁️ View
                      </button>

                      <button
                        onClick={() => onDeleteInvoice(inv.$id)}
                        className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                        title="Delete Invoice"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </section>
  );
};

export default InvoiceList;
