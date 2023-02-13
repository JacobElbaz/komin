import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Layout from './Layout';
import { UserContext } from './UserContext'

const Stack = createStackNavigator();
// Navigator, Screen, Group

function AuthNavigator() {
  const {userInfo} = React.useContext(UserContext);
  console.log(userInfo);


  return (
    <Stack.Navigator>
      {userInfo.accessToken ? (
        <Stack.Screen
          name={'Layout'}
          component={Layout}
          options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen
            name={'Login'}
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={'Signup'}
            component={Signup}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default AuthNavigator;