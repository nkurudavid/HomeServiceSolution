// ServiceScreen.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

const ServiceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId, category } = route.params; // Get the category ID from route params

  const [servicesData, setServicesData] = useState([]);
  const [categoryImage, setCategoryImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch services for the selected category based on categoryId
    axios
      .get(`http://127.0.0.1:8000/api/service-categories/${categoryId}`)
      .then((response) => {
        setServicesData(response.data.services);
        setCategoryImage(response.data.image); // Set the category image
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, [categoryId]); // Add categoryId to the dependency array

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() => navigation.navigate("ServiceInfo", { serviceId: item.id })}
    >
      <Text style={styles.serviceTitle}>{item.service_name}</Text>
      <Text style={styles.serviceDescription}>{item.description}</Text>
      <Text style={styles.servicePrice}>Frw {item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={categoryImage ? { uri: categoryImage } : null} // Use categoryImage as the source
        style={styles.headerContainer}
      >
        <Text style={styles.header}>{category}</Text>
      </ImageBackground>
      <Text style={styles.serviceHeaderText}>All Services</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={servicesData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    padding: 20,
    paddingTop: 80,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    padding: 10,
    marginBottom: 20,
    textAlign: "center",
    backgroundColor: "rgba(3, 116, 203, 0.7)", // Add background color with opacity
  },
  serviceHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0374CB",
    margin: 20,
  },
  serviceCard: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
    margin: 10,
  },
  serviceTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  serviceDescription: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
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
  },
});

export default ServiceScreen;
