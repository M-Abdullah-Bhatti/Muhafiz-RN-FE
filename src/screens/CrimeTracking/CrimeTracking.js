// CrimeTracking.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 40.76711,
  longitude: -73.979704,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const InputAutoComplete = ({ placeholder, onPlaceSelected }) => {
  return (
    <>
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        placeholder={placeholder || ""}
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log("Autocomplete onPress triggered", details);
          onPlaceSelected(details);
        }}
        // onPress={(data, details = null) => console.log(data, details)}
        onFail={(error) => console.log(error)}
        onNotFound={() => console.log("no results")}
        query={{
          key: "AIzaSyBKX6FzffGaFn0xkKbx_jyRDN1UDPXzy30",
          language: "pt-BR",
        }}
      />
    </>
  );
};

const CrimeTracking = () => {
  const navigation = useNavigation();

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const mapRef = useRef(null);

  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const traceRouteOnReady = (args) => {
    console.log("args");
    console.log(args);
    if (args) {
      // args.distance
      // args.duration
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination]);
    }
  };

  const onPlaceSelected = (details, flag) => {
    console.log("onPlaceSelected");
    const set = flag === "origin" ? setOrigin : setDestination;
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    set(position);
    moveTo(position);
  };

  // ========

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       console.log("Location permission denied");
  //       return;
  //     }
  //     let location = await Location.getCurrentPositionAsync({
  //       accuracy: Location.Accuracy.High,
  //     });
  //     setRegion({
  //       ...region,
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //     });
  //   })();
  // }, []);

  // ===========

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
        ref={mapRef}
      />

      {origin && <Marker coordinate={origin} />}
      {destination && <Marker coordinate={destination} />}
      {showDirections && origin && destination && (
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey="AIzaSyBKX6FzffGaFn0xkKbx_jyRDN1UDPXzy30"
          strokeColor="#6644ff"
          strokeWidth={4}
          onReady={traceRouteOnReady}
        />
      )}

      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headingContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.image}
          />
          <Text style={styles.heading}>Track Crimes</Text>
        </View>
        <Text style={styles.paragraph}>
          You can track crime in a route which you want to follow and take
          necessary precautions!
        </Text>

        <ScrollView
          contentContainerStyle={styles.inputContainer}
          keyboardShouldPersistTaps="handled"
        >
          <InputAutoComplete
            placeholder="From"
            onPlaceSelected={(details) => {
              onPlaceSelected(details, "origin");
            }}
          />
          <InputAutoComplete
            placeholder="To"
            onPlaceSelected={(details) => {
              onPlaceSelected(details, "destination");
            }}
          />
        </ScrollView>

        <TouchableOpacity style={styles.searchButton} onPress={traceRoute}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
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
  backButtonContainer: {
    position: "absolute",
    top: 60, // Adjust top and left values as needed
    left: 15,
    zIndex: 10, // Ensure it's above other elements
  },
  contentContainer: {
    marginBottom: 50,
    paddingHorizontal: 16,
    // height: "40%",
    backgroundColor: "white",
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
    marginRight: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  paragraph: {
    textAlign: "center",
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "colum",
    backgroundColor: "#fff",
    marginBottom: 10,
    // justifyContent: "space-between",
    // marginBottom: 16,
  },
  input: {
    // flex: 1,
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    // marginRight: 8,
  },
  searchButton: {
    backgroundColor: "blue",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CrimeTracking;
