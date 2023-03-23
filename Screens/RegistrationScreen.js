import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import { authSignUpUser } from "../redux/auth/authOperations";
import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
const initialState = {
  login: "",
  email: "",

  password: "",
};
export default function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isHidden, setIsHidden] = useState(false);
  const dispatch = useDispatch();
  const onLogin = () => {
    dispatch(authSignUpUser(state));
    console.log(state);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../images/Photo_BG.png")}
          style={styles.image}
        >
          <View style={{ ...styles.viewBox }}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "android" ? "padding" : "height"}
            >
              <View style={styles.avatarBox}>
                <TouchableOpacity style={styles.addAvatarBtn}>
                  <Text style={styles.btnRectangle}>I</Text>
                  <Text style={styles.btnRectangleRotate}>I</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.titleBox}>
                <Text style={styles.registrationTitle}>Registration</Text>
              </View>
              <View
                style={{
                  ...styles.inputBox,
                }}
              >
                <TextInput
                  value={state.login}
                  onChangeText={(value) => {
                    setState((prevState) => ({ ...prevState, login: value }));
                  }}
                  placeholder="Login"
                  style={styles.input}
                  autoComplete="username"
                  onFocus={() => setIsHidden(!isHidden)}
                  onBlur={() => setIsHidden(!isHidden)}
                />
                <TextInput
                  value={state.email}
                  onChangeText={(value) => {
                    setState((prevState) => ({ ...prevState, email: value }));
                  }}
                  placeholder="Email"
                  autoComplete="email"
                  style={styles.input}
                  onFocus={() => setIsHidden(!isHidden)}
                  onBlur={() => setIsHidden(!isHidden)}
                />
                <TextInput
                  value={state.password}
                  onChangeText={(value) => {
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }));
                  }}
                  placeholder="Password"
                  secureTextEntry={true}
                  style={styles.input}
                  onFocus={() => setIsHidden(!isHidden)}
                  onBlur={() => setIsHidden(!isHidden)}
                />
              </View>
              {isHidden ? null : (
                <>
                  <View style={styles.registerBtnViewBox}>
                    <TouchableOpacity
                      style={{
                        ...styles.registerButton,
                      }}
                      onPress={onLogin}
                    >
                      <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Login")}
                    >
                      <Text style={styles.belowRegisterBtnText}>
                        Have an account already? Login
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  viewBox: {
    backgroundColor: "#fff",
    paddingTop: 100,
    width: "100%",
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: "center",
  },
  inputBox: {
    marginBottom: 32,
  },
  input: {
    width: "100%",
    fontSize: 16,
    color: "#BDBDBD",
    height: 50,
    padding: 16,

    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    marginBottom: 10,
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius: 8,
  },

  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleBox: {
    marginBottom: 33,
  },
  registrationTitle: {
    fontSize: 30,
    textAlign: "center",
  },
  registerBtnViewBox: {
    marginBottom: 100,
  },
  registerButton: {
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    height: 50,

    marginTop: 8,
  },
  belowRegisterBtnText: {
    color: "#1B4371",
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  avatarBox: {
    backgroundColor: "#F6F6F6",
    height: 120,
    width: 120,
    position: "absolute",
    top: -161,
    left: "33%",
    borderRadius: 16,
  },
  addAvatarBtn: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    borderWidth: 1,
    borderColor: "#FF6C00",
    position: "absolute",
    bottom: 14,
    right: -11,
  },
  btnRectangle: {
    fontSize: 20,
    color: "#FF6C00",
    fontWeight: "300",
    position: "absolute",
    top: -2,
    right: "37%",
  },
  btnRectangleRotate: {
    fontSize: 20,
    fontWeight: "300",
    color: "#FF6C00",
    position: "absolute",
    top: -1,
    right: 7.5,
    transform: [{ rotate: "90deg" }],
  },
});
