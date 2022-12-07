import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './src/Navigation/Stack';

export default function App() {
  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  );
}

