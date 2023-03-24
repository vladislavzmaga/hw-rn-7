import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
// rn-components
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
// fonts
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
// auth, redux
import { auth } from "../../firebase/config";
import { authSignInUser } from "../../redux/auth/authOperations";
//  image
import mountainsImage from "../../../assets/images/mountains-bg.jpg";
// util components
import { AuthInput, SubmitButton } from "../../components";

SplashScreen.preventAutoHideAsync();

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [userData, setUserData] = useState(initialState);
  const [user, setUser] = useState(null);
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../../../assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../../../assets/fonts/Roboto/Roboto-Regular.ttf"),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    // console.log("userData(Log): ", userData);
    dispatch(authSignInUser(userData));
    setUserData(initialState);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.container}>
          <ImageBackground source={mountainsImage} style={styles.bgImage}>
            <View
              style={{
                ...styles.innerBox,
                marginTop: isShowKeyboard ? 255 : 280,
              }}
              onLayout={onLayoutRootView}
            >
              <Text style={styles.title}>Увійти</Text>

              <AuthInput
                placeholder="Електронна пошта"
                name="email"
                value={userData.email}
                onChangeText={(value) =>
                  setUserData((prev) => ({ ...prev, email: value }))
                }
                onFocus={() => setIsShowKeyboard(true)}
              />
              <AuthInput
                placeholder="Пароль"
                name="password"
                value={userData.password}
                onChangeText={(value) =>
                  setUserData((prev) => ({ ...prev, password: value }))
                }
                onFocus={() => setIsShowKeyboard(true)}
              />
              <SubmitButton onPress={handleSubmit}>Увійти</SubmitButton>
              <Text style={styles.footerText}>
                Не маєте акаунта?
                <Text onPress={() => navigation.navigate("Register")}>
                  {" "}
                  Зареєструватися
                </Text>
              </Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bgImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  innerBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  title: {
    marginBottom: 32,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
  input: {
    height: 50,
    padding: 16,
    marginBottom: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 5,
  },
  inputOnFocus: {
    height: 50,
    padding: 16,
    marginBottom: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 5,
  },
  mainButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 27,
    marginBottom: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },
  footerText: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
