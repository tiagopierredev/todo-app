import { View, Text, StyleSheet } from "react-native";
import ClipBoard from "../ClipBoard";

export function EmptyList() {
    return (
        <View style={styles.container}>
            <ClipBoard />
            <Text style={styles.text}>You don't have tasks registered yet</Text>
            <Text style={styles.secondText}>Create tasks and organize your to-do items</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 48
    },
    text: {
        color: '#808080',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 16,
    },
    secondText: {
        color: '#808080',
        fontSize: 14,
        marginTop: 5,
    }
});
