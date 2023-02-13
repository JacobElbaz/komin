import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './components/AuthNavigator';
import React from 'react'
import { Context } from './components/UserContext';

export default function App() {
  return (
    <Context>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </Context>
  );
}