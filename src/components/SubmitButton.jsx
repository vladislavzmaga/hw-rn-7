import { StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

export const SubmitButton = ({ onPress, children }) => {
  return (
    <TouchableOpacity
      style={styles.mainButton}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

SubmitButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
