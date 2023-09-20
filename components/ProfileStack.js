import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="MyProfile">
      <Stack.Screen name="MyProfile" component={ProfileScreen} />
      {/* Add more screens as needed */}
    </Stack.Navigator>
  );
};

export default ProfileStack;
