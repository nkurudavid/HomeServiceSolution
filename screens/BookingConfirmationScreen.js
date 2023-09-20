import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BookingConfirmationScreen = ({ route }) => {
  const { service, selectedDateTime } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking Confirmation</Text>
      <Text style={styles.confirmationText}>
        Your booking for {service} has been confirmed!
      </Text>
      <Text style={styles.confirmationText}>
        Date and Time: {selectedDateTime.toLocaleString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0374CB",
    marginBottom: 20,
  },
  confirmationText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
});

export default BookingConfirmationScreen;
