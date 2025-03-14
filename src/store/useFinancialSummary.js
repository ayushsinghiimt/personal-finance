import { create } from "zustand";
import axios from "axios";
import { getAccessToken } from "@/utils";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const useFinancialSummaryStore = create((set) => ({
  data: null,
  isLoading: false,
  error: null,
  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      console.log("fetching data");
      const response = await axios.get(`${API_BASE_URL}/financial-summary`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`, // Attach the token here
        },
      });
      console.log("response", response);
      set({ data: response.data, isLoading: false });
    } catch (error) {
      console.error("error", error);
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useFinancialSummaryStore;
