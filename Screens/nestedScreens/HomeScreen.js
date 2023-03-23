import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
} from "react-native";
import db from "../../firebase/config";
import { FontAwesome, AntDesign, EvilIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export const HomeScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [userLikes, setUserLikes] = useState("no");
  const [countLikes, setCountLikes] = useState(0);
  const { login, userId } = useSelector((state) => state.auth);
  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };
  useEffect(() => {
    getUserPosts();
  }, []);

  const likePost = async (postId) => {
    if (userLikes === "no") {
      setUserLikes("yes");
      setCountLikes(+1);
      addLike(postId);
    } else {
      setUserLikes("no");
      setCountLikes(-1);
      addLike(postId);
    }
  };
  const addLike = async (postId) => {
    const data = await db.firestore().collection("posts").doc(postId).get();
    const { likes } = data.data();
    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .update({ likes: (likes ? likes : 0) + countLikes });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../images/Photo_BG.png")}
      >
        <View style={{ ...styles.profileViewBox }}>
          <View style={styles.profileAvatarBox}>
            <Image
              style={styles.profileImage}
              source={{
                uri: "https://armineh.files.wordpress.com/2019/10/photo-1479936343636-73cdc5aae0c3.jpg?w=720",
              }}
            />

            <TouchableOpacity style={styles.profileAvatarBtn}>
              <Text style={styles.btnRectangle}>I</Text>
              <Text style={styles.btnRectangleRotate}>I</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.profileTitle}>{login}</Text>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              console.log(item);
              return (
                <View style={styles.postContainer}>
                  <TouchableOpacity
                    style={styles.deletePostBtn}
                    onPress={() => deletePost(item.id, item.photo)}
                  ></TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      navigation.navigate("Comments", {
                        postId: item.id,
                        photo: item.photoToSever,
                        allComments: item.comments,
                      })
                    }
                  >
                    <Image
                      style={styles.postImage}
                      source={{ uri: item.photoToSever }}
                    />
                  </TouchableOpacity>
                  <View style={{ marginTop: 8 }}>
                    <Text style={styles.postImageTitle}>
                      {item.description}
                    </Text>
                  </View>
                  <View style={styles.postInfoContainer}>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={{ ...styles.postInfoBtn, marginRight: 25 }}
                        activeOpacity={0.7}
                        onPress={() =>
                          navigation.navigate("Comments", {
                            postId: item.id,
                            photo: item.photoToSever,
                            allComments: item.comments,
                          })
                        }
                      >
                        <FontAwesome
                          name="comment-o"
                          size={24}
                          color={item.comments?.length ? "#FF6C00" : "#BDBDBD"}
                        />
                        <Text style={styles.postInfoText}>
                          {item.comments?.length || 0}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.postInfoBtn}
                        activeOpacity={0.8}
                        // onPress={() => likePost(item.id)}
                      >
                        <AntDesign
                          name="like2"
                          size={24}
                          color={item.likes ? "#FF6C00" : "#BDBDBD"}
                        />
                        <Text style={styles.postInfoText}>
                          {item.likes || 0}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={styles.postInfoBtn}
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.navigate("Map", {
                          location: item.location,
                        })
                      }
                    >
                      <EvilIcons name="location" size={24} color="#BDBDBD" />
                      <Text style={styles.postInfoText}>{item.place}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bgImage: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
  },
  profileViewBox: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
    width: "100%",
    marginTop: 170,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // alignContent: "flex-end",
    paddingLeft: 16,
    paddingRight: 16,
    // flex: 1,
    justifyContent: "center",
  },
  profileAvatarBox: {
    backgroundColor: "#F6F6F6",
    height: 120,
    width: 120,
    position: "absolute",
    top: -60,
    left: "37%",
    borderRadius: 16,
  },
  profileAvatarBtn: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    position: "absolute",
    bottom: 14,

    right: -12,
    backgroundColor: "#fff",
    transform: [{ rotate: "45deg" }],
  },
  btnRectangle: {
    fontSize: 20,

    color: "#E8E8E8",

    fontWeight: "300",
    position: "absolute",
    top: -3,
    right: "35%",
  },
  btnRectangleRotate: {
    fontSize: 20,
    fontWeight: "300",
    color: "#E8E8E8",

    position: "absolute",
    top: -2,
    right: 7,
    transform: [{ rotate: "90deg" }],
  },
  profileImage: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    borderRadius: 16,
  },
  profileTitle: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 50,
    marginBottom: 30,
  },
  postImage: {
    marginBottom: 10,
  },
  statsWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  leftSideStats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  statsIcons: {
    marginRight: 10,
  },
  statsText: {
    marginRight: 30,
  },
  rightSideStats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  locationLink: {
    borderBottomWidth: 1,
    marginLeft: 10,
  },
  picName: {
    marginBottom: 10,
  },
  postImage: {
    height: 240,
    borderRadius: 8,
    resizeMode: "cover",
  },
  postImageTitle: {
    fontSize: 16,
    color: "#212121",
    marginBottom: 8,
  },
  postInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  postInfoBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  postInfoText: {
    marginLeft: 10,

    fontSize: 16,
    color: "#656565",
  },
});
