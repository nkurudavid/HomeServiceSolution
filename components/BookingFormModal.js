import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const BookingFormModal = ({ isVisible, onClose, onBook }) => {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleBook = () => {
    // Perform any necessary booking actions with selectedDateTime
    // For example, you can send the booking request to your backend API
    onBook(selectedDateTime);

    // Close the modal
    onClose();
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Booking Date and Time</Text>
          {selectedDateTime && (
            <Text style={styles.selectedDateTimeText}>
              Selected Date and Time: {selectedDateTime.toLocaleString()}
            </Text>
          )}
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={toggleDatePicker}
          >
            <Text style={styles.datePickerButtonText}>
              Select Date and Time
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDateTime}
              mode="datetime" // Change mode to 'datetime' for date and time selection
              is24Hour={true}
              display="default"
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) {
                  setSelectedDateTime(date);
                }
              }}
            />
          )}
          <TouchableOpacity style={styles.submitButton} onPress={handleBook}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  datePickerButton: {
    backgroundColor: "#0374CB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  datePickerButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  submitButton: {
    backgroundColor: "green", // Change to green color
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  selectedDateTimeText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
});

export default BookingFormModal;
