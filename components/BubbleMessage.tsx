import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { IP } from "../ip";
import { UserContext } from "./UserContext";

const BubbleMessage = ({ mine, text, senderId }: any) => {
    const { userInfo } = useContext(UserContext)
    const [sender, setSend] = useState('')
    const findSender = async () => {
        const sender = await axios.get(`http://${IP}:3000/user/${senderId}`, { headers: { 'Authorization': `JWT ${userInfo?.accessToken}` } })
        setSend(sender.data)
    }
    useEffect(() => {
        findSender()
    }, [])
    return (
        <View style={[styles.message, mine ? styles.mine : styles.not_mine]}>
            {!mine && (<Image source={{ uri: sender.picture }} style={styles.profilePic}/>)}
            <View style={[styles.cloud, { backgroundColor: mine ? '#e32f45' : 'white' }]}>
                <Text style={{ color: mine ? '#E7E7E7' : 'grey' }}>{mine ? 'Me:' : sender.name}</Text>
                <Text style={[styles.text, { color: mine ? 'white' : 'black' }]}> {text} </Text>
            </View>
        </View>
    );
}

export default BubbleMessage;

const styles = StyleSheet.create({
    message: {
        flexDirection: "row",
        marginVertical: 7
    },
    not_mine: {
        marginLeft: 20,
    },
    mine: {
        alignSelf: 'flex-end',
        marginRight: 20
    },
    cloud: {
        maxWidth: 250,
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 7,
        borderRadius: 10
    },
    text: {
        paddingTop: 3,
        fontSize: 17,
        lineHeight: 22
    },
    profilePic: {
        width: 30,
        height: 30,
        borderRadius: 100,
        marginRight: 10 
    }
})