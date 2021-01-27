import { createContext, useState } from "react";

export const UserContext = createContext();
export const DispatchUserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={user}>
      <DispatchUserContext.Provider value={setUser}>
        {children}
      </DispatchUserContext.Provider>
    </UserContext.Provider>
  );
}
