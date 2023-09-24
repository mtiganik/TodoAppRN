import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './login/LoginScreen';
const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <View>
      <Text>Home screen123</Text>
    </View>
  )
}

export default function App() {
  // storeData("Hello from localStorage")
  // const valueFromLocalStorage = getData()
  // console.log(valueFromLocalStorage)
  // console.log("Hello again123")
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

