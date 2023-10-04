import { useUser } from "../context/UserContext"
import { LogoutButton } from "./LogoutButton"
import { ListCategory } from "./todoCategories/ListCategory"


import { View, Text, Button } from "react-native"

import InitializeNewUser from "../login/InitializeNewUser"

export const HomeScreen = ({navigation}) => {

  const {user, setUser} = useUser()

  // InitializeNewUser(user.token)
  console.log("from homescreen434343434334")
  return (
    <View>
      <Text> Hello12</Text>
      {/* <Text>Hello {user.firstName} {user.lastName}</Text> 
      <ListCategory /> */}
      <LogoutButton navigation={navigation}/> 
    </View>
  )
}
