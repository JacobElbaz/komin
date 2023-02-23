import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import Chat from '../screens/Chat';
import ChatRoom from '../screens/ChatRoom';
import EditProfile from '../screens/EditProfile';
import Post from '../screens/AddPost';
import NavBar from './NavBar';
import UserList from '../screens/UserList';
import EditPost from '../screens/EditPost';


const Stack = createStackNavigator(); 

const Layout = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='NavBar' component={NavBar} options={{headerShown: false}}/>
            <Stack.Screen name='Edit Profile' component={EditProfile} options={{headerStyle: {backgroundColor: '#e32f45'}, headerTitleStyle: {color: 'white'}}}/>
            <Stack.Screen name='Edit Post' component={EditPost} options={{headerStyle: {backgroundColor: '#e32f45'}, headerTitleStyle: {color: 'white'}}}/>
            <Stack.Screen name='Chat' component={Chat} options={{headerShown: false}} /> 
            <Stack.Screen name='Global Chat' component={ChatRoom} options={{headerStyle: {backgroundColor: '#e32f45'}, headerTitleStyle: {color: 'white'}}}/> 
            <Stack.Screen name='Add a new post' component={Post} options={{headerStyle: {backgroundColor: '#e32f45'}, headerTitleStyle: {color: 'white'}}}/> 
            <Stack.Screen name='Contacts' component={UserList} options={{headerStyle: {backgroundColor: '#e32f45'}, headerTitleStyle: {color: 'white'}}}/> 
        </Stack.Navigator>
    )
}

export default Layout