import { create } from "zustand";
import axios from "axios";
import { getAccessToken } from "@/utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const useCategoryExpensesStore = create((set) => ({
  data: null,
  isLoading: false,
  error: null,

  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      console.log("Fetching category expenses data...");
      const response = await axios.get(
        `${API_BASE_URL}/financial-summary/expenses-category`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`, // Attach token
          },
        }
      );

      console.log("Category expenses response:", response.data);
      set({ data: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching category expenses:", error);
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useCategoryExpensesStore;
