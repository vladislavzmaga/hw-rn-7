import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import PropTypes from "prop-types";

export const AuthInput = ({
  placeholder,
  value,
  name,
  onChangeText,
  onFocus,
}) => {
  const IsPassword = name === "password";
  const [isFocus, setIsFocus] = useState(false);
  const [hidePassword, setHidePassword] = useState(IsPassword);

  return (
    <View style={{ position: "relative" }}>
      <TextInput
        style={{
          ...styles.input,
          borderColor: isFocus ? "#FF6C00" : "#BDBDBD",
          backgroundColor: isFocus ? "#fff" : "#F6F6F6",
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
        secureTextEntry={hidePassword}
      />
      {IsPassword && (
        <TouchableOpacity
          style={styles.showPasswordBtn}
          activeOpacity={0.7}
          onPress={() => setHidePassword(!hidePassword)}
        >
          <Text style={styles.showPasswordText}>
            {hidePassword ? "Показати" : "Cкрити"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  name: PropTypes.string,
};
