import { useUser } from "../context/UserContext"
import { LogoutButton } from "./LogoutButton"
import { ListCategory } from "./todoCategories/ListCategory"

import { View, Text, Button, StyleSheet } from "react-native"
import { ListTask } from "./todoTasks/listTasks"
import { DataProvider, useDataContext } from "../context/DataContext"
import { commonStyles } from "../utils/styles"


export const HomeScreen = ({navigation, route}) => {
  const NavigationSuccessMessage = route.params ? route.params.successMessage : '';
  const {user, setUser} = useUser()

  
  const handleCategoryPress = () => {
    navigation.navigate("Categories")
  }
  const handleNewTaskCreate = () => {
    navigation.navigate("CreateTask")
  }

  return (
    <DataProvider>
      {NavigationSuccessMessage && (
        <Text style={commonStyles.successText}>{NavigationSuccessMessage}</Text>
      )}
      <ShowSuccesMessage />
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

const ShowSuccesMessage = () => {
  const { successMessage } = useDataContext();

  return (
    <View>
      {successMessage && (
        <Text style={commonStyles.successText}>{successMessage}</Text>
      )}
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