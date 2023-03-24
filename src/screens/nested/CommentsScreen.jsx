import { useEffect, useCallback } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import postPhoto from "../../../assets/images/post.jpg";

SplashScreen.preventAutoHideAsync();

export const CommentsScreen = () => {
  // console.log("route.params:", route.params.photo.uri)
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../../assets/fonts/Roboto/Roboto-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Image source={postPhoto} style={styles.postImage} />
      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.commentItem}>
          <Image style={styles.commentAvatar} />
          <View style={styles.commentTextWrap}>
            <Text style={styles.commentText}>
              Really love your most recent photo. I’ve been trying to capture
              the same thing for a few months and would love some tips!
            </Text>
            <Text style={styles.commetsDate}>09 июня, 2020 | 08:40</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  postImage: {
    height: 240,
    // resizeMode: "cover",
    marginBottom: 32,

    borderRadius: 8,
    borderWidth: 1,
  },
  commentItem: {
    flexDirection: "row",
    // marginHorizontal: 16,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  commentAvatar: {
    width: 28,
    height: 28,
    marginRight: 16,
    borderRadius: 50,
    backgroundColor: "#757575",
  },
  commentTextWrap: {
    alignItems: "flex-end",
    // width: 300,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  commentText: {
    marginBottom: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: "#212121",
  },
  commetsDate: {
    fontSize: 10,
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
  },
});
