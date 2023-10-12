import { useUser } from "../context/UserContext"
import { Button } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const emptyUser = {
  token: '',
  refreshToken: '',
  email: '',
  firstName: '',
  lastName: ''
}


export const LogoutButton = ({navigation}) => {
  const {user, setUser} = useUser()

  const onPressLogout = async () => {
    await AsyncStorage.removeItem('userData')
    setUser(emptyUser)
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