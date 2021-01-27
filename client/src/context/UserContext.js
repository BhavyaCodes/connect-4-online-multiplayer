import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const UserContext = createContext();
export const DispatchUserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", {});

  return (
    <UserContext.Provider value={user}>
      <DispatchUserContext.Provider value={setUser}>
        {children}
      </DispatchUserContext.Provider>
    </UserContext.Provider>
  );
}
