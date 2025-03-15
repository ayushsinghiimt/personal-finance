"use client";
import { create } from "zustand";
import axios from "axios";
import { getAccessToken } from "../../utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const useUserStore = create((set) => ({
  user: null,
  users: [],
  loading: false,
  error: null,

  // Create user
  createUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      console.log("User data:", userData);
      const response = await axios.post(`${API_BASE_URL}/user`, userData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`, // Attach token
        },
      });
      alert("User created:", response.data);
      set({ user: response.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.error || "Failed to create user",
        loading: false,
      });
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`${API_BASE_URL}/user/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`, // Attach token
        },
      });
      set({ user: response.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.error || "Failed to update user",
        loading: false,
      });
    }
  },

  // Get user by email
  getUser: async (email) => {
    console.log("Getting user with email ", email);
    set({ loading: true, error: null });
    try {
      console.log(API_BASE_URL);
      const response = await axios.get(`${API_BASE_URL}/user/${email}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`, // Attach token
        },
      });
      console.log("response data:", response.data);
      set({ user: response.data, loading: false });
      return response.data;
    } catch (error) {
      console.log("Error fetching user:", error);
      set({
        error: error.response?.data?.error || "Failed to fetch user",
        loading: false,
      });
    }
  },

  // Reset state
  resetUserState: () =>
    set({ user: null, users: [], error: null, loading: false }),
}));

export default useUserStore;
