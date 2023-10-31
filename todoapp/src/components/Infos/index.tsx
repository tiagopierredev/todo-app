import { View, Text, StyleSheet } from 'react-native';

interface Props {
    count: number;
    checked: number;
}

export function Infos({ count, checked }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.infos}>
                <Text style={styles.create}>All tasks</Text>
                <View style={styles.info}>
                    <Text style={styles.infoText}>{count}</Text>
                </View>
            </View>
            <View style={styles.infos}>
                <Text style={styles.completed}>Completed</Text>
                <View style={styles.info}>
                    <Text style={styles.infoText}>{checked}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 33,
        width: '94%',
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
        paddingBottom: 20
    },
    infos: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    create: {
        color: '#4EA8DE',
        fontSize: 14,
        fontWeight: 'bold',
    },
    completed: {
        color: '#8284FA',
        fontSize: 14,
        fontWeight: 'bold',
    },
    info: {
        backgroundColor: '#333333',
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12.5,
    },
    infoText: {
        color: '#D9D9D9',
        fontSize: 12,
        fontWeight: 'bold',
    }
});