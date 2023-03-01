import React, { useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    useWindowDimensions,
    ScrollView,
} from 'react-native';
import Logo from '../assets/Komin.png'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import GoogleSignInButton from '../components/GoogleSignInButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { UserContext } from '../components/UserContext';
// web: 970652473586-6mkn7te3pjs27sedeqmq4vsi82j3h1cd.apps.googleusercontent.com
// android: 970652473586-m4jub460l4snsnad0ekga0pq5uupv57a.apps.googleusercontent.com
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
    const { login }: any = React.useContext(UserContext)

    const onSignInPressed = async (data: any) => {
        if (loading) {
            return;
        }

        setLoading(true);
        await login(data.email, data.password);
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
                    name="email"
                    placeholder="Email"
                    control={control}
                    rules={{ required: 'User email is required' }}
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

                <GoogleSignInButton />

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