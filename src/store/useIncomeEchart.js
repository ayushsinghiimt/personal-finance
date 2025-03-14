import { create } from "zustand";
import axios from "axios";
import { getAccessToken } from "@/utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const useIncomeEchart = create((set) => ({
  data: null,
  isLoading: false,
  error: null,
  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      console.log("Fetching financial graph data...");
      const response = await axios.get(
        `${API_BASE_URL}/financial-summary/income-expense`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`, // Attach token
          },
        }
      );
      console.log("Graph Data:", response.data);

      set({ data: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching financial graph data:", error);
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useIncomeEchart;
