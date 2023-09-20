import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const BookingScreen = () => {
  const navigation = useNavigation();

  const [bookings, setBookings] = useState([
    {
      id: "1",
      service: "Cleaning Service",
      dateTime: new Date("2023-08-15T09:00:00"),
      status: "Pending",
      team: {
        name: "Cleaning Team",
        members: ["Alice", "Bob", "Charlie"],
      },
    },
    {
      id: "2",
      service: "Plumbing Service",
      dateTime: new Date("2023-08-18T14:30:00"),
      status: "Processing",
      team: {
        name: "Plumbing Team",
        members: ["David", "Eve"],
      },
    },
    {
      id: "3",
      service: "Electrical Service",
      dateTime: new Date("2023-08-21T11:15:00"),
      status: "Completed",
      team: {
        name: "Electrical Team",
        members: ["Frank", "Grace", "Helen"],
      },
    },
    // Add more bookings with different statuses as needed
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bookingCard}
      onPress={() => handleBookingPress(item)}
    >
      <Text style={styles.bookingTitle}>{item.service}</Text>
      <Text style={styles.bookingDateTime}>
        Date and Time: {item.dateTime.toLocaleString()}
      </Text>
      <Text
        style={[
          styles.bookingStatus,
          {
            color:
              item.status === "Completed"
                ? "green"
                : item.status === "Processing"
                ? "orange"
                : "blue",
          },
        ]}
      >
        Status: {item.status}
      </Text>
    </TouchableOpacity>
  );

  const handleBookingPress = (booking) => {
    navigation.navigate("BookingInfo", { booking });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentHeader}>
        <Text style={styles.header}>My Bookings</Text>
      </View>
      <FlatList
        data={bookings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
    backgroundColor: "#0374CB",
    padding: 20,
    paddingTop: 80,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  bookingCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
    margin: 10,
  },
  bookingTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0374CB",
    marginBottom: 10,
  },
  bookingDateTime: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  bookingStatus: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default BookingScreen;
