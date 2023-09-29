import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { UserProvider, useUser } from './context/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import { getData, removeData } from './utils/storage';

import LoginScreen from './login/LoginScreen';
import RegisterScreen from './login/RegisterScreen';
import RegisterTest from './login/RegisterTest';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

      // <UserProvider>
      // </UserProvider>
export default function App() {

  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />

        </Stack.Navigator>
      </NavigationContainer>

  );
}
const MainScreen = () => {

  const userData = getUserData();
  if (userData === null) return <LoginScreen/>
  else return <HomeScreen/>
}


const getUserData = async() => {
  const userDataJson = await AsyncStorage.getItem('userData')
  // Here it shows data
  console.log(userDataJson)
  if (userDataJson) {
    const userData = JSON.parse(userDataJson)
    return {
      token: userData.token,
      refreshToken: userData.refreshToken,
      firstName: userData.firstName,
      lastName: userData.lastName
    }
  }
  return {}
}

const HomeScreen = ({navigation}) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      setUserData(data)
    }
    fetchData();
  }, [])

  const onPressLogout = async () => {
    await AsyncStorage.removeItem('userData')
    navigation.navigate('Login')
  }
  console.log(userData.firstName)
  return (
    <View>
      <Text>Home screen</Text>
      <Text>Hello {userData.firstName} {userData.lastName}</Text>
      {/* {userData.token && <Text>Token: {userData.token}</Text>} */}
      <Button title="Logout" onPress={onPressLogout}/>
    </View>
  )
}
