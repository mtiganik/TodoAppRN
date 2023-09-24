import { View, Text } from "react-native"
import { commonStyles, loginScreenStyles } from "../utils/styles";
import { LinearGradient } from 'expo-linear-gradient';


//justify Content
// flex start
// center
// flex end
// space between
// space around
// space evenly


{/* // ALIGN ITEMS
// auto
// flex-start
// center
// flex-end
// stretch
// baseline
// space-between
// space-around
*/}
const LoginScreen = () => {


  return (
<LinearGradient style={{flex: 1}} colors={['#833ab4', '#fd1d1d', '#fcb045']} >
      <View style={{
        flex: 1,
        height: 200,
        justifyContent: 'center',
        alignItems: 'stretch',
        margin: 30,
        borderWidth: 10,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.3)'
        
      }}>
        <View style={{
          flex: 1,
          width: 100,
          backgroundColor: "red",
          justifyContent: "flex-end",
          alignItems: "center",
          borderRadius: 1,
          borderRadius: 2,
          borderColor: "cyan",
          borderWidth: 5
        }}
        >
          <Text>Hello123r </Text>
        </View>
        <View style={{
          flex: 2,
          backgroundColor: "orange"
        }}>
          <Text>Hello </Text>
          <Text>Hello </Text>
        </View>
        <View style={{
          flex: 1,
          backgroundColor: "green"
        }}>
          <Text>Hello </Text>
          <Text>Hello </Text>
        </View>

      </View>
      </LinearGradient>


  )
}
export default LoginScreen;
