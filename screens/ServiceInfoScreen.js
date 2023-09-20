import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";

import BookingFormModal from "../components/BookingFormModal"; // Import the BookingFormModal component

const ServiceInfoScreen = () => {
  const navigation = useNavigation(); // Get the navigation object
  const route = useRoute();
  const { serviceId } = route.params; // Get the selected service ID from route params

  const [serviceDetails, setServiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  useEffect(() => {
    // Fetch service details using service ID
    axios
      .get(
        `http://127.0.0.1:8000/api/service-categories/{category_id}/services/${serviceId}/`
      )
      .then((response) => {
        setServiceDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching service details:", error);
        setLoading(false);
      });
  }, [serviceId]);

  const handleBookNowPress = () => {
    setIsModalVisible(true);
  };

  const onBook = () => {
    if (selectedDateTime) {
      // Handle booking logic here
      console.log("Selected Date and Time:", selectedDateTime);
      // You can perform the booking action here
    } else {
      // Display an error message if date and time are not selected
      alert("Please select a date and time to book.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentHeader}>
        <Text style={styles.header}>
          {serviceDetails ? serviceDetails.service_name : "Loading..."}
        </Text>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0374CB" />
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.serviceTitle}>Description</Text>
          <Text style={styles.serviceDetails}>
            {serviceDetails
              ? serviceDetails.description
              : "Service details not available."}
          </Text>
          <Text style={styles.servicePrice}>
            Price: {serviceDetails ? serviceDetails.price : "N/A"}
          </Text>
          <Text style={styles.serviceHours}>
            Duration: {serviceDetails ? serviceDetails.hours : "N/A"}
          </Text>
          <View style={styles.bookButtonContainer}>
            <TouchableOpacity
              style={styles.bookButton}
              onPress={handleBookNowPress}
            >
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <BookingFormModal
        selectedDateTime={selectedDateTime}
        setSelectedDateTime={setSelectedDateTime}
        onBook={onBook}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={(date) => {
          // Handle the submission of the selected date here
          // You can send the selected date to your booking API, for example
          // You may also want to close the modal after successful submission
          setSelectedBookingDate(date);
          setIsModalVisible(false);
          navigation.navigate("BookingScreen"); // Navigate to the BookingScreen
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentHeader: {
    backgroundColor: "#0374CB", // Background color for the content header
    padding: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    padding: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0374CB",
    marginBottom: 10,
  },
  serviceDetails: {
    fontSize: 18,
    color: "#333",
    marginBottom: 30, // Added more padding to the service details
  },
  servicePrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0374CB",
    marginBottom: 5,
  },
  serviceHours: {
    fontSize: 18,
    color: "#777",
    marginBottom: 20,
  },
  bookButtonContainer: {
    flex: 1, // Allow the "Book Now" button to take up remaining vertical space
    justifyContent: "flex-end", // Push the button to the bottom
  },
  bookButton: {
    backgroundColor: "#0374CB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default ServiceInfoScreen;
