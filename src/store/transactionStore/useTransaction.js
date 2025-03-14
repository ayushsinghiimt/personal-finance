import { create } from "zustand";
import axios from "axios";
import { getAccessToken } from "@/utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const useTransactionStore = create((set, get) => ({
  transactions: [],
  categories: [],
  isCategoriesLoading: false,
  isLoading: true,
  error: null,

  // ✅ Fetch transactions
  fetchTransactions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/transactions`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      set({ transactions: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching transactions:", error);
      set({ error: error.message, isLoading: false });
    }
  },

  fetchTransactionCategories: async () => {
    set({ isCategoriesLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_BASE_URL}/transactions/categories`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      set({ categories: response.data, isCategoriesLoading: false });
    } catch (error) {
      console.error("Error fetching categories:", error);
      set({ error: error.message, isLoading: false });
    }
  },

  // ✅ Create transaction
  createTransaction: async (transaction) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/transactions`,
        transaction,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      set((state) => ({
        transactions: [response.data, ...state.transactions],
      }));
    } catch (error) {
      console.error("Error creating transaction:", error);
      set({ error: error.message });
    }
  },

  // ✅ Update transaction
  updateTransaction: async (id, updates) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/transactions/${id}`,
        updates,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      set((state) => ({
        transactions: state.transactions.map((transaction) =>
          transaction.id === id ? response.data : transaction
        ),
      }));
    } catch (error) {
      console.error("Error updating transaction:", error);
      set({ error: error.message });
    }
  },

  // ✅ Delete transaction
  deleteTransaction: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      set((state) => ({
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== id
        ),
      }));
    } catch (error) {
      console.error("Error deleting transaction:", error);
      set({ error: error.message });
    }
  },
}));

export default useTransactionStore;
