import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import InvoiceStats from "./components/InvoiceStats";
import InvoiceList from "./components/InvoiceList";
import CreateInvoiceModal from "./components/CreateInvoiceModal";
import InvoicePreviewModal from "./components/InvoicePreviewModal";
import AppwriteDbGuide from "./components/AppwriteDbGuide";
import AuthShowcase from "./components/AuthShowcase";
import Footer from "./components/Footer";
import {
  getInvoices,
  createInvoiceInDb,
  updateInvoiceStatusInDb,
  deleteInvoiceFromDb,
} from "./appwriteConfig";
import { account } from "./lib/appwrite";
import "./App.css";

const INITIAL_DEMO_INVOICES = [
  {
    $id: "demo-inv-1",
    invoiceNumber: "INV-1001",
    clientName: "TechCorp Solutions",
    clientEmail: "billing@techcorp.io",
    projectTitle: "React 19 Frontend Development & UI Design",
    amount: 2850.0,
    currency: "USD",
    dueDate: "2026-09-01",
    status: "Paid",
    notes: "Payment received via Bank Wire",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    $id: "demo-inv-2",
    invoiceNumber: "INV-1002",
    clientName: "Global Digital Agency",
    clientEmail: "accounts@globaldigital.com",
    projectTitle: "Appwrite Authentication & Database Integration",
    amount: 1450.0,
    currency: "USD",
    dueDate: "2026-09-10",
    status: "Pending",
    notes: "Net 14 days terms",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    $id: "demo-inv-3",
    invoiceNumber: "INV-1003",
    clientName: "Cairo Commerce Ltd",
    clientEmail: "finance@cairocommerce.eg",
    projectTitle: "Full Stack Web Platform Maintenance",
    amount: 32000.0,
    currency: "EGP",
    dueDate: "2026-09-15",
    status: "Pending",
    notes: "Monthly retainer contract",
    createdAt: new Date().toISOString(),
  },
];

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [invoices, setInvoices] = useState(INITIAL_DEMO_INVOICES);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPreviewInvoice, setSelectedPreviewInvoice] = useState(null);

  useEffect(() => {
    checkUserSession();
    fetchInvoices();
  }, []);

  const checkUserSession = async () => {
    try {
      setLoadingUser(true);
      const user = await account.get();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  const fetchInvoices = async () => {
    const docs = await getInvoices();
    if (docs && docs.length > 0) {
      setInvoices(docs);
    }
  };

  const handleCreateInvoice = async (newInvoice) => {
    // Save to Appwrite Database if configured
    const dbRes = await createInvoiceInDb({
      invoiceNumber: newInvoice.invoiceNumber,
      clientName: newInvoice.clientName,
      clientEmail: newInvoice.clientEmail,
      projectTitle: newInvoice.projectTitle,
      amount: newInvoice.amount,
      currency: newInvoice.currency,
      dueDate: newInvoice.dueDate,
      status: newInvoice.status,
      notes: newInvoice.notes,
    });

    if (dbRes) {
      newInvoice.$id = dbRes.$id;
    }

    setInvoices((prev) => [newInvoice, ...prev]);
  };

  const handleToggleStatus = async (invoice) => {
    const nextStatus = invoice.status === "Paid" ? "Pending" : "Paid";

    // Optimistic update
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.$id === invoice.$id ? { ...inv, status: nextStatus } : inv
      )
    );

    // Appwrite DB sync
    await updateInvoiceStatusInDb(invoice.$id, nextStatus);
  };

  const handleDeleteInvoice = async (invoiceId) => {
    setInvoices((prev) => prev.filter((inv) => inv.$id !== invoiceId));
    await deleteInvoiceFromDb(invoiceId);
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 selection:bg-pink-500 selection:text-white flex flex-col justify-between">
      <div>
        <Navbar
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          loadingUser={loadingUser}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
        />

        <main className="max-w-7xl mx-auto px-4 py-8">
          
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Appwrite Freelance Dashboard
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Freelancer Invoices & Revenue
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Track payments, generate professional client invoices, and sync with Appwrite Databases.
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

          {/* User Auth Section */}
          <AuthShowcase
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />

        </main>
      </div>

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

      <Footer />
    </div>
  );
}

export default App;
