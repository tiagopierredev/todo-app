import { useForm, useController } from 'react-hook-form'
import { TextInput, StyleSheet, Text, View, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
    placeholder: string
    control: any,
    name: string,
}

export function Input({ placeholder, control, name, ...rest }: InputProps) {
    const { field, fieldState: { error: err } } = useController({
        control,
        name,
        defaultValue: '',
    })

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{placeholder}</Text>
            <TextInput
                {...rest}
                style={styles.input}
                value={field.value}
                placeholder={placeholder}
                placeholderTextColor="#808080"
                cursorColor="#5E60CE"
                onChangeText={field.onChange}
            />
            {err && <Text style={styles.error}>{err.message}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 8
    },
    input: {
        backgroundColor: '#262626',
        height: 64,
        borderRadius: 6,
        fontSize: 16,
        color: '#F2F2F2',
        padding: 16,
        width: '100%',
    },
    text: {
        color: '#F2F2F2',
        fontFamily: 'Inter_400Regular',
        fontSize: 16
    },
    error: {
        color: '#E25858',
        fontFamily: 'Inter_400Regular',
        fontSize: 12
    }
});