import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  Linking,
  Platform,
} from "react-native";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import color from "../../styles/color"; // Ensure you have this color file or adjust accordingly
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

const MapWithButtons = () => {
  const [location, setLocation] = useState(null);
  const [currentLocationUrl, setCurrentLocationUrl] = useState("");
  const navigation = useNavigation();
  const [region, setRegion] = useState(null);

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Location permission denied");
      return;
    }
    getLocation();
  };

  async function pinLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    // Generate Google Maps URL
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    setCurrentLocationUrl(googleMapsUrl); // Save the URL in state
    console.log("location: ", location);
    console.log("Google Maps URL: ", googleMapsUrl);
  }

  const handlePress = (phoneNumber) => {
    if (Platform.OS === "android") {
      Linking.openURL(`tel:${phoneNumber}`);
    } else if (Platform.OS === "ios") {
      Linking.openURL(`telprompt:${phoneNumber}`);
    }
  };

  const sendLocationByEmail = async () => {
    await pinLocation();
    // Check if the current location URL is not set

    // Proceed to generate the email link now that currentLocationUrl is guaranteed to be set
    const email = "abdulwahab052001@gmail.com"; // Set the recipient email address here
    const subject = encodeURIComponent("My Current Location");
    const body = encodeURIComponent(
      "Here is my current location: " + currentLocationUrl
    );
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

    // Attempt to open the mail link
    Linking.openURL(mailtoLink).catch((err) =>
      console.error("Error opening mail app", err)
    );
  };

  // Use this function in a button onPress for example:
  <TouchableOpacity
    onPress={sendLocationByEmail}
    style={styles.sendEmailButton}
  >
    <Text style={styles.sendEmailButtonText}>Send Location by Email</Text>
  </TouchableOpacity>;

  const getLocation = async () => {
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} showsUserLocation={true} />
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.headingContainer}>
            <TouchableOpacity onPress={sendLocationByEmail}>
              <Image
                source={require("../../../src/assets/images/map.png")}
                style={styles.image}
              />
              <Text style={styles.heading}>Share Your Location</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet. Sed nec sem id ex ultricies auctor vel
            non urna.
          </Text>
          {/* Display the currentLocationUrl */}
          {currentLocationUrl ? (
            <View style={styles.urlContainer}>
              <Text style={styles.urlText}>Your current location URL:</Text>
              <Text
                style={styles.url}
                onPress={() => Linking.openURL(currentLocationUrl)}
              >
                Open in Maps
              </Text>
            </View>
          ) : null}
          {/* Other components */}
        </View>
        {/* Display and use the currentLocationUrl as needed here */}
        <View style={styles.buttonRow1}>
          <TouchableOpacity
            onPress={() => handlePress("15")}
            style={[styles.button, { backgroundColor: "red" }]}
          >
            <Text style={styles.buttonText}>Police</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePress("16")}
            style={[styles.button, { backgroundColor: "red" }]}
          >
            <Text style={styles.buttonText}>Fire</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow2}>
          <TouchableOpacity
            onPress={() => handlePress("115")}
            style={[styles.button, { backgroundColor: "red" }]}
          >
            <Text style={styles.buttonText}>Ambulance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePress("1098")}
            style={[styles.button, { backgroundColor: "red" }]}
          >
            <Text style={styles.buttonText}>Assault</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  backButtonContainer: {
    position: "absolute",
    top: 60, // Adjust top and left values as needed
    left: 15,
    zIndex: 10, // Ensure it's above other elements
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  image: {
    width: 70,
    height: 70,
    marginLeft: 50,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  paragraph: {
    textAlign: "center",
    marginBottom: 16,
  },
  buttonRow1: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
    height: 60,
  },
  buttonRow2: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 70,
    height: 60,
  },
  button: {
    width: 140,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
  urlContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  urlText: {
    marginBottom: 5,
    fontSize: 16,
  },
  url: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default MapWithButtons;
