import { View, Text, TextInput, StyleSheet, Button } from "react-native"
import { commonStyles, loginScreenStyles } from "../utils/styles";
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({navigation}) => {

  return (
    <LinearGradient style={{ flex: 1 }} colors={['#833ab4', '#fd1d1d', '#fcb045']} >
      <View style={loginScreenStyles.loginScreenBaseToDelete}>
        <View style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        >
          <Text style={{
            fontFamily: "sans-serif-condensed",
            fontSize: 30
          }}>Login </Text>
        </View>
        <View style={{
          flex: 2,
          alignItems: "center",
        }}>
          <TextInput style={loginScreenStyles.input}
            underlineColorAndroid="transparent"
            placeholder="Email"
            autoCapitalize="none"
          />

          <TextInput style={loginScreenStyles.input}
            underlineColorAndroid="transparent"
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <Button title="Login" />
          <Text>
            Don't have an account?{" "}
            <Text style={{ color: 'blue' }}
              onPress={() => navigation.navigate("Register")}>
              Register account

            </Text>
          </Text>
        </View>
      </View>
    </LinearGradient>


  )
}
export default LoginScreen;

