import { SafeAreaView, FlatList, StatusBar } from "react-native";
import React from 'react'
import Conversation from "../components/Conversation";
import ConversationHeader from "../components/ConversationHeader";


const Conversations = () => {
    const DATA = [
        {
            id: '52413543274',
            name: 'Amith Elbaz'
        },
        {
            id: '35213131',
            name: 'Elie Bracha'
        },
        {
            id: '121354354',
            name: 'Samuel Levy'
        },
        {
            id: '3213435435',
            name: 'Dylan Cohen'
        },
        {
            id: '4845454545',
            name: 'Josh Benichou'
        },
        {
            id: '212185151',
            name: 'Aviv Bikhar'
        },
        {
            id: '03525435451',
            name: 'Dan Sitbon'
        }
    ]
    return (
        <SafeAreaView>
            <StatusBar 
            backgroundColor={'#e32f45'}
            />
            <ConversationHeader />
            <FlatList 
            data={DATA}
            renderItem={({item}) => <Conversation contact={item} />}
            keyExtractor={contact => contact.id}/>
        </SafeAreaView>
    );
}

export default Conversations;