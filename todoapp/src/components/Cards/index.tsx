import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Checkbox from 'expo-checkbox';
import { useState } from "react";
import Trash from "../Trash";
import { changeTodoValue, deleteTodo } from "../../services/todos";
import { useMutation } from "react-query";
import { queryClient } from "../../services/queryClient";
import { useUserContext } from "../../context/useUserContext";

interface Props {
    is_checked: boolean;
    name: string;
    id: number;
}

export function Cards({ is_checked, name, id }: Props) {
    const [isChecked, setChecked] = useState(is_checked);
    const { user } = useUserContext();

    const mutationCheckTodo = useMutation(async (data: { id: number, userId: string }) => {
        const response = await changeTodoValue(data);
        return response;
    }, {
        onSuccess: (response) => {
            queryClient.invalidateQueries('todos')
        }
    })

    const mutationDeleteTodo = useMutation(async (data: { id: number, userId: string }) => {
        const response = await deleteTodo(data);
        return response;
    }, {
        onSuccess: (response) => {
            queryClient.invalidateQueries('todos')
        }
    })

    function handleChangeTodo(value: boolean) {
        const body = {
            id: id,
            userId: user.id
        }
        setChecked(value)
        mutationCheckTodo.mutate(body);
    }

    function handleDeleteTodo() {
        const body = {
            id: id,
            userId: user.id
        }
        mutationDeleteTodo.mutate(body);
    }

    return (
        <View style={styles.container}>
            <Checkbox color={'#5E60CE'} value={isChecked} onValueChange={handleChangeTodo} />
            <Text style={styles.text}>{name}</Text>
            <TouchableOpacity onPress={handleDeleteTodo}>
                <Trash />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#262626',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        borderWidth: 1,
        borderColor: '#333333',
    },
    text: {
        color: '#F2F2F2',
        display: 'flex',
        flex: 1
    },
});