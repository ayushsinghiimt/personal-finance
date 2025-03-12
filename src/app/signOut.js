import { supabase } from "../../superbaseClient";

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error.message);
  } else {
    console.log("User signed out successfully");
  }
};
