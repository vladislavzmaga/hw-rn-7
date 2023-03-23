import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Text,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { Camera } from "expo-camera";

import db from "../firebase/config";
import { useSelector } from "react-redux";

export const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [readyToSend, setReadyToSend] = useState(true);
  const { userId, login } = useSelector((state) => state.auth);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permision to access location denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    const inputsFilledIn = image !== null && place !== "" && description !== "";
    setReadyToSend(!inputsFilledIn);
  }, [image, place, description]);

  const takePicture = async () => {
    const photo = await camera.takePictureAsync();

    setImage(photo.uri);
  };

  const clearInput = (val) => {
    setDescription("");
    setPlace("");
  };
  const descriptionHandler = (text) => setDescription(text);
  const sendPhoto = async () => {
    uploadPhotoToServer();
    navigation.navigate(
      "Profile",

      {
        image,
        description,
        place,
        location,
      }
    );
    uploadPostToServer();
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(image);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    await db.storage().ref(`postImage/${uniquePostId}`).put(file);
    const processedPhoto = await db
      .storage()
      .ref(`postImage`)
      .child(uniquePostId)
      .getDownloadURL();
    return processedPhoto;
  };

  const uploadPostToServer = async () => {
    const postDate = new Date();
    const photoToSever = await uploadPhotoToServer();
    await db.firestore().collection("posts").add({
      photoToSever,
      description,
      location: location.coords,
      userId,
      login,
      place: place,
      postDate: postDate.toLocaleString(),
      comments: [],
    });
  };
  const handleLocation = (value) => {
    setPlace(value);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.picPlaceholder}>
          <Camera style={styles.cameraScreen} ref={setCamera}>
            {image && (
              <View style={styles.takenPhotoWrap}>
                <Image
                  style={{ height: "100%", width: "100%" }}
                  source={{ uri: image }}
                />
              </View>
            )}
            <TouchableOpacity onPress={takePicture} style={styles.addPicPost}>
              <Image source={require("../images/svg/add-photo-icon.png")} />
            </TouchableOpacity>
          </Camera>
        </View>
        <Text style={styles.createPostTextStyle}>Upload photo</Text>

        <TouchableOpacity style={styles.placeholderWrapper}>
          <TextInput
            value={description}
            onChangeText={descriptionHandler}
            placeholder="Name your picture"
            placeholderTextColor={"#BDBDBD"}
            style={styles.createPostInput}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.placeholderWrapper}>
          <View style={styles.addLocationWrapper}>
            <Image
              style={styles.locationIcon}
              source={require("../images/svg/add-location-icon.png")}
            />

            <TextInput
              value={place}
              onChangeText={handleLocation}
              placeholder="Location"
              placeholderTextColor={"#BDBDBD"}
              style={styles.createPostInput}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            sendPhoto(), clearInput();
          }}
          disabled={readyToSend}
          style={{
            ...styles.submitPost,
            backgroundColor: !readyToSend ? "#FF6C00" : "#F6F6F6",
          }}
        >
          <Text
            style={{
              ...styles.publishTextStyle,
              color: !readyToSend ? "#fff" : "#BDBDBD",
            }}
          >
            Publish
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={clearInput} style={styles.removePostBtn}>
          <Image source={require("../images/svg/trash-bin-icon.png")} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    backgroundColor: "#fff",

    padding: 16,
  },
  picPlaceholder: {
    fontFamily: "Roboto-Regular",
    width: "100%",
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    overflow: "hidden",

    marginBottom: 9,
    // marginTop: 30,
  },
  cameraScreen: {
    display: "flex",

    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    height: "100%",
  },
  addPicPost: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 50,
    zIndex: 76,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 85,
    marginRight: 145,
  },
  createPostTextStyle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    alignSelf: "flex-start",
    fontWeight: "400",
    color: "#BDBDBD",
    marginBottom: 40,
  },
  addLocationWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  createPostInput: {
    fontFamily: "Roboto-Regular",

    width: "100%",
    fontSize: 16,
    lineHeight: 19,
    alignSelf: "flex-start",
    fontWeight: "400",

    width: "100%",
    paddingBottom: 15,
  },
  placeholderWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    width: "100%",
    marginBottom: 25,
  },
  locationIcon: {
    marginRight: 9,
  },
  submitPost: {
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    borderRadius: 100,
    marginBottom: 50,
  },
  publishTextStyle: {
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    color: "#BDBDBD",
  },
  removePostBtn: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 100,
  },

  takenPhotoWrap: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 7,
  },
});
