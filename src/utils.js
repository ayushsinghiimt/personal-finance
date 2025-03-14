"use client";
const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export { getAccessToken };
