import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";

export const PostInput = ({
  placeholder,
  name,
  value,
  onChangeText,
  onFocus,
  marginStyle,
}) => {
  const isLocation = name === "location";
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={{ position: "relative" }}>
      {isLocation && (
        <Feather
          name="map-pin"
          size={24}
          color="#BDBDBD"
          style={{ position: "absolute", top: 11 }}
        />
      )}
      <TextInput
        style={{
          ...styles.input,
          ...marginStyle,
          borderBottomColor: isFocus ? "#FF6C00" : "#E8E8E8",
          paddingLeft: isLocation ? 28 : 0,
        }}
        placeholder={placeholder}
        placeholderTextColor={"#BDBDBD"}
        onChangeText={onChangeText}
        value={value}
        onFocus={() => {
          setIsFocus(true);
          onFocus();
        }}
        onBlur={() => setIsFocus(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    // paddingTop: 16,
    // paddingBottom: 16,
    paddingVertical: 16,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderBottomWidth: 1,
  },
});

PostInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  marginStyle: PropTypes.object.isRequired,
  name: PropTypes.string,
};
