import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import Plus from '../Plus';
import { useMutation } from 'react-query';
import { addTodo } from '../../services/todos';
import { useUserContext } from '../../context/useUserContext';
import { queryClient } from '../../services/queryClient';

export function InputAddTodo() {
    const { user } = useUserContext();
    const [text, setText] = useState('');

    const mutationNewTask = useMutation(async (data: { name: string }) => {
        const response = await addTodo(data);
        return response;
    }, {
        onSuccess: (response) => {
            setText('')
            queryClient.invalidateQueries('todos')
        }
    })

    async function handleNewTask() {
        const body = {
            name: text,
            userId: user.id
        }

        mutationNewTask.mutateAsync(body)
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' />
            <TextInput style={styles.input}
                placeholder='Add a new task'
                placeholderTextColor="#808080"
                cursorColor="#5E60CE"
                value={text}
                onChangeText={setText}
            />
            <TouchableOpacity style={styles.button} disabled={!text} onPress={handleNewTask}>
                {
                    mutationNewTask.isLoading ? <ActivityIndicator color="#F2F2F2" /> : <Plus />
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        alignSelf: 'center',
        marginTop: -27,
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#262626',
        height: 54,
        borderRadius: 6,
        fontSize: 16,
        color: '#808080',
        padding: 16,
        width: '100%',
    },
    button: {
        height: 54,
        width: 54,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1E6F9F',
        borderRadius: 6,
    }
});