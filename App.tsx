import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './components/AuthNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}