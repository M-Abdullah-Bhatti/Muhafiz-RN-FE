import React, { useState } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { GetAllData } from "../../axios/NetworkCalls";
import usePagination from "../../utils/usePagination";
import Pagination from "../../component/Shared/Pagination";
import RequestLoader from "../../component/Loader/RequestLoader";
import Header from "../../component/Header";

const SOSComponent = () => {
  const paginate = usePagination(1, 2);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(null);
  const [error, setError] = useState(null);

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
            `/contact/getAllMyContacts?page=${currentPage}&contactsPerPage=${2}`
          );

          if (response.success) {
            console.log(response?.data);
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
    <View style={styles.container}>
      {/* Send SOS Heading on the top left */}
      <Header screen={"Home"} />

      <Text style={styles.heading}>Send SOS</Text>
      <Text style={styles.subHeadingPlease}>Please Stay Calm</Text>

      {/* Icon on the top right */}
      <TouchableOpacity onPress={navigateTonewContact} style={styles.icon}>
        <Ionicons name="person-add-outline" size={30} color="black" />
      </TouchableOpacity>

      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825, // Replace with the actual latitude of your location
          longitude: -122.4324, // Replace with the actual longitude of your location
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Marker for the map */}
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }} // Replace with the actual coordinates of your location
          title="Your Location"
          description="SOS Sent"
        />
      </MapView>
      {/* Contacts */}
      {loading ? (
        <RequestLoader size="large" />
      ) : // </div>
      data.length === 0 ? (
        <Text>{error}</Text>
      ) : (
        <>
          <View style={styles.contactContainer}>
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
          {totalData && totalData > 2 && (
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

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
    marginBottom: 20,
    marginTop: 0,
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
    marginTop: 20,
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
    marginTop: 40,
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

export default SOSComponent;
