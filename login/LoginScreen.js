import { View, Text, TextInput, ScrollView, StyleSheet, Button } from "react-native"
import { commonStyles, loginScreenStyles } from "../utils/styles";
import { LinearGradient } from 'expo-linear-gradient';
import {ShowPassword, HidePassword} from "../utils/SvgImages"
import { useState } from "react";
import { SvgXml } from "react-native-svg";

const LoginScreen = ({navigation}) => {
const [showPassword, setShowPassword] = useState(false)

  return (
    <LinearGradient style={{ flex: 1 }} colors={['#833ab4', '#fd1d1d', '#fcb045']} >
      <ScrollView contentContainerStyle={loginScreenStyles.loginScreenBase}>
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
<View style={loginScreenStyles.passwordInputContainer}>
          <TextInput style={{flex: 1}}
            underlineColorAndroid="transparent"
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={!showPassword}
          />
          <SvgXml 
            xml={showPassword ? HidePassword : ShowPassword}
            width={24}
            height={24}
            onPress={() => setShowPassword(!showPassword)}
          />
          </View>
          <Button title="Login" />
          <Text>
            Don't have an account?{" "}
            <Text style={{ color: 'blue' }}
              onPress={() => navigation.navigate("Register")}>
              Register account

            </Text>
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>


  )
}
export default LoginScreen;

