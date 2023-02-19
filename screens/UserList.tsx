import { SafeAreaView, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from 'react'
import Conversation from "../components/Conversation";
import ConversationHeader from "../components/ConversationHeader";
import { UserContext } from "../components/UserContext";
import { ApiResponse, create } from "apisauce";
import { IP } from "../ip";
import { useNavigation } from "@react-navigation/native";


const UserList = () => {
    type Nav = {
        addListener: (value: string, cb: Function) => void;
    }
    const navigation = useNavigation<Nav>();
    const { userInfo } = useContext(UserContext)
    const [users, setUsers] = useState()
    const getUsers = async () => {
        const apiClient = create({
            baseURL: `http://${IP}:3000`,
            headers: {
                Accept: 'application/vnd.github.v3+json',
                'Authorization': `JWT ${userInfo?.accessToken}`
            },
        })
        try {
            console.log('fetching users');
            const users: ApiResponse<any, any> = await apiClient.get('/user')
            setUsers(users.data)
        } catch (err) {
            console.log('fetch users failed ' + err);
        }
    }
    useEffect(() => {
        const unsuscribe = navigation.addListener('focus', async () => {
            await getUsers();
        })
        return unsuscribe
    })

    return (
        <SafeAreaView>
            <FlatList
                data={users}
                renderItem={({ item }) => <Conversation contact={item} />}
                keyExtractor={contact => contact._id} />
        </SafeAreaView>
    );
}

export default UserList;