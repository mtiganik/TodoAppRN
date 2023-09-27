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

const Stack = createNativeStackNavigator();

{/* <Stack.Screen name="Home" component={HomeScreen} initialParams={ user.token } /> */}

    // <UserProvider>
    //   </UserProvider>
export default function App() {

  return (
    <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
const MainScreen = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    getData('token').then((value) => {
      if (value !== null) {
        setToken(value);
      }else {
        setToken('')
      } 
    })
  }, []);

 return token ? <HomeScreen token= {token} setToken = {setToken} /> : <AuthScreens/>
}

    //     <UserProvider>
    // </UserProvider>

// const MainScreen = () => {
  //const {user, setUser} = useUser();
  
  // console.log(user)

  // if(user === undefined){
  //   return <AuthScreens/>;
  // }
  // // get token value
  // useEffect(() => {
  //   getData('token').then((value) => {
  //     if (value !== null) {
  //       setUser((prevUser) => ({...prevUser, token: value}));
  //     }else {
  //       setUser((prevUser) => ({...prevUser, token: ''}))
  //     } 
  //   })
  // }, []);

  // return user.token ? <HomeScreen /> : <AuthScreens/>
//   return <AuthScreens/>
// }

const AuthScreens = () => {
  return (
    <>
    <Stack.Screen name="RegisterTest" component={RegisterTest} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
  </>
)
}

const HomeScreen = ({navigation,token, setToken}) => {
  // const {user, setUser} = useUser();

  const onPressLogout = () => {
    removeData('token').then(() => {
      setToken('')
    })
    navigation.navigate('Login')
  }
  return (
    <View>
      <Text>Home screen</Text>
      {token && <Text>Token: {token}</Text>}
      <Button title="Logout" onPress={onPressLogout}/>
    </View>
  )
}
