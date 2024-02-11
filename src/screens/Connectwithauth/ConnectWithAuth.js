// ConnectWithAuth.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo vector icons
import color from '../../styles/color';





const ConnectWithAuth = () => {

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
      <Text style={styles.header}>Connect With Authorities</Text>
      <View style={styles.buttoncontainer}>
        {/* Three Grey Buttons */}
        <TouchableOpacity style={styles.button} onPress={navigateToReportAnIncident}>
          {/* Icon and Text Container */}
          <View style={styles.iconTextContainer}>
            {/* Icon */}
            <Image source={require(' ../../../src/assets/images/sindhpolice.png')} style={styles.icon} />
            {/* Text */}
            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>Sindh Police Station</Text>
              <Text style={styles.subheading}>SOS: 15</Text>
              <Text style={styles.buttonText}>Address: Plot No.PS-11 </Text>
              <Text style={styles.buttonText}>Khyaban-e-Rashid </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToReportAnIncident}>
          <View style={styles.iconTextContainer}>
            <Image source={require('../../../src/assets/images/edhi.png')} style={styles.icon} />
            <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Edhi Ambulance</Text>
              <Text style={styles.subheading}>SOS: 115</Text>
              <Text style={styles.buttonText}>Address: Plot No.PS-3  </Text>
              <Text style={styles.buttonText}>Khyaban-e-Farid </Text>
              
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToReportAnIncident}>
          <View style={styles.iconTextContainer}>
            <Image source={require('../../../src/assets/images/sindhrescue.png')} style={styles.icon} />
            <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Sindh Rescue Pakistan </Text>
              <Text style={styles.subheading}>SOS: 1122</Text>
              <Text style={styles.buttonText}>Address: Plot No.PS-11 </Text>
              <Text style={styles.buttonText}>Khyaban-e-Rashid </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToReportAnIncident}>
          <View style={styles.iconTextContainer}>
            <Image source={require('../../../src/assets/images/nationalhelpline.png')} style={styles.icon} />
            <View style={styles.textContainer}>
            <Text style={styles.buttonText}>National Helpline</Text>
              <Text style={styles.subheading}>SOS: 1098</Text>
              <Text style={styles.buttonText}>Address: Plot No.PS-11 </Text>
              <Text style={styles.buttonText}>Khyaban-e-Rashid </Text>
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
  header: {
    color: color.maincolor,
    marginTop: 30,
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 70,
    marginHorizontal: 20,
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
    
  },
  button: {
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 0,
    paddingVertical: 20,
    paddingTop: 10,
    paddingHorizontal: 30,
    marginVertical: 20,
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft:20,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  textContainer: {
    justifyContent: 'right',
    alignItems: 'Center',
    marginLeft: 10,
  },
  icon: {
    width: 54,
    height: 54,

  },
  subheading: {
    marginLeft:40,
    fontSize: 14,
    color: color.maincolor,
  },
});

export default ConnectWithAuth;
