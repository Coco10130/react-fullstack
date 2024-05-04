import axios from "../src/axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      axios.get("/api/auth/profile").then(({ data }) => {
        setUser(data);
      });
    }
  }, []);

  const logout = () => {
    axios.get("/api/auth/logout").then(({ data }) => {
      setUser(null);

      if (data.message) {
        toast.success(data.message);
      }
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
