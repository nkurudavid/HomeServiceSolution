import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import ServiceScreen from "../screens/ServiceScreen";
import ServiceInfoScreen from "../screens/ServiceInfoScreen";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Service" component={ServiceScreen} />
      <Stack.Screen name="ServiceInfo" component={ServiceInfoScreen} />
      {/* Add more screens as needed */}
    </Stack.Navigator>
  );
};

export default HomeStack;
