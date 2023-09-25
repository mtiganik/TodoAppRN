import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, StyleSheet, Button, ScrollView } from "react-native"
import { commonStyles, loginScreenStyles } from "../utils/styles";
import { LinearGradient } from 'expo-linear-gradient';
import { isStrongPassword } from '../utils/passwordValidation';

const RegisterScreen = ({ navigation }) => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    validateForm();
  }, [firstname, lastname, email, password])

  const validateForm = () => {
    let errors = {}
    if (!firstname){
      errors.firstname = "Firstname is required"
    }

    if(!email){
      errors.email = 'Email is required.'
    }else if(!/\S+@\S+\.\S+/.test(email)){
      errors.email = 'Email is invalid'
    }

    if(!password){
      errors.password = 'password is required'
    }else if(!isStrongPassword(password)){
      errors.password = 'password must contain atleast 6 letters, one uppercase, one lowercase letter, a digit and an special character'
    }

    setErrors(errors)
    setIsFormValid(Object.keys(errors).length === 0)
  }

  const handleSubmit = () => {
    if(isFormValid){
      console.log("Form submitted succesfully!")
    }else{
      console.log("Form has errors. Please correct them.")
    }
  }
  return (
    <LinearGradient style={{ flex: 1 }} colors={['#833ab4', '#fd1d1d', '#fcb045']} >
      <View style={styles.loginScreenBase}>
        <View style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        >
          <Text style={{
            fontFamily: "sans-serif-condensed",
            fontSize: 30
          }}>Register account </Text>
        </View>
        <View style={{
          flex: 4,
          alignItems: "center",
        }}>
          <TextInput style={styles.registesInput}
            underlineColorAndroid="transparent"
            placeholder="First name"
            autoCapitalize="none"
          />
          <TextInput style={styles.registesInput}
            underlineColorAndroid="transparent"
            placeholder="Last name"
            autoCapitalize="none"
          />
          <TextInput style={styles.registesInput}
            underlineColorAndroid="transparent"
            placeholder="Email"
            autoCapitalize="none"
          />
          <TextInput style={styles.registesInput}
            underlineColorAndroid="transparent"
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <Button title="Register" />
          {Object.values(errors).map((error, index) => (
            <Text key={index} style={commonStyles.errorText}>
              {error}
            </Text>
          ))}
          <Text>
            Already have an account?{" "}
            <Text style={{ color: 'blue' }}
              onPress={() => navigation.navigate("Login")}>
              Log in
            </Text>
          </Text>
        </View>
      </View>
    </LinearGradient>
  )
}



export default RegisterScreen
const styles = StyleSheet.create({
  registesInput: {
    height: 40,
    width: 150,
    margin: 15,
    borderWidth: 1,
    padding: 10,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  loginScreenBase:{
    flex: 1,
    height: 200,
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 30,
    borderWidth: 10,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.3)'
  },

}
)