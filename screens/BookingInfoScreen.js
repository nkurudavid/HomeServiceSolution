import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Image,
} from "react-native";
import { Rating } from "react-native-ratings";

const BookingInfoScreen = ({ route }) => {
  const { booking } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const submitReview = () => {
    // You can perform the review submission logic here
    console.log("Rating: ", rating);
    console.log("Review Text: ", reviewText);
    // After submitting the review, you can update the booking status as needed
    // For example, you can change the status to "Reviewed"
    // Then close the modal
    setIsModalVisible(false);
  };
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentHeader}>
        <Text style={styles.header}>Booking Details</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.bookingTitle}>{booking.service}</Text>
        <Text style={styles.bookingDateTime}>
          Date and Time: {booking.dateTime.toLocaleString()}
        </Text>
        <Text style={styles.bookingStatus}>Status: {booking.status}</Text>
      </View>
      {booking.status === "Completed" && (
        <TouchableOpacity
          style={[
            styles.reviewButton,
            {
              backgroundColor:
                booking.status === "Completed" ? "#0374CB" : "transparent",
            },
          ]}
          onPress={toggleModal}
        >
          <Text style={styles.reviewButtonText}>Submit Review</Text>
        </TouchableOpacity>
      )}
      <View style={styles.teamDetails}>
        <Text style={styles.teamTitle}>Team Details</Text>
        <Text style={styles.teamName}>Team Name: {booking.team.name}</Text>
        <Text style={styles.teamMembersTitle}>Team Members:</Text>
        <View style={styles.teamMembersList}>
          {booking.team.members.map((member, index) => (
            <View style={styles.teamMemberItem} key={index}>
              <Image
                source={require("../assets/images/housekeeper.jpg")}
                style={styles.teamMemberImage}
              />
              <Text style={styles.teamMemberName}>{member}</Text>
            </View>
          ))}
        </View>
      </View>
      <Modal isVisible={isModalVisible} backdropOpacity={0.8}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Rate the Service</Text>
          <Rating
            showRating
            onFinishRating={(value) => setRating(value)}
            style={styles.rating}
          />
          <TextInput
            placeholder="Write a review..."
            value={reviewText}
            onChangeText={(text) => setReviewText(text)}
            style={styles.reviewInput}
            multiline
          />
          <TouchableOpacity style={styles.submitButton} onPress={submitReview}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  contentContainer: {
    flex: 1,
    padding: 20,
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
  reviewButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    padding: 12,
    borderRadius: 30,
  },
  reviewButtonText: {
    color: "white",
    fontSize: 16,
  },
  teamDetails: {
    marginTop: 20,
  },
  teamTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0374CB",
    marginBottom: 10,
  },
  teamName: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  teamMembersTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0374CB",
    marginBottom: 10,
  },
  teamMembersList: {
    marginTop: 10,
  },
  teamMemberItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  teamMemberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  teamMemberName: {
    fontSize: 16,
    color: "#333",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rating: {
    paddingVertical: 10,
  },
  reviewInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: "#0374CB",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "gray",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default BookingInfoScreen;
