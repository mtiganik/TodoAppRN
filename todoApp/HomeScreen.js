import { useUser } from "../context/UserContext"
import { LogoutButton } from "./LogoutButton"
import { ListCategory } from "./todoCategories/ListCategory"

import { View, Text, Button, StyleSheet } from "react-native"
import { ListTask } from "./todoTasks/listTasks"
import { DataProvider } from "../context/DataContext"


export const HomeScreen = ({navigation}) => {

  const {user, setUser} = useUser()

  const handleCategoryPress = () => {
    navigation.navigate("Categories")
  }
  const handleNewTaskCreate = () => {
    navigation.navigate("CreateTask")
  }
  return (
    <DataProvider>

      <View>
        <Text>Hello12 {user.firstName} {user.lastName}</Text>
        <View style={styles.header}>
          <Button onPress={handleNewTaskCreate} title="create new todo" />
          <Button onPress={handleCategoryPress} title="Categories" />
          <LogoutButton navigation={navigation} />
        </View>
        <ListTask />
      </View>
      </DataProvider>

  )
}

const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})