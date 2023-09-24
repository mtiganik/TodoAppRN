import { View, Text, TextInput, StyleSheet, Button } from "react-native"
import { commonStyles, loginScreenStyles } from "../utils/styles";
import { LinearGradient } from 'expo-linear-gradient';

const RegisterScreen = () => {
  return (
    <LinearGradient style={{ flex: 1 }} colors={['#833ab4', '#fd1d1d', '#fcb045']} >
      <View style={loginScreenStyles.loginScreenBase}>
        <View style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        >
          <Text style={{
            fontFamily: "sans-serif-condensed",
            fontSize: 30
          }}>Register account </Text>
        </View>
        <View style={{
          flex: 4,
          alignItems: "center",
        }}>
          <TextInput style={loginScreenStyles.input}
            underlineColorAndroid="transparent"
            placeholder="First name"
            autoCapitalize="none"
          />
          <TextInput style={loginScreenStyles.input}
            underlineColorAndroid="transparent"
            placeholder="Last name"
            autoCapitalize="none"
          />
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
          <Button title="Register" />
          <Text>
            Already have an account?{" "}
            <Text style={{ color: 'blue' }}
              onPress={() => { }}>
              Log in
            </Text>
          </Text>
        </View>
      </View>
    </LinearGradient>
  )
}

export default RegisterScreen