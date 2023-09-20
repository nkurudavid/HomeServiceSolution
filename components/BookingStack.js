import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import BookingScreen from "../screens/BookingScreen";
import BookingInfoScreen from "../screens/BookingInfoScreen";

const Stack = createStackNavigator();

const BookingStack = () => {
  return (
    <Stack.Navigator initialRouteName="MyBookings">
      <Stack.Screen name="MyBookings" component={BookingScreen} />
      <Stack.Screen name="BookingInfo" component={BookingInfoScreen} />
      {/* Add more screens as needed */}
    </Stack.Navigator>
  );
};

export default BookingStack;
