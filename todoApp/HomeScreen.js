import { useUser } from "../context/UserContext"
import { LogoutButton } from "./LogoutButton"
import { ListCategory } from "./todoCategories/ListCategory"

import { View, Text, Button, StyleSheet } from "react-native"

export const HomeScreen = ({navigation}) => {

  const {user, setUser} = useUser()

  const handleCategoryPress = () => {
    navigation.navigate("Categories")
  }
  return (
    <View>
      <Text>Hello {user.firstName} {user.lastName}</Text> 
      <View style={styles.header}>
      <Button onPress={handleCategoryPress} title="Categories" />      
      <LogoutButton navigation={navigation}/> 
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})