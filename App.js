import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { UserProvider, useUser } from './context/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useState, useEffect, createContext, useContext} from 'react';
import { getData, removeData } from './utils/storage';

import LoginScreen from './login/LoginScreen';
import RegisterScreen from './login/RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeScreen } from './todoApp/HomeScreen';
import { LogoutButton } from './todoApp/LogoutButton';
import axios from "axios"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Logout" component={LogoutButton} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider >

  );
}
const MainScreen = ({navigation}) => {
  const {user, setUser} = useUser()
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      setUser(data)
    }
    fetchData();
  }, [])

  useEffect(() => {
    if (user === null) return null; 
    else if (user.token) {
      console.log(user.token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token

      navigation.navigate("Home")
    }
    else  {
      console.log("No token found. Navigating to Login screen")
      return navigation.navigate("Login")
    }
  }, [user, navigation])
}


const getUserData = async() => {
  const userDataJson = await AsyncStorage.getItem('userData')

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

