import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import Toast from 'react-native-toast-message';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import Logo from '../../components/Logo';
import { api } from '../../services/api';
import { useUserContext } from '../../context/useUserContext'
import { login } from '../../services/user'

interface SchemaProps { email: string, password: string }

const schema = yup
    .object({
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    })
    .required()

export function Login({ navigation }) {
    const { loginUser, isLoading } = useUserContext()
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    })

    function handleRegister() {
        navigation.navigate('register')
    }

    async function submit(data: SchemaProps) {
        await loginUser(data)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Logo />
                <Text style={styles.text}>Login to create your tasks</Text>
            </View>
            <View style={styles.form}>
                <Input autoCapitalize='none' placeholder='Email' control={control} name='email' />
                <Input placeholder='Password' control={control} name='password' secureTextEntry />
                <View style={styles.buttonContainer}>
                    <Button text='Login' onPress={handleSubmit(submit)} isLoading={isLoading} />
                </View>
            </View>
            <View style={styles.singUp} >
                <Text style={styles.textSignUp}>Don't have an account?</Text>
                <TouchableOpacity onPress={handleRegister}>
                    <Text style={styles.textLink}>Sing up here</Text>
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