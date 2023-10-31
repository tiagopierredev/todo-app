import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import * as yup from "yup"

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import Logo from '../../components/Logo';
import { api } from '../../services/api'
import Toast from 'react-native-toast-message'
import { register } from '../../services/user'

interface SchemaProps {
    email: string,
    password: string,
    name: string
}

const schema = yup
    .object({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    })
    .required()


export function Register({ navigation }) {
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    })

    const { mutateAsync, isLoading } = useMutation(async (data: SchemaProps) => {
        const response = await register(data)
        return response
    }, {
        onSuccess: (response) => {
            Toast.show({
                type: 'success',
                position: 'top',
                text1: "Account Created",
                text2: "Your account has been created",
                visibilityTime: 3000,
                topOffset: 100,
            });
            handleLogin()
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

    function handleLogin() {
        navigation.navigate('login')
    }

    async function submit(data: SchemaProps) {
        await mutateAsync(data)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Logo />
                <Text style={styles.text}>Register to create your tasks</Text>
            </View>
            <View style={styles.form}>
                <Input autoCapitalize='words' placeholder='Name' control={control} name='name' />
                <Input autoCapitalize='none' placeholder='Email' control={control} name='email' />
                <Input placeholder='Password' control={control} name='password' secureTextEntry />
                <View style={styles.buttonContainer}>
                    <Button
                        text='Register'
                        onPress={handleSubmit(submit)}
                        isLoading={isLoading}
                    />
                </View>
            </View>
            <View style={styles.singUp} >
                <Text style={styles.textSignUp}>Already have an account?</Text>
                <TouchableOpacity onPress={handleLogin}>
                    <Text style={styles.textLink}>Login here</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 48
    },
    text: {
        color: '#F2F2F2',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
    },
    textSignUp: {
        color: '#F2F2F2',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
    },
    textLink: {
        color: '#4EA8DE',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
    },
    form: {
        gap: 16,
        width: '90%',
        alignSelf: 'center',
        marginTop: -62
    },
    buttonContainer: {
        marginTop: 48,
        gap: 16,
        width: '100%',
        alignSelf: 'center',
    },
    singUp: {
        gap: 8,
        width: '90%',
        alignSelf: 'center',
        marginTop: -62
    }
});