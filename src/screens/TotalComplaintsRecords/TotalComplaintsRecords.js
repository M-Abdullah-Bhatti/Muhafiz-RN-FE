import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShieldAlt, faBolt, faHandHoldingMedical } from '@fortawesome/free-solid-svg-icons';

const data = [
  { 
    department: 'POLICE Department',
    total: 114,
    left: 24,
    solved: 90,
    icon: faShieldAlt,
    color: '#007AFF'
  },
  { 
    department: 'ASSAULT Department',
    total: 56,
    left: 6,
    solved: 50,
    icon: faBolt,
    color: '#34C759'
  },
  { 
    department: 'sindh rescue Department',
    total: 64,
    left: '$375 left to spend',
    solved: 23,
    icon: faHandHoldingMedical,
    color: '#AF52DE'
  },
];

const TotalComplaintsRecords = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Complaint Boxes</Text>

      {/* Gauge Chart Placeholder */}
      <View style={styles.chartContainer}>
        <Image
          source={require('../../../src/assets/images/chart.png')}
          style={styles.profileImage} 
        />
        <Text style={styles.chartText}>Total 234 Complaints</Text>
      </View>

      {/* Complaint List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.department}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => {navigation.navigate('SolvedComplaints', {department: item.department})}}
          >
            <FontAwesomeIcon icon={item.icon} size={24} style={{ color: item.color }} />
            <View style={styles.textContainer}>
              <Text style={styles.departmentName}>{item.department}</Text>
              <Text style={styles.complaintText}>{item.total} Total</Text>
              <Text style={styles.leftToSolveText}>{item.left} left to solve</Text>
              <Text style={styles.solvedText}>{item.solved} Solved</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
    marginTop: 60,
  },
  chartContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 200,
    height: 100,
    marginBottom: 80,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
  },
  departmentName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  complaintText: {
    color: '#fff',
    fontSize: 16,
  },
  chartText: {
    color: '#fff',
    fontSize: 16,
  },
  leftToSolveText: {
    color: '#FF3B30',
    fontSize: 16,
  },
  solvedText: {
    color: '#34C759',
    fontSize: 16,
  },
});

export default TotalComplaintsRecords;
