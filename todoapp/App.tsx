import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { QueryClientProvider } from 'react-query'
import { Routes } from './src/routes';
import { queryClient } from './src/services/queryClient';
import Toast from 'react-native-toast-message';
import { UserProvider } from './src/context/useUserContext';

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_700Bold
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }


  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Routes />
        <Toast />
      </UserProvider>
    </QueryClientProvider>
  )
}


