import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ route }) => {
  const { longitude, latitude } = route.params.location;
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title="geolocation" />
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 15,
    // justifyContent: "center",
    // alignItems: "center",
    borderBottomColor: "#B3B3B3",
    borderTopColor: "#B3B3B3",
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
});
