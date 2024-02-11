import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const SOSComponent = () => {
  const navigation = useNavigation();
  const navigateTonewContact = () => {
    navigation.navigate('NewContact'); // Ensure 'MapWithButtons' is the name of your target screen
  };
  return (
    <View style={styles.container}>
      {/* Send SOS Heading on the top left */}
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
      <View style={styles.contactContainer}>
        <View style={styles.contact}>
          <View style={styles.textContainer}>
            <Text style={styles.headingg}>Contact Police Station</Text>
            <Text style={styles.subheading}>A2, Police station, headquarters</Text>
          </View>
          <TouchableOpacity onPress={() => console.log('Call Contact 1')}>
            <Ionicons name="ios-call" size={24} color="grey" style={styles.phoneIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.contact}>
          <View style={styles.textContainer}>
            <Text style={styles.headingg}>Relative 1</Text>
            <Text style={styles.subheading}>A2, Firsts, Karachi</Text>
          </View>
          <TouchableOpacity onPress={() => console.log('Call Contact 2')}>
            <Ionicons name="ios-call" size={24} color="grey" style={styles.phoneIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
    marginBottom: 20,
    marginTop: 0,
    
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    color: '#1E3EB3',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  subHeadingPlease: {
    fontSize: 20,
    color: '#008000',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 16,
    marginTop: 90,
  },
  map: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  contactContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  contact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
  },
  textContainer: {
    alignSelf: 'flex-end',
    marginRight: 'auto',
  },
  headingg: {
    fontSize: 20,
    marginTop: 40,
    color: '#1E3EB3',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  subheading: {
    fontSize: 15,
    marginRight: 8,
  },
  phoneIcon: {
    marginLeft: 'auto',
    marginTop: 55,
  },
};

export default SOSComponent;
