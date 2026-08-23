import React, { useState, useEffect } from "react";
import InvoiceStats from "../components/InvoiceStats";
import InvoiceList from "../components/InvoiceList";
import CreateInvoiceModal from "../components/CreateInvoiceModal";
import InvoicePreviewModal from "../components/InvoicePreviewModal";
import AppwriteDbGuide from "../components/AppwriteDbGuide";
import {
  getInvoices,
  createInvoiceInDb,
  updateInvoiceStatusInDb,
  deleteInvoiceFromDb,
} from "../appwriteConfig";

const Dashboard = ({ currentUser }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPreviewInvoice, setSelectedPreviewInvoice] = useState(null);

  useEffect(() => {
    fetchUserInvoices();
  }, [currentUser]);

  const fetchUserInvoices = async () => {
    setLoading(true);
    const docs = await getInvoices();
    
    if (docs && docs.length > 0) {
      // Filter invoices for current user if userId attribute exists, or show user docs
      const userDocs = currentUser
        ? docs.filter((doc) => !doc.userId || doc.userId === currentUser.$id)
        : docs;
      setInvoices(userDocs);
    } else {
      // Check localStorage or start empty for new user
      const stored = localStorage.getItem(`invoices_${currentUser?.$id || "guest"}`);
      if (stored) {
        try {
          setInvoices(JSON.parse(stored));
        } catch (e) {
          setInvoices([]);
        }
      } else {
        setInvoices([]);
      }
    }
    setLoading(false);
  };

  const saveInvoicesState = (newInvoices) => {
    setInvoices(newInvoices);
    if (currentUser?.$id) {
      localStorage.setItem(`invoices_${currentUser.$id}`, JSON.stringify(newInvoices));
    }
  };

  const handleCreateInvoice = async (newInvoice) => {
    const invoicePayload = {
      userId: currentUser?.$id || "guest",
      invoiceNumber: newInvoice.invoiceNumber,
      clientName: newInvoice.clientName,
      clientEmail: newInvoice.clientEmail,
      projectTitle: newInvoice.projectTitle,
      amount: newInvoice.amount,
      currency: newInvoice.currency,
      dueDate: newInvoice.dueDate,
      status: newInvoice.status,
      notes: newInvoice.notes,
    };

    const dbRes = await createInvoiceInDb(invoicePayload);

    if (dbRes) {
      newInvoice.$id = dbRes.$id;
    }

    const updated = [newInvoice, ...invoices];
    saveInvoicesState(updated);
  };

  const handleToggleStatus = async (invoice) => {
    const nextStatus = invoice.status === "Paid" ? "Pending" : "Paid";

    const updated = invoices.map((inv) =>
      inv.$id === invoice.$id ? { ...inv, status: nextStatus } : inv
    );
    saveInvoicesState(updated);

    await updateInvoiceStatusInDb(invoice.$id, nextStatus);
  };

  const handleDeleteInvoice = async (invoiceId) => {
    const updated = invoices.filter((inv) => inv.$id !== invoiceId);
    saveInvoicesState(updated);
    await deleteInvoiceFromDb(invoiceId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Personal Dashboard
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Welcome back, {currentUser?.name || "Freelancer"}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your personal invoices, monitor client payments, and sync with Appwrite
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary text-sm px-6 py-3 shadow-xl shadow-pink-500/25 flex items-center gap-2 self-start md:self-auto"
        >
          <span>+ Create New Invoice</span>
        </button>
      </div>

      {/* Stats Metrics */}
      <InvoiceStats invoices={invoices} />

      {/* Empty State Banner when no invoices exist */}
      {invoices.length === 0 && !loading && (
        <div className="glass-panel p-8 sm:p-12 rounded-3xl text-center border border-white/10 mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 text-3xl">
            📄
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            No Invoices Created Yet
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6">
            Your workspace is clean and ready. Click below to generate your first professional invoice for a client.
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary text-sm px-6 py-3 shadow-lg shadow-pink-500/25"
          >
            + Create Your First Invoice
          </button>
        </div>
      )}

      {/* Invoices List */}
      <InvoiceList
        invoices={invoices}
        onToggleStatus={handleToggleStatus}
        onDeleteInvoice={handleDeleteInvoice}
        onPreviewInvoice={(inv) => setSelectedPreviewInvoice(inv)}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
      />

      {/* Appwrite Database Setup Guide */}
      <AppwriteDbGuide />

      {/* Modals */}
      <CreateInvoiceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateInvoice={handleCreateInvoice}
      />

      <InvoicePreviewModal
        invoice={selectedPreviewInvoice}
        isOpen={!!selectedPreviewInvoice}
        onClose={() => setSelectedPreviewInvoice(null)}
      />

    </div>
  );
};

export default Dashboard;
