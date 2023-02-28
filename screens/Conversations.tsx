import { SafeAreaView, FlatList, StatusBar } from "react-native";
import React from 'react'
import Conversation from "../components/Conversation";
import ConversationHeader from "../components/ConversationHeader";


const Conversations = () => {
    const [chats, setChats] = React.useState([])
    
    return (
        <SafeAreaView>
            <StatusBar 
            backgroundColor={'#e32f45'}
            />
            <ConversationHeader />
            <FlatList 
            data={chats}
            renderItem={({item}) => <Conversation contact={item} />}
            keyExtractor={contact => contact?.id}/>
        </SafeAreaView>
    );
}

export default Conversations;