// CaseAssessment.js

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install expo vector icons
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { GetAllData } from "../../axios/NetworkCalls";
import { GetMyIncidents } from "../../configs/urls";
import RequestLoader from "../../component/Loader/RequestLoader";

const CaseAssessment = ({ route }) => {
  const { params } = route;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  // params.id

  navigatetoConnectWithAuth = () => {
    navigation.navigate("ConnectWithAuth");
  };

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          setLoading(true);
          const response = await GetAllData(
            `/incident/singleIncident?id=${params.id}`
          );

          if (response.success) {
            console.log(response?.data);
            setData(response?.data);
          } else {
            setError(response.message);
          }
        } catch (err) {
          console.error("Error fetching data:", err);
          setError(err.message); // Use err.message for consistency
        } finally {
          setLoading(false);
        }
      };

      getData(); // Execute the function instead of returning it
    }, []) // Include currentPage in the dependency array
  );

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* White Section */}
      {loading ? (
        <RequestLoader size="large" />
      ) : // </div>
      error ? (
        <Text>{error}</Text>
      ) : (
        <View style={styles.blueSection}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButtonContainer}
          >
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          <View style={styles.headerContainer}>
            <Text style={styles.MainHeading}>Case Assessment</Text>
          </View>

          <View style={styles.roundedBox}>
            <Text style={styles.blueHeading}>{data?.name}</Text>
            <Text style={styles.blueText}>{data?.description}</Text>
          </View>
        </View>
      )}
      <View style={styles.whiteSection}>
        <Text style={styles.whiteHeading}>Follow Up</Text>
        <Text style={styles.whiteText}>
          A message has been sent to the relevant authorities against the data
          you have entered in the previous screen. Make sure the data is
          correct; entering wrong or invalid information will be seen as an act
          of crime.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={navigatetoConnectWithAuth}
        >
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  backButtonContainer: {
    right: 160,
    top: -25,
  },
  whiteSection: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    marginRight: 120,
    marginBottom: 30,
  },
  MainHeading: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  blueSection: {
    flex: 1,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  whiteHeading: {
    fontSize: 24,
    color: "blue",
    marginBottom: 10,
  },
  whiteText: {
    fontSize: 16,
    textAlign: "left",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  roundedBox: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  blueHeading: {
    fontSize: 20,
    color: "blue",
    marginBottom: 10,
  },
  blueText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
});

export default CaseAssessment;
