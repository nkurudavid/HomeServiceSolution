import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Picker,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Modal from "react-native-modal";

const SignupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    gender: "",
    phone_number: "",
    location: "",
    is_client: true, // Hidden field
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const handleSignup = async () => {
    setIsLoading(true);

    try {
      // Make a POST request to your signup endpoint
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/signup/",
        formData
      );

      // Check if registration was successful based on your API response
      if (response.status === 201) {
        setIsLoading(false);
        setIsMessageVisible(true);
        setMessage("Registration successful.");
        setTimeout(() => {
          setIsMessageVisible(false);
          setMessage("");
          navigation.navigate("Home"); // Navigate to the Home screen
        }, 2000); // Hide the message after 2 seconds and navigate to Home
      } else {
        setIsLoading(false);
        setIsMessageVisible(true);
        setMessage(
          "Unable to register. Please check your information and try again."
        );
        setTimeout(() => {
          setIsMessageVisible(false);
          setMessage("");
        }, 5000); // Hide the message after 5 seconds
      }
    } catch (error) {
      setIsLoading(false);
      setIsMessageVisible(true);
      setMessage(
        "An error occurred. Please try again later or check your internet connection."
      );
      setTimeout(() => {
        setIsMessageVisible(false);
        setMessage("");
      }, 5000); // Hide the message after 5 seconds
      console.error(error);
    }
  };

  const hideMessageModal = () => {
    setIsMessageVisible(false);
    setMessage("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Homeowner Signup</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={formData.first_name}
          onChangeText={(text) =>
            setFormData({ ...formData, first_name: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={formData.last_name}
          onChangeText={(text) => setFormData({ ...formData, last_name: text })}
        />
        <Picker
          style={styles.input}
          selectedValue={formData.gender}
          onValueChange={(value) => setFormData({ ...formData, gender: value })}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="+25078xxxxxxxx"
          value={formData.phone_number}
          onChangeText={(text) =>
            setFormData({ ...formData, phone_number: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={formData.location}
          onChangeText={(text) => setFormData({ ...formData, location: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email@example.com"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={formData.confirm_password}
          onChangeText={(text) =>
            setFormData({ ...formData, confirm_password: text })
          }
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleSignup}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.signupButtonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
        {/* Message Modal */}
        <Modal
          isVisible={isMessageVisible}
          onBackdropPress={hideMessageModal}
          onBackButtonPress={hideMessageModal}
        >
          <View style={styles.messageModal}>
            <Text style={styles.message}>{message}</Text>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginLinkText}>
            Already have an account? Login here
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "80%",
    alignItems: "center",
    paddingTop: 40,
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#0374CB",
    marginBottom: 40,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 15,
  },
  signupButton: {
    backgroundColor: "#0374CB",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
  },
  signupButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginLink: {
    marginTop: 20,
  },
  loginLinkText: {
    color: "#0374CB",
    fontSize: 16,
  },
  messageModal: {
    backgroundColor: "white",
    padding: 40,
    borderRadius: 10,
    margin: "auto",
    width: "70%",
  },
  message: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default SignupScreen;
