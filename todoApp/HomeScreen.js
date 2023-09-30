import { useUser } from "../context/UserContext"
import { LogoutButton } from "./LogoutButton"
import { View, Text, Button } from "react-native"



export const HomeScreen = ({navigation}) => {

  const {user, setUser} = useUser()


  return (
    <View>
      <Text>Home screen {user.firstName}</Text>
      <Text>Hello {user.firstName} {user.lastName}</Text>
      <LogoutButton navigation={navigation}/>
    </View>
  )
}
