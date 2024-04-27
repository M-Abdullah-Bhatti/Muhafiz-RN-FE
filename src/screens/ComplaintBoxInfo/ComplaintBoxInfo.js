import React from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Platform } from 'react-native';

const ComplaintBoxInfo = () => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Complaint Box info</Text>
        <Image
          source={require('../../../src/assets/images/delete.png')}
          style={styles.profileImageDelete}
          onPress={() => {}}
        />
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../../../src/assets/images/sindhpolice.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileLabel}>Police Department</Text>
      </View>

      {/* Form Section */}
      <View style={styles.formSection}>
        <ListItem label="Name" value="Talal bin naveed" />
        <ListItem label="Description" value="This Complaint Bo..." />
        <ListItem label="Category" value="Snatching" />
        <ListItem label="Password" value="" secure />
        <ListItem label="Phone number" value="03124048901" />
      </View>

      {/* Action Buttons */}
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Call</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>solved</Text>
      </TouchableOpacity>
    </View>
  );
};

const ListItem = ({ label, value, secure }) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemLabel}>{label}</Text>
      <TextInput
        value={value}
        style={styles.itemInput}
        editable={false}
        secureTextEntry={secure}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Replace with appropriate color
  },
  header: {
    alignItems: 'center',
    padding: 20,
    marginTop: 39,
  },
  headerText: {
    color: '#fff', // Replace with appropriate color
    fontSize: 24,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileImageDelete: {
    width: 20,
    height: 20,
    marginLeft: 320,
  },
  profileLabel: {
    color: '#fff', // Replace with appropriate color
    marginTop: 10,
  },
  formSection: {
    marginVertical: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222', // Replace with appropriate color
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
  },
  itemLabel: {
    color: '#fff', // Replace with appropriate color
    fontSize: 18,
  },
  itemInput: {
    color: '#fff', // Replace with appropriate color
    fontSize: 18,
  },
  button: {
    backgroundColor: '#1E3EB3', // Replace with appropriate color
    padding: 8, // Adjust the padding to decrease height and width
    borderRadius: 20,
    marginVertical: 10,
    alignItems: 'center',
    // Shadow for iOS
    ...Platform.select({
      ios: {
        shadowColor: 'yellow',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      // Elevation for Android
      android: {
        elevation: 5,
      },
    }),
  },
  buttonText: {
    color: '#fff', // Replace with appropriate color
    fontSize: 18,
  },
});

export default ComplaintBoxInfo;
