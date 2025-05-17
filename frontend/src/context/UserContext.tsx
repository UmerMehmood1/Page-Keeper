import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { User } from "@/types/User";

// Define context value type
interface UserContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

// Create the context
const UserContext = createContext<UserContextValue | null>(null);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URI}/api/auth/me`,
          { withCredentials: true } // Ensures cookies are sent
        );
        const fetchedUser = response.data.data.user;
        setUser(fetchedUser);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
