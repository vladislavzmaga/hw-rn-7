import { useState, useCallback, useEffect } from "react";
import { Image, StyleSheet, Text, View, FlatList } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { auth } from "../../firebase/config";

import userPhoto from "../../../assets/images/user-photo.png";
import { PostItem } from "../../components";
// import postPhoto from '../../../assets/images/post.jpg';

SplashScreen.preventAutoHideAsync();

export const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts((prev) => [...prev, route.params]);
    }
  }, [route.params]);
  // console.log("route.params:", route.params);
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../../../assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../../../assets/fonts/Roboto/Roboto-Medium.ttf"),
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
    // <Text>PostsScreen</Text>
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.userItem}>
        <Image source={userPhoto} style={styles.userPhoto} />
        <View>
          <Text style={styles.userName}>{auth.currentUser?.displayName}</Text>
          {/* <Text style={styles.userEmail}>email@example.com</Text> */}
          <Text style={styles.userEmail}>{auth.currentUser?.email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <PostItem item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  userPhoto: {
    width: 60,
    height: 60,
    marginRight: 8,
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});
