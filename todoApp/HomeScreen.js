import { useUser } from "../context/UserContext"
import { LogoutButton } from "./LogoutButton"
import { ListCategory } from "./todoCategories/ListCategory"


import { View, Text, Button } from "react-native"



export const HomeScreen = ({navigation}) => {

  const {user, setUser} = useUser()


  return (
    <View>
      <Text> Hello</Text>
      <Text>Hello {user.firstName} {user.lastName}</Text> 
      <ListCategory />
      <LogoutButton navigation={navigation}/> 
    </View>
  )
}
