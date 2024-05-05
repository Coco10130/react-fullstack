// UserContextProvider.js
import axios from "../src/axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get("/api/auth/profile");
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch user data only if user is not already set
    if (!user) {
      fetchUserData();
    }
  }, [user]);

  const logout = () => {
    axios.get("/api/auth/logout").then(({ data }) => {
      setUser(null);
      if (data.message) {
        toast.success(data.message);
      }
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}
