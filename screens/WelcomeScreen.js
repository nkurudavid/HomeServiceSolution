import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/homeSolution.jpg")} // Replace with your app logo
          style={styles.logo}
        />
        <Text style={styles.appName}>Streamlining Home Service Solutions</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.description}>
          Your all-in-one solution for hassle-free home services. Enjoy instant
          access to a wide range of services, transparent pricing, and verified
          provider. Track your service in real-time, and choose from diverse
          options. Join us Today!
        </Text>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0374CB",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  appName: {
    fontSize: 28,
    color: "white",
    marginTop: 10,
    fontWeight: "bold",
  },
  content: {
    alignItems: "center",
    marginTop: 30,
  },
  welcomeText: {
    fontSize: 24,
    color: "white",
    marginBottom: 10,
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
    color: "white",
    // textAlign: "center",
    marginBottom: 30,
  },
  getStartedButton: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  getStartedButtonText: {
    fontSize: 18,
    color: "#0374CB",
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
