import { create } from "zustand";
import axios from "axios";
import { getAccessToken } from "@/utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const useAssetLiabilityStore = create((set) => ({
  assetsAndLiabilities: [],
  categories: [],
  isLoading: false,
  isLoadingCategories: false,
  error: null,

  fetchAssetsAndLiabilities: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/assets-liabilities`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      set({ assetsAndLiabilities: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  createAssetOrLiability: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/assets-liabilities/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      set((state) => ({
        assetsAndLiabilities: [response.data, ...state.assetsAndLiabilities],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateAssetOrLiability: async (id, payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(
        `${API_BASE_URL}/assets-liabilities/update/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      set((state) => ({
        assetsAndLiabilities: state.assetsAndLiabilities.map((item) =>
          item.id === id ? response.data : item
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  deleteAssetOrLiability: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_BASE_URL}/assets-liabilities/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      set((state) => ({
        assetsAndLiabilities: state.assetsAndLiabilities.filter(
          (item) => item.id !== id
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchAssetLiabilityCategories: async () => {
    set({ error: null });
    try {
      const response = await axios.get(
        `${API_BASE_URL}/assets-liabilities/categories`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      set({ categories: response.data });
    } catch (error) {
      set({ error: error.message });
    }
  },
}));

export default useAssetLiabilityStore;
