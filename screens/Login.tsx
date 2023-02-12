import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    type Nav = {
        navigate: (value: string) => void;
    }

    const navigation = useNavigation<Nav>();

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.container}>
                <View style={styles.wFull}>
                    <View style={styles.row}>
                        <Text style={styles.brandName}>Komin</Text>
                    </View>

                    <Text style={styles.loginContinueTxt}>Login in to continue</Text>
                    <TextInput style={styles.input} placeholder="Email" />
                    <TextInput style={styles.input} placeholder="Password" />

                    <View style={styles.loginBtnWrapper}>
                        {/******************** LOGIN BUTTON *********************/}
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Layout')}
                            activeOpacity={0.7}
                            style={styles.loginBtn}>
                            <Text style={styles.loginText}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}> Don't have an account? </Text>
                    {/******************** REGISTER BUTTON *********************/}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.signupBtn}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    container: {
        padding: 15,
        width: '100%',
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    brandName: {
        fontSize: 42,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'blue',
        opacity: 0.9,
    },
    loginContinueTxt: {
        fontSize: 21,
        textAlign: 'center',
        color: 'gray',
        marginBottom: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        height: 55,
        paddingVertical: 0,
    },
    // Login Btn Styles
    loginBtnWrapper: {
        height: 55,
        marginTop: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    linearGradient: {
        width: '100%',
        borderRadius: 50,
    },
    loginBtn: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 55,
        backgroundColor: 'blue'
    },
    loginText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400',
    },
    forgotPassText: {
        color: 'blue',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 15,
    },
    // footer
    footer: {
        position: 'absolute',
        bottom: 20,
        textAlign: 'center',
        flexDirection: 'row',
    },
    footerText: {
        color: 'gray',
        fontWeight: 'bold',
    },
    signupBtn: {
        color: 'blue',
        fontWeight: 'bold',
    },
    // utils
    wFull: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    mr7: {
        marginRight: 7,
    },
});