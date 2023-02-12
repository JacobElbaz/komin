import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import Chat from '../screens/Chat';
import ChatRoom from '../screens/ChatRoom';
import EditProfile from '../screens/EditProfile';
import Post from '../screens/Post';
import NavBar from './NavBar';


const Stack = createStackNavigator(); 

const Layout = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='NavBar' component={NavBar} options={{headerShown: false}}/>
            <Stack.Screen name='Edit Profile' component={EditProfile} />
            <Stack.Screen name='Chat' component={Chat} options={({ route }) => ({ title: route.params.name })} /> 
            <Stack.Screen name='Global Chat' component={ChatRoom} /> 
            <Stack.Screen name='Add a new post' component={Post} /> 
        </Stack.Navigator>
    )
}

export default Layout