import React from "react";
import { StyleSheet, View, Text } from "react-native";

const BubbleMessage = ({ mine, text } : any) => {
    return (
        <View style={[styles.message, mine ? styles.mine : styles.not_mine]}>
            <View style={[styles.cloud, {backgroundColor: mine ? '#e32f45' : 'white'}]}>
                <Text style={{color: '#E7E7E7'}}>sender:</Text>
                <Text style={[ styles.text, { color: mine ? 'white' : 'black'} ]}> {text} </Text>
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
    }
})