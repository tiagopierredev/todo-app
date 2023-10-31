import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Logo from "../Logo";
import { useUserContext } from "../../context/useUserContext";
import Feather from '@expo/vector-icons/Feather';

export function Header() {
    const { user, logoutUser } = useUserContext();
    const firstName = user.name.split(' ')[0];

    return (
        <View style={styles.container}>
            <View>
                <Logo />
                <View>
                    <Text style={styles.text}>Hello, {firstName}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={logoutUser}>
                <Feather name="log-out" size={24} color="#E25858" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0D0D0D',
        height: 200,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 24,
        paddingRight: 16,
        flexDirection: 'row',
    },
    text: {
        color: '#F2F2F2',
        fontSize: 16,
        fontFamily: 'Inter_700Bold',
        marginTop: 4
    },
});
