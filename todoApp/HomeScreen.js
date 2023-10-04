import { useUser } from "../context/UserContext"
import { LogoutButton } from "./LogoutButton"
import { ListCategory } from "./todoCategories/ListCategory"


import { View, Text, Button } from "react-native"

import { InitializeNewUser, TestAxiosFetch } from "../login/InitializeNewUser"

export const HomeScreen = ({navigation}) => {

  const {user, setUser} = useUser()
  console.log("1ddsaasshaaasome")
  // InitializeNewUser(user.token)
  TestAxiosFetch()
  return (
    <View>
      <Text> Hello12</Text>
      {/* <Text>Hello {user.firstName} {user.lastName}</Text> 
      <ListCategory /> */}
      <LogoutButton navigation={navigation}/> 
    </View>
  )
}
