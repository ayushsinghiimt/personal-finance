"use client";
const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

const getUserData = () => {
  return {
    id: localStorage.getItem("user_id"),
    email: localStorage.getItem("user_email"),
  };
};

export { getAccessToken, getUserData };
