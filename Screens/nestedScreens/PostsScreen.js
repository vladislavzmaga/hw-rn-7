import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import db from "../../firebase/config";
import { useSelector } from "react-redux";
import { FlatList } from "react-native";
import { FontAwesome, AntDesign, EvilIcons } from "@expo/vector-icons";
export const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [userLikes, setUserLikes] = useState("no");
  const [countLikes, setCountLikes] = useState(0);

  useEffect(() => {
    getAllPosts();
  }, []);
  const { login, email } = useSelector((state) => state.auth);
  const getAllPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  const likePost = async (postId) => {
    if (userLikes === "no") {
      setUserLikes("yes");
      setCountLikes(+1);
      addLike(postId);
    } else {
      setUserLikes("no");
      setCountLikes(0 ? 0 : -1);
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
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <View style={styles.itemViewBox}>
          <ImageBackground
            source={{
              uri: "https://armineh.files.wordpress.com/2019/10/photo-1479936343636-73cdc5aae0c3.jpg?w=720",
            }}
            style={styles.userImage}
          ></ImageBackground>
          <View style={styles.textWrap}>
            <Text style={styles.textName}>{login}</Text>
            <Text>{email}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postsContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate(
                  "Comments",

                  {
                    postId: item.id,
                    photo: item.photoToSever,
                    allComments: item.comments,
                  }
                )
              }
            >
              <Image
                style={styles.postImage}
                source={{ uri: item.photoToSever }}
              />
            </TouchableOpacity>
            <View style={styles.postImageInfoWrapper}>
              <Text style={styles.postImageTitle}>{item.description}</Text>
            </View>

            <View style={styles.postInfoContainer}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ ...styles.postInfoBtn, marginRight: 25 }}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate(
                      "Comments",

                      {
                        postId: item.id,
                        photo: item.photoToSever,
                        allComments: item.comments,
                      }
                    )
                  }
                >
                  <FontAwesome
                    name="comment-o"
                    size={24}
                    color={item.comments?.length ? "#FF6C00" : "#BDBDBD"}
                  />
                  <Text style={styles.postText}>
                    {item.comments?.length || 0}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.postInfoBtn}
                  activeOpacity={0.7}
                  onPress={() => likePost(item.id)}
                >
                  <AntDesign
                    name="like2"
                    size={24}
                    color={item.likes ? "#FF6C00" : "#BDBDBD"}
                  />
                  <Text style={styles.postText}>{item.likes || 0}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.postInfoBtn}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate("Map", {
                    location: item.location,
                  })
                }
              >
                <EvilIcons name="location" size={24} color="#BDBDBD" />
                <Text style={styles.postText}>{item.place}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    // paddingVertical: 30,
    paddingHorizontal: 15,
    // justifyContent: "center",
    // alignItems: "center",
    borderBottomColor: "#B3B3B3",
    borderTopColor: "#B3B3B3",
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  itemViewBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 30,

    borderRadius: 16,
  },
  userImage: {
    height: 60,

    width: 60,
    marginRight: 8,
    resizeMode: "cover",
    borderRadius: 16,
    overflow: "hidden",
  },
  textWrap: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  textName: {
    fontSize: 13,
    fontWeight: "700",
  },
  textEmail: {
    fontSize: 11,
    fontWeight: 400,
  },
  postText: {
    marginLeft: 10,

    fontSize: 16,
    color: "#656565",
  },
  postsContainer: {
    marginHorizontal: 16,
  },
  postImage: {
    height: 240,
    borderRadius: 8,
    resizeMode: "cover",
  },
  postImageInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
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
});
