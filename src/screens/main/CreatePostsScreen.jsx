import { useCallback, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";

import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { PostInput, SubmitButton } from "../../components";

const initialState = {
  photoURI: null,
  title: "",
  region: "",
  location: null,
};

export const CreatePostsScreen = ({ navigation }) => {
  let cameraRef = useRef();
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [postData, setPostData] = useState(initialState);
  //  for MediaLibrary acces gallery or camera and safe photo
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaPermission, setHasMediaPermission] = useState();
  const [photoURI, setPhotoURI] = useState(null);
  // maybe for location error
  const [errorMsg, setErrorMsg] = useState(null);

  // camera permission
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  // location permission
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        // or:
        // setErrorMsg("Permission to access location was denied");
        // return;
      }
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  const getUserLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    return coords;
  };

  const takePic = async () => {
    const newPhoto = await cameraRef.current.takePictureAsync();
    setPhotoURI(newPhoto.uri);
  };

  // submitForm
  const handleSubmit = async () => {
    const location = await getUserLocation();
    // console.log("photoURI: ", photoURI);
    const data = {
      ...postData,
      photoURI,
      location,
    };
    // console.log("postData:", data);
    navigation.navigate("DefaultPosts", data);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <TouchableWithoutFeedback
        onPress={keyboardHide}
        style={{ flex: 1, borderWidth: 1 }}
      >
        <View style={{ ...styles.container }}>
          <View style={{ marginTop: isShowKeyboard ? -32 : 32 }}>
            <Camera
              style={styles.camera}
              ref={cameraRef}
              // type={type}
            >
              <View style={styles.photoWrap}>
                {!photoURI && (
                  <TouchableOpacity
                    style={styles.photoButton}
                    activeOpacity={0.7}
                    onPress={takePic}
                  >
                    <FontAwesome5 name="camera" size={24} color="#BDBDBD" />
                  </TouchableOpacity>
                )}
                {photoURI && (
                  <>
                    <Image
                      style={styles.preview}
                      // source={{ uri: "data:image/jpg;base64," + photo.base64 }}
                      source={{ uri: photoURI }}
                    />
                    {/* <TouchableOpacity
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: "#757575",
                      }}
                      onPress={() => setPhoto(null)}
                    >
                      <Text>Delete photo</Text>
                    </TouchableOpacity> */}
                  </>
                )}
              </View>
            </Camera>
            <Text style={styles.helpText}>Завантажте фото</Text>
            <PostInput
              placeholder="Назва..."
              name="title"
              value={postData.title}
              onChangeText={(value) =>
                setPostData((prev) => ({ ...prev, title: value }))
              }
              onFocus={() => setIsShowKeyboard(true)}
              marginStyle={{ marginBottom: 16 }}
            />
            <PostInput
              placeholder="Місцевість..."
              name="location"
              value={postData.region}
              onChangeText={(value) =>
                setPostData((prev) => ({ ...prev, region: value }))
              }
              onFocus={() => setIsShowKeyboard(true)}
              marginStyle={{ marginBottom: isShowKeyboard ? 32 : 0 }}
            />
            <SubmitButton onPress={handleSubmit}>Опублікувати</SubmitButton>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.trashButton}
              activeOpacity={0.7}
              onPress={() => {
                setPostData(initialState);
                setPhotoURI(null);
              }}
            >
              <Feather name="trash-2" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  camera: {
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  photoWrap: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 240,
    marginBottom: 8,
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  photoButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
  helpText: {
    fontSize: 16,
    color: "#BDBDBD",
    marginBottom: 32,
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
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
  footer: {
    position: "absolute",
    bottom: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginHorizontal: 16,
  },
  trashButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});
