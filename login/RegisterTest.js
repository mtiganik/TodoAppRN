import { View, Button, Text } from "react-native"
import { useEffect, useState } from "react"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

input2= {
    "email": "aaa@bbbbb.ee",
    "password": "q1W",
    "firstName": "aaa",
    "lastName": "aaa"
}



const inputInitials = {
  firstName: "dsadsa",
  lastName: "bbb",
  email: "aa1@bbb1.ee",
  password:"Q1w2E#",
  confirmPassword: ""
}


const url = "https://taltech.akaver.com/api/v1/Account/Register"


const RegisterTest = ({navigation}) => {

  const[input, setInput] = useState()
  const[error, setError] = useState("")
  const[message, setMessage] = useState("")

  const handlePress = async () => {
    try{
      const response = await axios.post(url, {
        email: input.email,
        password: input.password,
        firstName: input.firstName,
        lastName: input.lastName
      });
      console.log("after post")

      const {token} = response.data
      console.log(token)

      await AsyncStorage.setItem('token', token);
      navigation.navigate('Home', { token });
    }catch (error){
      console.log("Error occured")
      const msg = error.response.data.messages
      setError("Error" + msg)
    }

  }
  return(
    <View>
      <Button title="Press me" onPress={handlePress}/>
      <Text>{error}</Text>
    </View>

  )
}

export default RegisterTest