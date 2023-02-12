import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const Signup = () => {

    const [user, setUser] = React.useState('')
    const onChangeText = (e: any) => {
        setUser(e.target.value)
    }

    return (
        <View>
            <View>
                <Text style={styles.h1}>Signup</Text>
                <View>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={'Username'}
                    />
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={'Email'}
                    />
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={'Password'}
                    />
                </View>
                <Pressable style={styles.button}>
                    <Text>SIGNUP</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    h1: {
        fontSize: 30,
        color: 'black'
    },
    label: {
        fontSize: 15,
        color: 'grey'
    },
    input: {
        borderRadius: 15,
    },
    button: {
        backgroundColor: 'blue'
    }
})

export default Signup;