"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { AuthContext } from "./authContext";

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState("not-logged");

  useEffect(() => {
    fetch("http://localhost:3000/user", {
      credentials: "include",
      mode: "cors",
      method: "GET",
    }).then(async (val) => {
      if (await val.json()) {
        setAuthState("logged-in");
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
