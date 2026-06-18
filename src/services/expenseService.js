// src/services/expenseService.js
//
// All Firestore CRUD logic lives here, kept separate from the UI screens.
// Every screen imports from this file instead of talking to Firestore directly.

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const EXPENSES_COLLECTION = "expenses";

// CREATE - add a new expense document
export const addExpense = async (expense) => {
  // expense = { title, amount, category, date }
  const docRef = await addDoc(collection(db, EXPENSES_COLLECTION), {
    title: expense.title,
    amount: Number(expense.amount),
    category: expense.category,
    date: expense.date,
  });
  return docRef.id;
};

// READ - get all expenses, newest date first
export const getExpenses = async () => {
  const q = query(collection(db, EXPENSES_COLLECTION), orderBy("date", "desc"));
  const snapshot = await getDocs(q);

  const expenses = [];
  snapshot.forEach((docSnap) => {
    expenses.push({
      id: docSnap.id,
      ...docSnap.data(),
    });
  });

  return expenses;
};

// UPDATE - edit an existing expense by its document id
export const updateExpense = async (expenseId, updatedData) => {
  const expenseRef = doc(db, EXPENSES_COLLECTION, expenseId);
  await updateDoc(expenseRef, {
    title: updatedData.title,
    amount: Number(updatedData.amount),
    category: updatedData.category,
    date: updatedData.date,
  });
};

// DELETE - remove an expense by its document id
export const deleteExpense = async (expenseId) => {
  const expenseRef = doc(db, EXPENSES_COLLECTION, expenseId);
  await deleteDoc(expenseRef);
};
