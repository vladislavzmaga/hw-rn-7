import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import PropTypes from "prop-types";

export const MapScreen = ({ route }) => {
  // console.log("route.params: ", route.params);
  const { latitude, longitude } = route.params;
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        minZoomLevel={15}
      >
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapStyle: {
    flex: 1,
  },
});

MapScreen.propTypes = {
  route: PropTypes.object.isRequired,
};
