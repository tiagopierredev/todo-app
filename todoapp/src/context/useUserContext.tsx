import { createContext, useContext, useState } from "react";

interface UserProps {
  id: string;
  name: string;
  email: string;
}

const UserContext = createContext(
  {
    user: null as UserProps,
    loginUser: (data: any) => { },
    logoutUser: () => { },
  }
);

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState<UserProps | null>(null);

  const loginUser = (userData: UserProps) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}
