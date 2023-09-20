import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { login } from "../configs/authService"; // Import your login function

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [notification, setNotification] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const showMessageModal = (message) => {
    setNotification(message);
    setMessageModalVisible(true);
    setTimeout(() => {
      setMessageModalVisible(false);
      setNotification("");
    }, 3000);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showMessageModal("All fields are required");
      return;
    }

    setIsLoading(true);

    const success = await login(email, password); // Use your login function

    setIsLoading(false);

    if (success) {
      showMessageModal("Login successful");
      navigation.navigate("Home");
    } else {
      showMessageModal("Login failed. Check your credentials.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>HomeOwner Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        {isLoading ? (
          <ActivityIndicator
            style={styles.loading}
            size="large"
            color="#0374CB"
          />
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.signupLink}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.signupLinkText}>
            Don't have an account? Sign up here
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={messageModalVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalCard}>
              <Text style={styles.modalMessage}>{notification}</Text>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  loginButton: {
    backgroundColor: "#0374CB",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupLink: {
    marginTop: 20,
  },
  signupLinkText: {
    color: "#0374CB",
    fontSize: 16,
  },
  notification: {
    color: "red",
    marginBottom: 15,
  },
  loading: {
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 40,
    width: "70%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalMessage: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default LoginScreen;
