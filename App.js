import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { UserProvider, useUser } from './context/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useState, useEffect, createContext, useContext} from 'react';
import { getData, removeData } from './utils/storage';

import LoginScreen from './login/LoginScreen';
import RegisterScreen from './login/RegisterScreen';
import RegisterTest from './login/RegisterTest';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

// const UserContext = createContext();
      // <UserProvider>
      // </UserProvider>
      // const [user, setUser] = useState("Jesse Hall")
export default function App() {
  return (
    <UserProvider >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider >

  );
}
const MainScreen = ({navigation}) => {
  console.log("In mainScreen")
  const {user, setUser} = useUser()
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      setUser(data)
    }
    fetchData();
  }, [])

  useEffect(() => {
    if (user === null) return null; // App loading
    else if (user.token) navigation.navigate("Home")
    else return navigation.navigate("Login")
  }, [user, navigation])
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

const emptyUser = {
  token: '',
  refreshToken: '',
  email: '',
  firstName: '',
  lastName: ''

}


const HomeScreen = ({navigation}) => {

  const {user, setUser} = useUser()

  const onPressLogout = async () => {
    await AsyncStorage.removeItem('userData')
    setUser(emptyUser)
    navigation.navigate('Login')
  }
  return (
    <View>
      <Text>Home screen123 {user.firstName}</Text>
      <Text>Hello {user.firstName} {user.lastName}</Text>

      <Button title="Logout" onPress={onPressLogout}/>
    </View>
  )
}
