// CrimeReportScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo vector icons





const CrimeReportScreen = () => {

  const navigation = useNavigation();

  const navigateToReportAnIncident = () => {
    navigation.navigate('ReportAnIncident'); // Ensure 'MapWithButtons' is the name of your target screen
  };

  
  return (
    
    <View style={styles.container}>
      {/* Your content here */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttoncontainer}>
        {/* Three Grey Buttons */}
        <TouchableOpacity style={styles.button} onPress={navigateToReportAnIncident}>
          {/* Icon and Text Container */}
          <View style={styles.iconTextContainer}>
            {/* Icon */}
            <Image source={require(' ../../../src/assets/images/mask.png')} style={styles.icon} />
            {/* Text */}
            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>Theft</Text>
              <Text style={styles.subheading}>Criminal Emergency</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToReportAnIncident}>
          <View style={styles.iconTextContainer}>
            <Image source={require('../../../src/assets/images/gun.png')} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>Robbery</Text>
              <Text style={styles.subheading}>Snatching/burglary</Text>
              
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToReportAnIncident}>
          <View style={styles.iconTextContainer}>
            <Image source={require('../../../src/assets/images/bully.png')} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>Assault</Text>
              <Text style={styles.subheading}>Abuse/Harassment</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToReportAnIncident}>
          <View style={styles.iconTextContainer}>
            <Image source={require('../../../src/assets/images/phishing.png')} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>Cyber crime</Text>
              <Text style={styles.subheading}>phishing/ Spoofing</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      {/* <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity> */}

      {/* Cancel Button */}
      {/* <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonContainer: {
    top:-30,
    left: 20,
    position: 'absolute',
  },
  submitButton: {
    backgroundColor: 'blue',
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 30,
    alignSelf: 'center',
    marginBottom: 120,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: 'white',
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 50,
    paddingHorizontal: 30,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'black',
    fontSize: 16,
  },
  buttoncontainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    paddingVertical: 20,
    paddingTop: 20,
    paddingHorizontal: 50,
    marginVertical: 30,
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 34,
    marginRight: 10,
  },
  subheading: {
    fontSize: 14,
    color: 'gray',
  },
});

export default CrimeReportScreen;
