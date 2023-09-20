import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const ProfileScreen = () => {
  // Placeholder user data (replace with actual user data)
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    location: "New York, NY",
    phone: "+1 (123) 456-7890",
    gender: "Male",
  };

  const handleLogout = async () => {
    try {
      // Make a POST request to the logout API endpoint
      const response = await fetch("http://127.0.0.1:8000/users/logout/", {
        method: "POST",
        headers: {
          // Add any required headers (e.g., authentication token) here
          // You may need to pass an authentication token if your API requires it
          // Example: "Authorization": "Bearer YOUR_ACCESS_TOKEN"
        },
      });

      if (response.status === 200) {
        // Logout was successful
        // You can clear the user session, navigate to the login screen, etc.
        // Example: navigateToLoginScreen();
      } else {
        // Handle logout error
        console.error("Logout failed");
        // You can display an error message or handle the error as needed
      }
    } catch (error) {
      // Handle network error or other exceptions
      console.error("An error occurred during logout:", error);
      // You can display an error message or handle the error as needed
    }
  };

  return (
    <View style={styles.container}>
      {/* Content header */}
      <View style={styles.contentHeader}>
        <Image
          source={require("../assets/images/housekeeper.jpg")}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{user.name}</Text>
      </View>
      {/* User profile information */}
      <View style={styles.profileInfo}>
        <Text style={styles.profileInfoText}>Email: {user.email}</Text>
        <Text style={styles.profileInfoText}>Location: {user.location}</Text>
        <Text style={styles.profileInfoText}>Phone: {user.phone}</Text>
        <Text style={styles.profileInfoText}>Gender: {user.gender}</Text>
      </View>
      {/* Settings section */}
      <View style={styles.settings}>
        <Text style={styles.settingsTitle}>Settings</Text>
        <TouchableOpacity style={styles.settingsOption}>
          <Text style={styles.settingsOptionText}>Update Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsOption}>
          <Text style={styles.settingsOptionText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsOption}>
          <Text style={styles.settingsOptionText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
      {/* Logout button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  contentHeader: {
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  userName: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  profileInfo: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  profileInfoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  settings: {
    marginTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  settingsOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  settingsOptionText: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#0374CB",
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default ProfileScreen;
