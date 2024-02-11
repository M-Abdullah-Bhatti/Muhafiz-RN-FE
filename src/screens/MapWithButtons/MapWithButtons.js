import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Platform } from 'react-native';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo vector icons
import color from '../../styles/color';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

const MapWithButtons = () => {
  const navigation = useNavigation();
  const [region, setRegion] = useState(null);

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
  
  
  return (
    <View style={styles.container}>
      <MapView
  style={styles.map}
  region={region}
  showsUserLocation={true}
/>
       {/* <MapView
        style={styles.map}
        initialRegion={{
          latitude: 24.8607,
    longitude: 67.0011,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
        }}
      /> */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headingContainer}>
          <Image source={require('../../../src/assets/images/map.png')} style={styles.image} />
          <Text style={styles.heading}>Share Your Location</Text>
        </View>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit hashir shahzad. Sed nec sem id ex ultricies auctor vel non urna.
        </Text>
        <View style={styles.buttonRow1}>
          <TouchableOpacity
            onPress={() => console.log('Button 1 pressed')}
            style={[styles.button, { backgroundColor: 'red' }]}
          >
            <Text style={styles.buttonText}>Police</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('Button 2 pressed')}
            style={[styles.button, { backgroundColor: 'red' }]}
          >
            <Text style={styles.buttonText}>Fire</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow2}>
          <TouchableOpacity
            onPress={() => console.log('Button 3 pressed')}
            style={[styles.button, { backgroundColor: 'red' }]}
          >
            <Text style={styles.buttonText}>Ambulance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('Button 4 pressed')}
            style={[styles.button, { backgroundColor: 'red' }]}
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
    position: 'absolute',
    top: 60, // Adjust top and left values as needed
    left: 15,
    zIndex: 10, // Ensure it's above other elements
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
  buttonRow1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    height: 60,
  },
  buttonRow2: {
    flexDirection: 'row',
    justifyContent: 'space-around' ,
    alignItems: 'center',
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
    color: 'black',
    textAlign: 'center',
  },
});

export default MapWithButtons;
