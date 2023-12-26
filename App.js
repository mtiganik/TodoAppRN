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
import { Logout, LogoutButton } from './todoApp/LogoutButton';
import { ListCategory } from './todoApp/todoCategories/ListCategory';
import { CreateTaskWrapper } from './todoApp/todoTasks/createTask/createTask';
import { EditTaskWrapper } from './todoApp/todoTasks/editTask/editTask';
import axios from "axios"
import { DataProvider } from './context/DataContext';
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <UserProvider >
      <NavigationContainer >
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Login" component={LoginScreen} options={{headerBackVisible: false}}/>
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} options={{headerBackVisible: false}}/>
          <Stack.Screen name="Logout" component={LogoutButton} />
          <Stack.Screen name="Categories" component={ListCategory} />
          <Stack.Screen name="CreateTask" component ={CreateTaskWrapper} />
          <Stack.Screen name="EditTask" component ={EditTaskWrapper} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider >

  );
}
const MainScreen = ({navigation}) => {


  const {user, setUser} = useUser()
  useEffect(() => {
    const fetchData = async () => {
      // getUserData from Storage
      const data = await getUserData();
      setUser(data)
    }
    fetchData();
  }, [])

  useEffect(() => {
    if (user === null) return null; 
    else if (user.token) {

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token

      navigation.navigate("Home")
    }
    else  {
      axios.defaults.headers.common['Authorization'] = null

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

