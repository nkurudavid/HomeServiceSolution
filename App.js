import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthStack from "./components/AuthStack";
import AccountStack from "./components/AccountStack";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated when the app starts
    AsyncStorage.getItem("auth_token")
      .then((token) => {
        setIsAuthenticated(token !== null);
      })
      .catch((error) => {
        console.error("Error checking authentication:", error);
      });
  }, []);

  return (
    <NavigationContainer>
      {/* {isAuthenticated ? <AccountStack /> : <AuthStack />} */}
      <AccountStack />
      {/* <AuthStack /> */}
    </NavigationContainer>
  );
};

export default App;
