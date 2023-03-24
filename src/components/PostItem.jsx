import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";

export const PostItem = ({ item, navigation }) => {
  const { photoURI, title, region, location } = item;

  return (
    <View style={styles.postItem}>
      <Image source={{ uri: photoURI }} style={styles.postImage} />
      <Text style={styles.postTitle}>{title}</Text>
      <View style={styles.postFooter}>
        <TouchableOpacity
          style={styles.postCommentWrap}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("CommentsScreen")}
        >
          <Feather
            name="message-circle"
            size={24}
            color="#BDBDBD"
            style={styles.commentIcon}
          />
          <Text style={styles.commentQuantity}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("MapScreen", location)}
        >
          <Feather
            name="map-pin"
            size={24}
            color="#BDBDBD"
            style={{ marginRight: 3 }}
          />
          <Text style={styles.postLocationText}>{region}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postItem: {
    marginBottom: 16,
  },
  postImage: {
    flex: 1,
    height: 240,
    resizeMode: "cover",
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  postTitle: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postCommentWrap: {
    flexDirection: "row",
  },
  commentIcon: {
    transform: [{ scaleX: -1 }],
    marginRight: 6,
  },
  commentQuantity: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  postLocationText: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#212121",
    textDecorationLine: "none",
  },
});

PostItem.propTypes = {
  item: PropTypes.shape({
    photoURI: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
  }),
  navigation: PropTypes.object.isRequired,
};
