import { client, account, databases as db } from "./lib/appwrite";
import { ID, Query } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || "freelance_db";
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID || "invoices";

export const getInvoices = async () => {
  try {
    const response = await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("$createdAt")
    ]);
    return response.documents;
  } catch (error) {
    console.warn("Appwrite Database Notice:", error.message || "Using demo invoice storage mode.");
    return null;
  }
};

export const createInvoiceInDb = async (invoiceData) => {
  try {
    const response = await db.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      invoiceData
    );
    return response;
  } catch (error) {
    console.warn("Appwrite DB Create Notice:", error.message);
    return null;
  }
};

export const updateInvoiceStatusInDb = async (invoiceId, status) => {
  try {
    const response = await db.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      invoiceId,
      { status }
    );
    return response;
  } catch (error) {
    console.warn("Appwrite DB Update Notice:", error.message);
    return null;
  }
};

export const deleteInvoiceFromDb = async (invoiceId) => {
  try {
    await db.deleteDocument(DATABASE_ID, COLLECTION_ID, invoiceId);
    return true;
  } catch (error) {
    console.warn("Appwrite DB Delete Notice:", error.message);
    return false;
  }
};

export { client, account, db, DATABASE_ID, COLLECTION_ID };