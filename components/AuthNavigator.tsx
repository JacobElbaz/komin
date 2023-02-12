import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Layout from './Layout';

const Stack = createStackNavigator();
// Navigator, Screen, Group

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={'Login'}>
      <Stack.Screen
        name={'Login'}
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name={'Signup'} component={Signup} />
      <Stack.Screen name={'Layout'} component={Layout} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

export default AuthNavigator;