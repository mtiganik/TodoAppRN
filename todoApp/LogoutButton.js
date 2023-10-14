import { useUser } from "../context/UserContext"
import { Button } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { useDataContext } from "../context/DataContext";

const emptyUser = {
  token: '',
  refreshToken: '',
  email: '',
  firstName: '',
  lastName: ''
}

export const LogoutButton = ({navigation}) => {
  const {user, setUser} = useUser()
  const {setTasks, setCategories, setPriorities} = useDataContext()

  const onPressLogout = async () => {
    await AsyncStorage.removeItem('userData')
    setUser(emptyUser)
    setTasks([])
    setCategories([])
    setPriorities([])
    axios.defaults.headers.common['Authorization'] = null

    navigation.navigate('Login')
  }

  return(
    <Button title="Logout" onPress={onPressLogout}/>
    
    )
  }
  
export const Logout = async({navigation}) => {
  const {user, setUser} = useUser()
  console.log("In Logout")
  await AsyncStorage.removeItem('userData')
  setUser(emptyUser)
  axios.defaults.headers.common['Authorization'] = null

  navigation.navigate('Login')
  // const onPressLogout = async () => {
  // }

}