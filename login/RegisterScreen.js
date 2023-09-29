import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, StyleSheet, Button, ScrollView } from "react-native"
import { commonStyles, loginScreenStyles } from "../utils/styles";
import { LinearGradient } from 'expo-linear-gradient';
import { isStrongPassword } from '../utils/passwordValidation';
import { SvgXml } from 'react-native-svg';
import {ShowPassword, HidePassword} from "../utils/SvgImages"
import axios from "axios"
import { getData, removeData } from '../utils/storage';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useUser } from '../context/UserContext';


const inputInitials = {
  firstName: "",
  lastName: "",
  email: "",
  password:"",
  confirmPassword: ""
}

const inputErrorsInitial = {
  firstNameError: "",
  lastNameError: "",
  emailError: "",
  passwordError: "",
  confirmPasswordError: "",
  serverError: ""
}
const url = "https://taltech.akaver.com/api/v1/Account/Register"

const RegisterScreen = ({ navigation }) => {
  const [input, setInput] = useState(inputInitials)
  const [inputErrors, setInputErrors] = useState(inputErrorsInitial)
  const [isFormValid, setIsFormValid] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const {user, setUser} = useUser()
  const handlePress =async () => {
    validateForm();
    if(isFormValid){
      try{
        const response = await axios.post(url, {
          email: input.email,
          password: input.password,
          firstName: input.firstName,
          lastName: input.lastName
        });
        if(response && response.data){
          const responseData = response.data;

          setUser({
            ...user,
            token: responseData.token,
            refreshToken: responseData.refreshToken,
            firstName: responseData.firstName,
            lastName: responseData.lastName,
            email: input.email
          })

          navigation.navigate('Home');

        }else{
          console.error("Invalid response:", response)
        }

      }catch (error){
        console.log("Error occured")
        const msg = error.response.data.messages
        setInputErrors({...inputErrors, serverError: msg})
      }
  
    }else{
      console.log("Form has errors. Please correct them.")
    }
  }
  const validateForm = () => {
    let errors = {}
    if (!input.firstName){
      errors.firstNameError = "First name is required"
    }
    if (!input.lastName){
      errors.lastNameError = "Last name is required"
    }
    
    if(!input.email){
      errors.emailError = 'Email is required.'

    }else if(!/\S+@\S+\.\S+/.test(input.email)){
      errors.emailError = 'Email is invalid'
    }

    if(!input.password){
      errors.passwordError = 'password is required'
    }else if(!isStrongPassword(input.password)){
      errors.passwordError = 'password must contain atleast 6 letters, one uppercase, one lowercase letter, a digit and an special character'
    }

    if(input.confirmPassword.localeCompare( input.password) != 0){
      errors.confirmPasswordError = 'confirm password do not match actual password'
    }
    setInputErrors(errors)
    setIsFormValid(Object.keys(errors).length === 0)
  }

  return (
    <LinearGradient style={{ flex: 1 }} colors={['#833ab4', '#fd1d1d', '#fcb045']} >
      <ScrollView contentContainerStyle={loginScreenStyles.loginScreenBase}>
        <View style={{
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        >
          <Text style={{
            fontFamily: "sans-serif-condensed",
            fontSize: 30
          }}>Register account</Text>
        </View>
        <View style={{
          alignItems: "center",
        }}>

          <TextInput style={loginScreenStyles.input}
            underlineColorAndroid="transparent"
            placeholder="First name"
            autoCapitalize="none"
            value={input.firstName}
            onChangeText={(val) => {
              setInput({...input, firstName: val})}}
          />
          <Text style={commonStyles.errorText}>{inputErrors.firstNameError}</Text>
          <TextInput style={loginScreenStyles.input}
            underlineColorAndroid="transparent"
            placeholder="Last name"
            autoCapitalize="none"
            value={input.lastName}
            onChangeText={(val) => {setInput({...input, lastName: val})}}
          />
          <Text style={commonStyles.errorText}>{inputErrors.lastNameError}</Text>

          <TextInput style={loginScreenStyles.input}
            underlineColorAndroid="transparent"
            placeholder="Email"
            autoCapitalize="none"
            value={input.email}
            onChangeText={(val) => { setInput({ ...input, email: val }) }}
          />
          <Text style={commonStyles.errorText} >{inputErrors.emailError}</Text>
          
          <View style={loginScreenStyles.passwordInputContainer}>
            <TextInput style={{ flex: 1 }}
              underlineColorAndroid="transparent"
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              value={input.password}
              onChangeText={(val) => { setInput({ ...input, password: val }) }}
            />
            <SvgXml
              xml={showPassword ? HidePassword : ShowPassword}
              width={24}
              height={24}
              onPress={() => setShowPassword(!showPassword)} />
          </View>
          <Text style={commonStyles.errorText} >{inputErrors.passwordError}</Text>

          <View style={loginScreenStyles.passwordInputContainer}>
            <TextInput style={{ flex: 1 }}
              underlineColorAndroid="transparent"
              placeholder="Confirm password"
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              value={input.confirmPassword}
              onChangeText={(val) => { setInput({ ...input, confirmPassword: val }) }}
            />
            <SvgXml
              xml={showPassword ? HidePassword : ShowPassword}
              width={24}
              height={24}
              onPress={() => setShowPassword(!showPassword)} />
          </View>
          <Text style={commonStyles.errorText} >{inputErrors.confirmPasswordError}</Text>


          <Button title="Register" onPress={handlePress} />
          <Text style={commonStyles.errorText}>{inputErrors.serverError}</Text>

          <Text>
            Already have an account?{" "}
            <Text style={{ color: 'blue' }}
              onPress={() => navigation.navigate("Login")}>
              Log in
            </Text>
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default RegisterScreen
