import { createContext, useContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";
import { useMutation } from "react-query";
import { login } from "../services/user";

interface UserLoginProps {
  email: string;
  password: string;
}

interface UserProps {
  name: string;
}

const UserContext = createContext(
  {
    user: null as UserProps,
    loginUser: async (data: any) => { },
    logoutUser: () => { },
    isLoading: false,
  }
);

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState<UserProps | null>(null);

  const { mutateAsync, isLoading } = useMutation(async (data: any) => {
    const response = await login(data)
    return response
  }, {
    onSuccess: async (response) => {
      setUser(response.data?.user)
      await AsyncStorage.setItem('@todo_token', response.data?.token)
    },
    onError: (error: any) => {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Unexpected Issue',
        text2: error.message,
        visibilityTime: 3000,
        topOffset: 100,
      });
    }
  })

  const loginUser = async (userData: UserProps) => {
    await mutateAsync(userData);
  };

  const logoutUser = async () => {
    await AsyncStorage.removeItem('@todo_token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
