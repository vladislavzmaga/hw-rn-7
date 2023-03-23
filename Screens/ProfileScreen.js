import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./nestedScreens/HomeScreen";
import { CommentsScreen } from "./nestedScreens/CommentsScreen";
import { MapScreen } from "./nestedScreens/MapScreen";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
const NestedScreen = createStackNavigator();
TouchableOpacity;
export const ProfileScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ navigation }) => ({
          title: "Comments",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="arrowleft" size={27} color="#8F8F8F" />
            </TouchableOpacity>
          ),
        })}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={({ navigation }) => ({
          title: "Map",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="arrowleft" size={27} color="#8F8F8F" />
            </TouchableOpacity>
          ),
        })}
      />
    </NestedScreen.Navigator>
  );
};
