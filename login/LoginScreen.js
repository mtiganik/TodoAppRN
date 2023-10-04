import { View, Text, TextInput, ScrollView, StyleSheet, Button } from "react-native"
import { commonStyles, loginScreenStyles } from "../utils/styles";
import { LinearGradient } from 'expo-linear-gradient';
import {ShowPassword, HidePassword} from "../utils/SvgImages"
import { useState } from "react";
import { SvgXml } from "react-native-svg";
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useUser } from "../context/UserContext";
import { storeData } from "../utils/storage";


const url = "https://taltech.akaver.com/api/v1/Account/Login"


const LoginScreen = ({navigation}) => {
const [email, setEmail] = useState("")
const [emailError, setEmailError] = useState("")
const [password, setPassword] = useState("")
const [serverResponse, setServerResponse] = useState("")
const [showPassword, setShowPassword] = useState(false)
const {user,setUser} = useUser()
const handlePress = async() => {
  if(!/\S+@\S+\.\S+/.test(email)){
    setEmailError('Email is invalid')
  }else{
    console.log("Start of handlePress")
    console.log(email) // gives email
    console.log(password) // gives password

    try{
      axios.defaults.headers.common['Authorization'] = null

      const response = await axios.post(url,{
        email: email,
        password: password
      })
      const responseData = response.data;
      console.log("Set Storage")
      console.log(JSON.stringify(responseData))

      await AsyncStorage.setItem('userData', JSON.stringify(responseData))

      console.log("Set user")
      setUser((prevUser) => ({
        ...prevUser,
        token: responseData.token,
        refreshToken: responseData.refreshToken,
        firstName: responseData.firstName,
        lastName: responseData.lastName,
        email: email
      }));
      console.log("Navigate to home")
      navigation.navigate('Main');

    }catch(error){
      console.error('AsyncStorage Error:', error);
      console.error('Axios Error:', error.message);
      if(error.response && error.response.data && error.response.data.messages)
      setServerResponse(error.response.data.messages)
    else{
      setServerResponse(' An error occured while loggin in.')
    }
    }
  }
}

  return (
    <LinearGradient style={{ flex: 1 }} colors={['#833ab4', '#fd1d1d', '#fcb045']} >
      <ScrollView contentContainerStyle={loginScreenStyles.loginScreenBase}>
        <View style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        >
          <Text style={{
            fontFamily: "sans-serif-condensed",
            fontSize: 30
          }}>Login </Text>
        </View>
        <View style={{
          flex: 2,
          alignItems: "center",
        }}>
          <TextInput style={loginScreenStyles.input}
            underlineColorAndroid="transparent"
            placeholder="Email"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={commonStyles.errorText}>{emailError}</Text>

<View style={loginScreenStyles.passwordInputContainer}>
          <TextInput style={{flex: 1}}
            underlineColorAndroid="transparent"
            placeholder="Password"
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <SvgXml 
            xml={showPassword ? HidePassword : ShowPassword}
            width={24}
            height={24}
            onPress={() => setShowPassword(!showPassword)}
          />
          </View>
          <Button title="Login" onPress={handlePress} />
          <Text style={commonStyles.errorText}>{serverResponse}</Text>

          <Text>
            Don't have an account?{" "}
            <Text style={{ color: 'blue' }}
              onPress={() => navigation.navigate("Register")}>
              Register account

            </Text>
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>


  )
}
export default LoginScreen;

