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
  ScrollView,
  Alert,
} from "react-native";
// import { ScrollView } from "react-native-virtualized-view";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import MapViewDirections from "react-native-maps-directions";
import InputAutoComplete from "../../component/Shared/InputAutoComplete";
import { GetAllData } from "../../axios/NetworkCalls";
import { GetAllPostsEndPoint } from "../../configs/urls";

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

const CrimeTracking = () => {
  const navigation = useNavigation();

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const mapRef = useRef(null);

  const [data, setData] = useState([]);

  // ==============

  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const traceRouteOnReady = (args) => {
    if (args) {
      // args.distance
      // args.duration
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  const traceRoute = () => {
    if (!origin || !destination) {
      Alert.alert(
        "Missing Information",
        "Please specify both source and destination"
      );
      return;
    }

    if (origin && destination) {
      setShowDirections(true);
      // mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });

      // Collect all coordinates you want to fit in the map view
      let coordinates = [origin, destination];
      const nearbyMarkers = filterMarkersNearRoute(); // Assuming this returns the markers you want to include

      // Combine the initial coordinates with the markers' coordinates
      coordinates = coordinates.concat(
        nearbyMarkers.map((marker) => ({
          latitude: marker.latitude,
          longitude: marker.longitude,
        }))
      );
      // Fit all relevant coordinates in the map view
      mapRef.current?.fitToCoordinates(coordinates, { edgePadding });
    }
  };

  const onPlaceSelected = (details, flag) => {
    // console.log("details===========");
    // console.log(details);

    const set = flag === "origin" ? setOrigin : setDestination;

    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    set(position);
    moveTo(position);
  };

  // ================

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const response = await GetAllData(`${GetAllPostsEndPoint}`);

          console.log("response?.data-------");
          console.log(response?.data);

          if (response.success) {
            setData(response?.data);
          } else {
            setError(response?.message);
          }
        } catch (err) {
          setError(err?.message);
        }
      };

      getData();
    }, [])
  );

  const filterMarkersNearRoute = () => {
    const threshold = 5; // Define how close markers need to be to the route (in degrees)
    if (data && data.length > 0) {
      return data.filter((marker) => {
        // Example simple check: marker is within threshold degrees of both origin and destination
        return (
          Math.abs(marker.latitude - origin.latitude) <= threshold &&
          Math.abs(marker.longitude - origin.longitude) <= threshold &&
          Math.abs(marker.latitude - destination.latitude) <= threshold &&
          Math.abs(marker.longitude - destination.longitude) <= threshold
        );
      });
    }
  };

  // ==============

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        // showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
        ref={mapRef}
      >
        {origin && <Marker coordinate={origin} pinColor={"red"} />}
        {destination && <Marker coordinate={destination} pinColor={"red"} />}
        {showDirections && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey="AIzaSyBKX6FzffGaFn0xkKbx_jyRDN1UDPXzy30"
            strokeWidth={4}
            strokeColor="#ff0000" // Set the color to red
            onReady={traceRouteOnReady}
            onError={(errorMessage) => {
              console.error("GOT AN ERROR", errorMessage);
            }}
          />
        )}

        {origin &&
          destination &&
          data &&
          data.length > 0 &&
          filterMarkersNearRoute().map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              pinColor={"red"} // different color for crime markers
            />
          ))}
      </MapView>

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
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="always"
        >
          <InputAutoComplete
            styling={{
              width: "100%",
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 10,
              backgroundColor: "transparent",
            }}
            placeholder="From"
            onPlaceSelected={(details) => {
              onPlaceSelected(details, "origin");
            }}
          />
          <InputAutoComplete
            styling={{
              width: "100%",
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 10,
              backgroundColor: "transparent",
            }}
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
