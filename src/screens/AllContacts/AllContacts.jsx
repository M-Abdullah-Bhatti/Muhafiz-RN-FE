import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { GetAllData } from "../../axios/NetworkCalls";
import usePagination from "../../utils/usePagination";
import Pagination from "../../component/Shared/Pagination";
import RequestLoader from "../../component/Loader/RequestLoader";
import Header from "../../component/Header";
import AllIncidents from "../../component/AllIncidents/AllIncidents";

const AllContacts = () => {
  const paginate = usePagination(1, 4);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(null);
  const [error, setError] = useState(null);

  const { currentPage, totalPages, goToPage, pageNumbersToShow } = paginate(
    data,
    totalData
  );

  // console.log(
  //   "currentPage, totalPages, pageNumbersToShow: ",
  //   currentPage,
  //   totalPages,

  //   pageNumbersToShow
  // );

  const navigateTonewContact = () => {
    navigation.navigate("NewContact"); // Ensure 'MapWithButtons' is the name of your target screen
  };

  const makePhoneCall = async (phoneNumber) => {
    if (Platform.OS === "android") {
      Linking.openURL(`tel:${phoneNumber}`);
      return;
    }

    if (Platform.OS === "ios") {
      Linking.openURL(`telprompt:${phoneNumber}`);
      return;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          setLoading(true);

          const response = await GetAllData(
            `/contact/getAllMyContacts?page=${currentPage}&contactsPerPage=${4}`
          );

          if (response.success) {
            // console.log(response?.data);
            setData(response?.data?.contacts);
            setTotalData(response?.data?.totalContacts);
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
    <ScrollView style={styles.scrollViewStyle}>
      <View style={styles.container}>
        <Text style={styles.heading}>Send SOS</Text>
        <Text style={styles.subHeadingPlease}>Please Stay Calm</Text>

        {/* Icon on the top right */}
        <TouchableOpacity onPress={navigateTonewContact} style={styles.icon}>
          <Ionicons name="person-add-outline" size={30} color="black" />
        </TouchableOpacity>

        {/* Contacts */}
        {loading ? (
          <RequestLoader size="large" />
        ) : // </div>
        error ? (
          <Text>{error}</Text>
        ) : (
          <>
            <View style={styles.contactContainer}>
              <Text style={{ fontSize: 22, marginTop: 10, fontWeight: "600" }}>
                All Contacts
              </Text>
              {data.map((item) => (
                <View style={styles.contact}>
                  <View style={styles.textContainer}>
                    <Text style={styles.headingg}>{item.name}</Text>
                    <Text style={styles.subheading}>{item.address}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => makePhoneCall(item.phoneNumber)}
                  >
                    <Ionicons
                      name="ios-call"
                      size={24}
                      color="grey"
                      style={styles.phoneIcon}
                    />
                  </TouchableOpacity>
                </View>
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
    </ScrollView>
  );
};

const styles = {
  scrollViewStyle: {
    backgroundColor: "#fff",
  },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
    width: "100%",
    marginBottom: 60,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
    color: "#1E3EB3",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  subHeadingPlease: {
    fontSize: 20,
    color: "#008000",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  icon: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 16,
    marginTop: 90,
  },
  map: {
    width: "100%",
    height: 200,
    // marginBottom: 10,
  },
  contactContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 2,
  },
  contact: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    width: "100%",
  },
  textContainer: {
    alignSelf: "flex-end",
    marginRight: "auto",
  },
  headingg: {
    fontSize: 20,
    marginTop: 10,
    color: "#1E3EB3",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  subheading: {
    fontSize: 15,
    marginRight: 8,
  },
  phoneIcon: {
    marginLeft: "auto",
    marginTop: 55,
  },
};

export default AllContacts;
