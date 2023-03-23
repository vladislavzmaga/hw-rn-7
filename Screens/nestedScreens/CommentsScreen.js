import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
} from "react-native";
import db from "../../firebase/config";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

export const CommentsScreen = ({ route }) => {
  const [keyboardActive, setKeyboardActive] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const { postId, photo } = route.params;
  const { login, userId } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchComments = async () => {
      const data = await db.firestore().collection("posts").doc(postId).get();
      setComments(data.data().comments);
    };

    fetchComments();
  }, [postId]);
  const createComment = async () => {
    const commentDate = new Date().toLocaleString("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .set(
        {
          comments: [
            ...(comments || []),
            {
              newComment,
              login,
              userId,
              commentDate,
            },
          ],
        },
        { merge: true }
      );

    setComments((prevComments) => [
      ...prevComments,
      { newComment, login, userId, commentDate },
    ]);
    Keyboard.dismiss();
    setNewComment("");
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
    setKeyboardActive(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={styles.postPhotoContainer}>
            <Image style={styles.postPhoto} source={{ uri: photo }} />
          </View>
          {comments.length > 0 && (
            <SafeAreaView style={styles.commentListWrap}>
              <FlatList
                data={comments}
                renderItem={({ item }) => {
                  const currentUser = userId === item.userId;

                  return (
                    <View
                      style={{
                        ...styles.commentContainer,
                        flexDirection: currentUser ? "row-reverse" : "row",
                      }}
                    >
                      <View
                        style={{
                          ...styles.avatarWrap,
                          marginRight: currentUser ? 0 : 10,
                          marginLeft: currentUser ? 10 : 0,
                        }}
                      >
                        <ImageBackground
                          style={styles.avatar}
                          source={{
                            uri: "https://armineh.files.wordpress.com/2019/10/photo-1479936343636-73cdc5aae0c3.jpg?w=720",
                          }}
                        />
                      </View>
                      <View
                        style={{
                          ...styles.commentText,
                          borderTopLeftRadius: currentUser ? 20 : 0,
                          borderTopRightRadius: currentUser ? 0 : 20,
                        }}
                      >
                        <Text style={styles.commentLogin}>{item.login}</Text>
                        <Text style={styles.commentMessage}>
                          {item.newComment}
                        </Text>
                        <Text style={styles.commentDate}>
                          {item.commentDate}
                        </Text>
                      </View>
                    </View>
                  );
                }}
                keyExtractor={(item, i) => i.toString()}
              />
            </SafeAreaView>
          )}

          <View
            style={{
              ...styles.inputWrapper,
              marginBottom: keyboardActive ? 200 : 20,
            }}
          >
            <TextInput
              style={styles.input}
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Add a comment..."
            />
            <TouchableOpacity
              style={styles.addCommentBtn}
              onFocus={() => setKeyboardActive(true)}
              onPress={createComment}
            >
              <AntDesign name="arrowup" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    // paddingVertical: 30,
    // paddingHorizontal: 15,
    // justifyContent: "center",
    // alignItems: "center",
    borderBottomColor: "#B3B3B3",
    borderTopColor: "#B3B3B3",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    justifyContent: "flex-end",
  },
  input: {
    justifyContent: "center",
    height: 50,
    paddingLeft: 14,
    paddingRight: 55,

    fontSize: 16,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  addCommentBtn: {
    position: "absolute",
    right: 6,
    bottom: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },
  inputWrapper: {
    position: "relative",
    marginHorizontal: 16,
  },
  commentContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  commentListWrap: {
    flex: 1,
    marginTop: 16,
    marginBottom: 16,
  },
  avatarWrap: {
    width: 50,
    height: 50,
    overflow: "hidden",
    borderRadius: 50,
  },
  avatar: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 50,
  },
  commentText: {
    padding: 14,
    maxWidth: 270,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  commentLogin: {
    marginBottom: 5,
    fontSize: 11,
    color: "#656565",
  },
  commentMessage: {
    marginBottom: 5,
    fontSize: 14,
    color: "#212121",
  },
  commentDate: {
    fontSize: 10,
    color: "#BDBDBD",
  },
  postPhotoContainer: {
    justifyContent: "flex-start",
    marginHorizontal: 16,
    marginTop: 32,
  },
  postPhoto: {
    height: 240,
    borderRadius: 8,
    resizeMode: "cover",
  },
});
