import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome'

const ConversationHeader = () => {
    type Nav = {
        navigate: (value: string) => void;
    }
    const navigation = useNavigation<Nav>();

    return (
        <View style={styles.container}>
            <Text style={styles.username}>Chat</Text>
            <TouchableOpacity onPress={() => {navigation.navigate('Contacts')}}><Icon style={styles.icon} name={'address-book-o'} /></TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
		padding: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#e32f45'
    },
    username: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white'
    },
    icon:{
        fontSize: 22,
        color: 'white'
    }
});

export default ConversationHeader;