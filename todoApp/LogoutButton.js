import { useUser } from "../context/UserContext"
import { Button } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    navigation.navigate('Login')
  }

  return(
    <Button title="Logout" onPress={onPressLogout}/>

  )
}