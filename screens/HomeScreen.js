import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    // Check for network connection before making the API request
    const checkNetworkConnection = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/service-categories/"
        );
        setCategories(response.data.results);
        setLoading(false);
        setNetworkError(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
        setNetworkError(true);
      }
    };

    checkNetworkConnection();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() =>
        navigation.navigate("Service", {
          categoryId: item.id,
          category: item.title,
        })
      }
    >
      <View style={styles.categoryContent}>
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
        <Text style={styles.categoryTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Home Service Solutions</Text>
          <Text style={styles.advertisingText}>
            Discover a wide range of home services at your fingertips. We make
            home maintenance easy and convenient for you.
          </Text>
        </View>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : networkError ? (
          <Text style={styles.errorText}>Network Error</Text>
        ) : (
          <>
            <Text style={styles.categoryHeaderText}>
              All Service Categories
            </Text>
            <FlatList
              data={categories}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
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
  advertisingText: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  categoryHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0374CB",
    margin: 20,
  },
  categoryCard: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "space-between",
    padding: 10,
    margin: 10,
    width: "45%",
  },
  categoryContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0374CB",
    marginLeft: 10,
  },
  categoryImage: {
    width: 110,
    height: 110,
    borderRadius: 10,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
  errorText: {
    textAlign: "center",
    fontSize: 18,
    color: "red",
    marginTop: 20,
  },
});

export default HomeScreen;
