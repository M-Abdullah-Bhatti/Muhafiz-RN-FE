import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import usePagination from "../../utils/usePagination";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { GetAllData } from "../../axios/NetworkCalls";
import RequestLoader from "../Loader/RequestLoader";
import Pagination from "../Shared/Pagination";
import { Ionicons } from "@expo/vector-icons";

const AllIncidents = () => {
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(null);
  const [error, setError] = useState(null);
  const paginate = usePagination(1, 4);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const { currentPage, totalPages, goToPage, pageNumbersToShow } = paginate(
    data,
    totalData
  );

  console.log(
    "currentPage, totalPages, pageNumbersToShow: ",
    currentPage,
    totalPages,

    pageNumbersToShow
  );

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          setLoading(true);

          const response = await GetAllData(
            `/incident/getAllMyIncidents?page=${currentPage}&incidentsPerPage=${4}`
          );

          if (response.success) {
            console.log("===> ", response?.data);
            setData(response?.data?.incidents);
            setTotalData(response?.data?.totalIncidents);
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
    }, [currentPage]) // Include currentPage in the dependency array
  );

  return (
    <View>
      {loading ? (
        <RequestLoader size="large" />
      ) : error ? ( // <RequestLoader size="large" /> // </div>
        <Text>{error}</Text>
      ) : (
        <>
          <View style={styles.contactContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
            <Text
              style={{
                fontSize: 22,
                marginTop: 10,
                marginBottom: 15,
                fontWeight: "600",
              }}
            >
              All Incidents
            </Text>
            {data.map((item) => (
              <TouchableOpacity
                style={styles.contact}
                onPress={() => {
                  navigation.navigate("CaseAssessment", {
                    id: item?._id,
                  });
                }}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.headingg}>{item.name}</Text>
                  <Text style={styles.subheading}>{item.category}</Text>
                  <Text style={styles.subheading}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Pagination */}
          {totalData && totalData > 4 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={goToPage}
              pageNumbersToShow={pageNumbersToShow}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contactContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 20, // Increased spacing for top margin
    padding: 10, // Add padding around the container for better spacing
    backgroundColor: "#FFF", // Light background color for the container
    width: "100%",
  },
  contact: {
    paddingHorizontal: 15, // Increase horizontal padding for more space inside each contact item
    paddingVertical: 20, // Add vertical padding for better spacing between items
    flexDirection: "row",
    justifyContent: "flex-start", // Align items to start for better structure
    alignItems: "flex-start", // Align items to the start vertically
    marginBottom: 15, // Increase bottom margin for more space between items
    backgroundColor: "#FFFFFF", // Keep a white background for each contact item
    borderRadius: 8, // Round the corners for a softer look
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Adjust shadow for a subtle elevation effect
    borderWidth: 1, // Optional: add a subtle border
    borderColor: "#EDEDED", // Light grey border for a subtle outline
  },
  textContainer: {
    flex: 1, // Take up full width of the parent minus icon width
  },
  headingg: {
    fontSize: 18, // Slightly reduce the font size for the name
    fontWeight: "600", // Make the name slightly bolder
    color: "#1E3EB3", // Use the main color for headings
    marginBottom: 5, // Reduce the bottom margin for tighter spacing
  },
  subheading: {
    fontSize: 15,
    color: "#4B5563", // Dark grey for subheading for better readability
    marginBottom: 4, // Adjust spacing between text lines
  },
  phoneIcon: {
    // Adjustments might not be necessary after the above changes.
  },
});

export default AllIncidents;
