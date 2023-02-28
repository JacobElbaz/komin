import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, FlatList, TextInput, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BubbleMessage from '../components/BubbleMessage';
import Client from "socket.io-client";
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../components/UserContext';
import { IP } from '../ip';

const ChatRoom = () => {
    const navigation = useNavigation();
    const [globalMessages, setGlobbalMessages] = useState([])
    const [text, onChangeText] = useState('')
    const { userInfo } = useContext(UserContext)

    const connectUser = async () => {
        userInfo.socket.on('chat:message', (args) => {
            setGlobbalMessages(args);
        })
        userInfo.socket.emit("chat:get_global_messages")
    }

    useEffect(() => {
        const unsuscribe = navigation.addListener('focus', async () => {
            connectUser()
        })
        return unsuscribe
    })
    useEffect(() => {
        userInfo.socket.on('chat:global_message', (args) => {
            const messages = [...globalMessages]
            messages.unshift(args)
            setGlobbalMessages(messages);
        })
    }, [globalMessages])
    const handleOnSend = async () => {
        userInfo.socket.emit('chat:send_global_message', { 'to': 'global', 'message': text })
        onChangeText('')
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={globalMessages.sort(function(a,b){
                    return new Date(b.sendAt) - new Date(a.sendAt);
                  })}
                style={styles.scroll}
                renderItem={({ item }) => <BubbleMessage mine={item.from == userInfo.id} text={item.message} senderId={item.from} />}
                inverted
            />
            <View style={styles.inputContainer}>
                <TextInput
                    multiline
                    placeholder='Type something...'
                    value={text}
                    onChangeText={onChangeText}
                    style={styles.input}></TextInput>
                <TouchableOpacity style={styles.iconContainer} onPress={handleOnSend}><Icon name={'send'} style={styles.icon} /></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        height: '100%'
    },
    scroll: {},
    inputContainer: {
        flexDirection: 'row',
        width: '100%',
        margin: 10,
    },
    input: {
        backgroundColor: 'white',
        width: '80%',
        paddingLeft: 10
    },
    iconContainer: {
        backgroundColor: '#e32f45',
        borderRadius: 50,
        padding: 10,
        margin: 5
    },
    icon: {
        color: 'white',
        fontSize: 20
    }
})

export default ChatRoom;