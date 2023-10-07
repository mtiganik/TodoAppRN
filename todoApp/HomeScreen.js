import { useUser } from "../context/UserContext"
import { LogoutButton } from "./LogoutButton"
import { ListCategory } from "./todoCategories/ListCategory"

import { View, Text, Button } from "react-native"

export const HomeScreen = ({navigation}) => {

  const {user, setUser} = useUser()

  const handleCategoryPress = () => {
    navigation.navigate("Categories")
  }
  return (
    <View>
      <Text>Hello {user.firstName} {user.lastName}</Text> 
      <Button onPress={handleCategoryPress} title="Categories" />      
      <LogoutButton navigation={navigation}/> 

    </View>
  )
}
