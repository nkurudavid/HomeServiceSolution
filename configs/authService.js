import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://127.0.0.1:8000/api"; // Update this URL to match your API endpoint
const TOKEN_KEY = "auth_token";

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;

      // Store the token in AsyncStorage
      await AsyncStorage.setItem(TOKEN_KEY, token);

      return true;
    }
  } catch (error) {
    console.error("Login error:", error);
  }

  return false;
};

export const checkAuthentication = async () => {
  try {
    // Check if a token exists in AsyncStorage to determine if the user is authenticated
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return !!token;
  } catch (error) {
    console.error("Check authentication error:", error);
  }

  return false;
};

export const logout = async () => {
  try {
    // Remove the token from AsyncStorage to log the user out
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Logout error:", error);
  }
};
