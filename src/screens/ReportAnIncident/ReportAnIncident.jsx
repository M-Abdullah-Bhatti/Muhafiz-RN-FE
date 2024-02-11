import * as React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import color from '../../styles/color';
import { useNavigation } from '@react-navigation/native'; 

const ReportAnIncident = () => {
  const [name, setName] = React.useState('');
  const [date, setDate] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [description, setDescription] = React.useState('');
  const navigation = useNavigation();

  // Handlers for the form inputs could be added here
  const navigateToCaseAssessment = () => {
    navigation.navigate('CaseAssessment'); // Ensure 'MapWithButtons' is the name of your target screen
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View>
        <Text style={styles.header}>Report an Incident</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Enter your name"
          />
          {/* You can add icons or buttons here */}
        </View>

        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date and time of the incident</Text>
            <TextInput
              style={styles.input}
              onChangeText={setDate}
              value={date}
              placeholder="Select date and time"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              onChangeText={setLocation}
              value={location}
              placeholder="Enter location"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description of the incident</Text>
          <TextInput
            style={styles.descriptionInput}
            onChangeText={setDescription}
            value={description}
            placeholder="Describe the incident"
            multiline
          />
        </View>

        {/* Add buttons or TouchableOpacity for Gallery and Camera here */}
        <TouchableOpacity style={styles.button} onPress={navigateToCaseAssessment}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButtonContainer: {
    top: 30, // Adjust top and left values as needed
    marginBottom: 20,
  },
  container: {
    padding: 16,
  },
  header: {
    color: color.maincolor,
    marginTop: 30,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
  },
  descriptionInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    height: 150, // Adjust the height for multiline input
    textAlignVertical: 'top', // Align text to the top for Android
  },
  button: {
    backgroundColor: color.maincolor,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ReportAnIncident;
