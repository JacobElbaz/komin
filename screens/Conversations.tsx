import { SafeAreaView, FlatList } from "react-native";
import Conversation from "../components/Conversation";
import pic from '../assets/icon.png'


const Conversations = () => {
    const DATA = [
        {
            id: '52413543274',
            name: 'Amith Elbaz',
            picture: pic
        },
        {
            id: '35213131',
            name: 'Elie Bracha',
            picture: pic
        },
        {
            id: '121354354',
            name: 'Samuel Levy',
            picture: pic
        },
        {
            id: '3213435435',
            name: 'Dylan Cohen',
            picture: pic
        },
        {
            id: '4845454545',
            name: 'Josh Benichou',
            picture: pic
        },
        {
            id: '212185151',
            name: 'Aviv Bikhar',
            picture: pic
        },
        {
            id: '03525435451',
            name: 'Dan Sitbon',
            picture: pic
        }
    ]

    return (
        <SafeAreaView>
            <FlatList 
            data={DATA}
            renderItem={({item}) => <Conversation contact={item} />}
            keyExtractor={contact => contact.id}/>
        </SafeAreaView>
    );
}

export default Conversations;