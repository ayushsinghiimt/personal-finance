"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../../superbaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import "./authProvider.css";
import { Skeleton } from "@mantine/core";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setSession(session);
        storeSessionInLocalStorage(session);
      }
      setLoading(false);
    };

    const storeSessionInLocalStorage = (session) => {
      const user = session.user;
      if (user) {
        localStorage.setItem("user_id", user.id);
        localStorage.setItem("user_email", user.email);
      }
      if (session.access_token) {
        localStorage.setItem("access_token", session.access_token);
      }
    };

    // Fetch initial session
    fetchSession();

    // Listen for auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session);
        setSession(session);
        setLoading(false);

        if (session) {
          storeSessionInLocalStorage(session);
        }

        if (event === "SIGNED_OUT") {
          localStorage.clear(); // Clear local storage on sign out
          router.push("/"); // Redirect to home on logout
        }
      }
    );

    return () => subscription.unsubscribe(); // Cleanup on unmount
  }, [router]);

  if (loading) {
    return (
      <div className="loading-container">
        <Skeleton visible={loading}></Skeleton>
      </div>
    );
  }
  console.log("window", `${window.location.origin}${router.asPath}`);

  if (!session) {
    // If no session, show login form

    return (
      <div className="container">
        <div className="login-box">
          <h2 className="login-title">Login to Your Account</h2>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["google"]}
            redirectTo={`${window.location.origin}`}
            options={{
              queryParams: {
                prompt: "select_account", // Force showing Google account chooser
              },
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
