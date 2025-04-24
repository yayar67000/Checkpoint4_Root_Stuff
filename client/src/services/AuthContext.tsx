import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext<AuthProps | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [role, setRole] = useState(localStorage.getItem("role") || "anonymous");
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || "anonymous",
  );

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    }
  }, [role]);

  useEffect(() => {
    if (userName) {
      localStorage.setItem("userName", userName);
    }
  }, [userName]);

  return (
    <authContext.Provider value={{ role, setRole, userName, setUserName }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("Le auth context doit exister");
  }

  return context;
}
