import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <View>
      <Text>Home screen</Text>
    </View>
  )
}

const LoginScreen = () => {
  return(
    <View>
      <Text>Login screen</Text>
    </View>
  )
}

const storeData = async(value) => {
  try{
    await AsyncStorage.setItem('my-key', value);
  }catch(e){
    console.log(e)
  }
}

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('my-key');
    if (value !== null) {
      console.log(value)
      return value
    }
  } catch (e) {
    console.log(e)
  }
};


export default function App() {
  // storeData("Hello from localStorage")
  const valueFromLocalStorage = getData()
  console.log(valueFromLocalStorage)
  console.log("Hello again123")
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
