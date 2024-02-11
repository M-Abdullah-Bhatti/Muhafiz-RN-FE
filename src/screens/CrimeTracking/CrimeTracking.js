// CrimeTracking.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const CrimeTracking = () => {
  const navigation = useNavigation();
  const [region, setRegion] = useState(null);
  const [fromRoute, setFromRoute] = useState('');
  const [toRoute, setToRoute] = useState('');

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("Location permission denied");
      return;
    }
    getLocation();
  };

  const getLocation = async () => {
    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
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

  const handleSearch = () => {
    // Implement your search logic here
    console.log(`Searching from ${fromRoute} to ${toRoute}`);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
      />
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headingContainer}>
          <Image source={require('../../assets/images/logo.png')} style={styles.image} />
          <Text style={styles.heading}>Track Crimes</Text>
        </View>
        <Text style={styles.paragraph}>
          You can track crime in a route which you want to follow and take necessary precautions!
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="From"
            value={fromRoute}
            onChangeText={(text) => setFromRoute(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="To"
            value={toRoute}
            onChangeText={(text) => setToRoute(text)}
          />
        </View>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
        >
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
    position: 'absolute',
    top: 60, // Adjust top and left values as needed
    left: 15,
    zIndex: 10, // Ensure it's above other elements
  },
  contentContainer: {
    marginBottom: 94,
    paddingHorizontal: 16,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  paragraph: {
    textAlign: 'center',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: 'blue',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    
  },
});

export default CrimeTracking;
