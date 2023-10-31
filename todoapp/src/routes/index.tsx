import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

import { Register } from '../pages/Register';
import { useUserContext } from '../context/useUserContext';
import { Login } from '../pages/Login';
import { Home } from "../pages/Home";

export function Routes() {
    const { user } = useUserContext();

    function renderConditionalRoutes() {
        if (!user) {
            return (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="login" component={Login} />
                    <Stack.Screen name="register" component={Register} />
                </Stack.Navigator>
            )
        }

        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="home" component={Home} />
            </Stack.Navigator>
        )
    }

    return (
        <NavigationContainer >
            <StatusBar style="light" />
            {renderConditionalRoutes()}
        </NavigationContainer>
    );
}