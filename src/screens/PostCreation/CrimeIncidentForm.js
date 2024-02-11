import React, { useState } from 'react';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CrimeIncidentForm = ({ onSubmit }) => {
  const [incidentDetails, setIncidentDetails] = useState('');
  const [image, setImage] = useState(null);

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const submitCrimeReport = () => {
    // Implement the logic to submit the crime report with incidentDetails and image URI.
    // You can send this data to your backend or handle it as per your application's requirements.
    console.log('Incident Details:', incidentDetails);
    console.log('Image URI:', image);

    // Pass the data to the parent component
    onSubmit({ incidentDetails, image });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter details of the incident..."
        multiline
        onChangeText={(text) => setIncidentDetails(text)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { marginRight: 8 }]} onPress={pickImageFromGallery}>
          <Text style={styles.buttonText}>Pick Image from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { marginLeft: 8 }]} onPress={takePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
      </View>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Upload" onPress={submitCrimeReport} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9F0FF',
    justifyContent: 'center',
    alignItems: 'left',
    padding: 16,
    marginTop: 0, // Add spacing from the top
    paddingBottom: 220,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%',
  },
  button: {
    backgroundColor: '1E3EB3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default CrimeIncidentForm;