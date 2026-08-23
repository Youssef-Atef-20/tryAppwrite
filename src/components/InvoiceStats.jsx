import React from "react";

const InvoiceStats = ({ invoices }) => {
  const totalRevenue = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + Number(inv.amount || 0), 0);

  const pendingRevenue = invoices
    .filter((inv) => inv.status === "Pending")
    .reduce((sum, inv) => sum + Number(inv.amount || 0), 0);

  const paidCount = invoices.filter((inv) => inv.status === "Paid").length;
  const pendingCount = invoices.filter((inv) => inv.status === "Pending").length;
  const totalCount = invoices.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      
      {/* Card 1: Total Paid Revenue */}
      <div className="glass-panel p-5 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Total Revenue Paid
          </span>
          <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-lg">💰</span>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-white">
          ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-emerald-400/80 mt-1 font-medium">
          {paidCount} paid invoice{paidCount !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Card 2: Pending Revenue */}
      <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-orange-500/5 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Pending Payments
          </span>
          <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 text-lg">⏳</span>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-white">
          ${pendingRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-amber-400/80 mt-1 font-medium">
          {pendingCount} invoice{pendingCount !== 1 ? "s" : ""} awaiting payment
        </div>
      </div>

      {/* Card 3: Total Invoices */}
      <div className="glass-panel p-5 rounded-2xl border border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-rose-500/5 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-pink-400 uppercase tracking-wider">
            Total Invoices
          </span>
          <span className="p-2 rounded-xl bg-pink-500/20 text-pink-400 text-lg">📄</span>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-white">
          {totalCount}
        </div>
        <div className="text-xs text-pink-400/80 mt-1 font-medium">
          Created & Managed
        </div>
      </div>

      {/* Card 4: Completion Rate */}
      <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-indigo-500/5 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
            Paid Rate
          </span>
          <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400 text-lg">📈</span>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-white">
          {totalCount > 0 ? Math.round((paidCount / totalCount) * 100) : 0}%
        </div>
        <div className="text-xs text-purple-400/80 mt-1 font-medium">
          Success rate
        </div>
      </div>

    </div>
  );
};

export default InvoiceStats;
