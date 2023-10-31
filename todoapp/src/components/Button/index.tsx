import { Text, StyleSheet, TouchableOpacity, ActivityIndicator, TouchableOpacityProps } from 'react-native';

interface Props extends TouchableOpacityProps {
    text: string,
    isLoading?: boolean
}

export function Button({ text, isLoading, ...rest }: Props) {

    function renderTextOrActivityIndicator() {
        if (isLoading) {
            return <ActivityIndicator color="#F2F2F2" />
        }
        return <Text style={styles.text}>{text}</Text>
    }

    return (
        <TouchableOpacity style={styles.container} disabled={isLoading} {...rest}>
            {renderTextOrActivityIndicator()}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1E6F9F',
        borderRadius: 6,
    },
    text: {
        color: '#F2F2F2',
        fontSize: 16,
        fontWeight: 'bold',
    }
})