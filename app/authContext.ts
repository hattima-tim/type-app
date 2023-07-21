import { createContext, Dispatch, SetStateAction } from "react";

type AuthContextType = [
  authState: string,
  setAuthState: Dispatch<SetStateAction<string>>
];

export const AuthContext = createContext<AuthContextType>([
  "not-logged",
  () => {},
]);
