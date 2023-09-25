import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, StyleSheet, Button, ScrollView } from "react-native"
import { commonStyles, loginScreenStyles } from "../utils/styles";
import { LinearGradient } from 'expo-linear-gradient';
import { isStrongPassword } from '../utils/passwordValidation';
import { SvgXml } from 'react-native-svg';
import {ShowPassword, HidePassword} from "../utils/SvgImages"


const inputInitials = {
  firstname: "",
  lastname: "",
  email: "",
  password:"",
  isFormValid: false
}
const inputErrorsInitial = {
  firstNameError: "",
  lastNameError: "",
  emailError: "",
  passwordError: ""
}

const RegisterScreen = ({ navigation }) => {
  const [input, setInput] = useState(inputInitials)
  const [inputErrors, setInputErrors] = useState(inputErrorsInitial)
  const [isFormValid, setIsFormValid] = useState(false)

  const handlePress = () => {
    validateForm();
    if(isFormValid){
      console.log("Form submitted succesfully!")
    }else{
      console.log("Form has errors. Please correct them.")
    }
  }
  const validateForm = () => {

    let errors = {}
    if (!input.firstname){
      errors.firstNameError = "First name is required"
      console.log("First name required")
    }
    if (!input.lastname){
      errors.lastNameError = "Last name is required"
      console.log("Last name required")
    }
    
    if(!input.email){
      errors.emailError = 'Email is required.'
      console.log("email required")

    }else if(!/\S+@\S+\.\S+/.test(input.email)){
      errors.emailError = 'Email is invalid'
      console.log("invalid email")

    }

    if(!input.password){
      errors.passwordError = 'password is required'
      console.log("password required email")

    }else if(!isStrongPassword(input.password)){
      errors.passwordError = 'password must contain atleast 6 letters, one uppercase, one lowercase letter, a digit and an special character'
      console.log("invalid password")

    }

    setInputErrors(errors)
    setIsFormValid(Object.keys(errors).length === 0)
  }

  return (
    <LinearGradient style={{ flex: 1 }} colors={['#833ab4', '#fd1d1d', '#fcb045']} >
      <ScrollView contentContainerStyle={styles.loginScreenBase}>
        <View style={{
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        >
          <SvgXml xml={HidePassword} width="10%" height="10%" />
          <SvgXml xml={ShowPassword} width="10%" height="10%" />
          <Text style={{
            fontFamily: "sans-serif-condensed",
            fontSize: 30
          }}>Register account</Text>
        </View>
        <View style={{
          alignItems: "center",
        }}>
          <TextInput style={styles.registesInput}
            underlineColorAndroid="transparent"
            placeholder="First name"
            autoCapitalize="none"
            value={input.firstname}
            onChangeText={(val) => {
              setInput({...input, firstname: val})}}
          />
          <Text style={commonStyles.errorText}>{inputErrors.firstNameError}</Text>
          <TextInput style={styles.registesInput}
            underlineColorAndroid="transparent"
            placeholder="Last name"
            autoCapitalize="none"
            value={input.lastname}
            onChangeText={(val) => {setInput({...input, lastname: val})}}
          />
          <Text style={commonStyles.errorText}>{inputErrors.lastNameError}</Text>

          <TextInput style={styles.registesInput}
            underlineColorAndroid="transparent"
            placeholder="Email"
            autoCapitalize="none"
            value={input.email}
            onChangeText={(val) => {setInput({...input, email:val})}}
          />
          <Text style={commonStyles.errorText} >{inputErrors.emailError}</Text>
          <TextInput style={styles.registesInput}
            underlineColorAndroid="transparent"
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            value={input.password}
            onChangeText={(val) => {setInput({...input, password:val})}}
          />
          <Text style={commonStyles.errorText} >{inputErrors.passwordError}</Text>

          <Button title="Register" onPress={handlePress} />
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
const styles = StyleSheet.create({
  loginScreenBase:{
    height: 500,
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 30,
    borderWidth: 10,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.3)'
  },
  registesInput: {
    height: 40,
    width: 150,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: '#7a42f4',
    borderWidth: 1
  },

}
)