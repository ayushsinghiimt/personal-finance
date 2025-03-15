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
    // Get initial session

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log("session", session);

      if (session) {
        const user = session.user; // Extract the user object from the session

        if (user) {
          // Store user ID and email in localStorage

          localStorage.setItem("user_id", user.id);
          localStorage.setItem("user_email", user.email);
        }
      }
      if (session?.access_token) {
        localStorage.setItem("access_token", session.access_token);
      }
      setLoading(false); //
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setLoading(false);

      if (event === "SIGNED_OUT") {
        router.push("/"); // Redirect to home on logout
      }
    });

    return () => subscription.unsubscribe(); // Cleanup on unmount
  }, [router]);

  if (loading) {
    return (
      <div className="loading-container">
        <Skeleton visible={loading}></Skeleton>
      </div>
    );
  }

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
            redirectTo={`${window.location.origin}${router.asPath}`}
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
