import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    useWindowDimensions,
    ScrollView,
    TextInput,
    Alert,
} from 'react-native';
import Logo from '../assets/icon.png'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

type Inputs = {
    example: string,
    exampleRequired: string,
};

const Login = () => {
    const { height } = useWindowDimensions();
    const [loading, setLoading] = useState(false);
    type Nav = {
        navigate: (value: string) => void;
    }
    const navigation = useNavigation<Nav>();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSignInPressed = async (data: any) => {
        if (loading) {
            return;
        }

        setLoading(true);
        try {
            const response = await axios({
                method: 'post',
                url: 'http://192.168.1.15:3000/auth/login',
                data: {
                    'email': data.username,
                    'password': data.password
                }
            });
            console.log(response);
        } catch (e: any) {
            Alert.alert('Oops', e.message);
        }
        setLoading(false);
        navigation.navigate('Layout')
    };

    const onSignUpPress = () => {
        navigation.navigate('Signup');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image
                    source={Logo}
                    style={[styles.logo, { height: height * 0.3 }]}
                    resizeMode="contain"
                />

                <CustomInput
                    name="username"
                    placeholder="Username"
                    control={control}
                    rules={{ required: 'Username is required' }}
                />

                <CustomInput
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                    control={control}
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 3,
                            message: 'Password should be minimum 3 characters long',
                        },
                    }}
                />

                <CustomButton
                    text={loading ? 'Loading...' : 'Sign In'}
                    onPress={handleSubmit(onSignInPressed)}
                />

                <SocialSignInButtons />

                <CustomButton
                    text="Don't have an account? Create one"
                    onPress={onSignUpPress}
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
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
});

export default Login;