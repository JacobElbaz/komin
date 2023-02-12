import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import pic from '../assets/icon.png'

const Conversation = ({ contact }: any) => {
    
    type Nav = {
        navigate: (value: string, params: any) => void;
    }

    const navigation = useNavigation<Nav>(); 
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Chat', contact)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={contact.picture} style={styles.image}></Image>
                <Text style={styles.text}>{contact.name}</Text>
            </View>
            <Icon name={'chevron-right'} style={styles.icon}></Icon>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopColor: '#E7E7E7',
        borderTopWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 75,
        padding: 10
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    icon: {
        fontSize: 20
    }
})

export default Conversation;