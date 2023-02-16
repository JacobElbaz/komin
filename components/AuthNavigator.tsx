import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Layout from './Layout';
import { UserContext } from './UserContext'
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();
// Navigator, Screen, Group

function AuthNavigator() {
  const { userInfo, splashLoading } : any = React.useContext(UserContext);

  return (
    <Stack.Navigator>
      {splashLoading ? (
        <Stack.Screen
          name={'SplashScreen'}
          component={SplashScreen}
          options={{ headerShown: false }} />
      ) : (
        userInfo.accessToken ? (
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
        )
      )}

    </Stack.Navigator>
  );
}

export default AuthNavigator;