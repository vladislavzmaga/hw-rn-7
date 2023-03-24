import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
// r-n components
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  Dimensions,
} from "react-native";
// fonts
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
// redux
import { authSignUpUser } from "../../redux/auth/authOperations";
// images
import mountainsImage from "../../../assets/images/mountains-bg.jpg";
import union from "../../../assets/images/union.png";
import cross from "../../../assets/images/cross.png";
import userPhoto from "../../../assets/images/user-photo.png"; // help photo
// util components
import { AuthInput, SubmitButton } from "../../components";
import { auth } from "../../firebase/config";

SplashScreen.preventAutoHideAsync();

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [userData, setUserData] = useState(initialState);
  const [user, setUser] = useState(null);
  const [isPhoto, setIsPhoto] = useState(false);
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../../../assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../../../assets/fonts/Roboto/Roboto-Regular.ttf"),
  });

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setUser(user);
  //       navigation.navigate("Home");
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // console.log("isShowKeyboard: ", isShowKeyboard)
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = async () => {
    dispatch(authSignUpUser(userData)) // or instead of useEffect ->
      .then(() => {
        setUserData(initialState);
        navigation.navigate("Home"); // handle if error
      })
      .catch((err) => alert(err.message));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.container}>
          <ImageBackground source={mountainsImage} style={styles.bgImage}>
            <View
              style={{
                ...styles.innerBox,
                marginTop: isShowKeyboard ? 128 : 220,
              }}
              onLayout={onLayoutRootView}
            >
              <View style={{ paddingBottom: 78 }}>
                <View style={styles.photoWrap}>
                  {isPhoto ? (
                    <>
                      <Image source={userPhoto} />
                      <TouchableOpacity
                        style={{
                          ...styles.addPhotoBtn,
                          borderColor: "#E8E8E8",
                        }}
                        activeOpacity={0.7}
                        onPress={() => setIsPhoto(false)}
                      >
                        <Image source={cross} />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <TouchableOpacity
                      style={styles.addPhotoBtn}
                      activeOpacity={0.7}
                      onPress={() => setIsPhoto(true)}
                    >
                      <Image source={union} />
                    </TouchableOpacity>
                  )}
                </View>

                <Text style={styles.title}>Реєстрація</Text>
                <AuthInput
                  placeholder="Логін"
                  name="login"
                  value={userData.login}
                  onChangeText={(value) =>
                    setUserData((prev) => ({ ...prev, login: value }))
                  }
                  onFocus={() => setIsShowKeyboard(true)}
                />
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
                <SubmitButton onPress={handleSubmit}>
                  Зареєструватися
                </SubmitButton>
                <Text style={{ ...styles.footerText }}>
                  Вже маєте акаунт?
                  <Text
                    style={styles.footerText}
                    onPress={() => navigation.navigate("Login")}
                  >
                    {" "}
                    Увійти
                  </Text>
                </Text>
              </View>
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
    justifyContent: "flex-end",
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  innerBox: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",

    paddingTop: 92,
    paddingHorizontal: 16,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  photoWrap: {
    position: "absolute",
    top: -152,
    left: "50%",
    transform: [{ translateX: -50 }],
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  addPhotoBtn: {
    position: "absolute",
    top: 81,
    right: -12.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 50,
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
  showPasswordBtn: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  showPasswordText: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  footerText: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
