import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/core';
import { useForm } from 'react-hook-form';
import { UserContext } from '../components/UserContext';

const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Signup = () => {
    const { control, handleSubmit, watch } = useForm();
    const pwd = watch('password');
    const [loading, setLoading] = useState(false);
    type Nav = {
        navigate: (value: string, params: any) => void;
    }
    const navigation = useNavigation<Nav>();
    const { register } = React.useContext(UserContext)

    const onRegisterPressed = async (data: any) => {
        if (loading) {
            return;
        }
        setLoading(true);
        const { password, email, name } = data;
        register(name, email, password);
        setLoading(false);
        Alert.alert('Successful', 'Thanks for your registration !')
        navigation.navigate('Login', null)
    };

    const onSignInPress = () => {
        navigation.navigate('Login', null);
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Create an account</Text>

                <CustomInput
                    name="name"
                    control={control}
                    placeholder="Name"
                    rules={{
                        required: 'Name is required',
                        minLength: {
                            value: 3,
                            message: 'Name should be at least 3 characters long',
                        },
                        maxLength: {
                            value: 24,
                            message: 'Name should be max 24 characters long',
                        },
                    }}
                />

                <CustomInput
                    name="email"
                    control={control}
                    placeholder="Email"
                    rules={{
                        required: 'Email is required',
                        pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
                    }}
                />
                <CustomInput
                    name="password"
                    control={control}
                    placeholder="Password"
                    secureTextEntry
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password should be at least 8 characters long',
                        },
                    }}
                />
                <CustomInput
                    name="password-repeat"
                    control={control}
                    placeholder="Repeat Password"
                    secureTextEntry
                    rules={{
                        validate: (value: any) => value === pwd || 'Password do not match',
                    }}
                />

                <CustomButton
                    text={loading ? 'Loading...' : "Register"}
                    onPress={handleSubmit(onRegisterPressed)}
                />

                <SocialSignInButtons />

                <CustomButton
                    text="Have an account? Sign in"
                    onPress={onSignInPress}
                    type="TERTIARY"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    },
});

export default Signup;