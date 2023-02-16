import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { UserContext } from '../components/UserContext';
import React from 'react';

const EditProfile = () => {
    const {logout} = React.useContext(UserContext)
    
    return (
        <View style={styles.container}>
            <Text>Edit Screen</Text>
            <TouchableOpacity style={styles.button} onPress={logout}><Text style={styles.text}>Logout</Text></TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    button: {
        height: 50,
        width: '80%',
        backgroundColor: 'red',
        borderRadius: 10,
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})

export default EditProfile;