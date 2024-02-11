import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';

const data = [
  { id: 1, name: 'Item 1', crime: 'Theft', recoveredItems: 'Jewelry', location: 'Street' },
  { id: 2, name: 'Item 2', crime: 'Vandalism', recoveredItems: 'Electronics', location: 'Park' },
  { id: 3, name: 'Item 1', crime: 'Theft', recoveredItems: 'Jewelry', location: 'Street' },
  { id: 4, name: 'Item 2', crime: 'Vandalism', recoveredItems: 'Electronics', location: 'Park' }, { id: 10, name: 'Item 1', crime: 'Theft', recoveredItems: 'Jewelry', location: 'Street' },
  { id: 5, name: 'Item 2', crime: 'Vandalism', recoveredItems: 'Electronics', location: 'Park' }, { id: 11, name: 'Item 1', crime: 'Theft', recoveredItems: 'Jewelry', location: 'Street' },
  { id: 6, name: 'Item 2', crime: 'Vandalism', recoveredItems: 'Electronics', location: 'Park' }, { id: 12, name: 'Item 1', crime: 'Theft', recoveredItems: 'Jewelry', location: 'Street' },
  { id: 7, name: 'Item 2', crime: 'Vandalism', recoveredItems: 'Electronics', location: 'Park' }, { id: 13, name: 'Item 1', crime: 'Theft', recoveredItems: 'Jewelry', location: 'Street' },
  { id: 8, name: 'Item 2', crime: 'Vandalism', recoveredItems: 'Electronics', location: 'Park' }, { id: 14, name: 'Item 1', crime: 'Theft', recoveredItems: 'Jewelry', location: 'Street' },
  { id: 9, name: 'Item 2', crime: 'Vandalism', recoveredItems: 'Electronics', location: 'Park' },
  // Add more items as needed
];

const CheckList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Items Found This Month</Text>

      <View style={styles.row}>
        <Text style={styles.column}>Checklist</Text>
        <Text style={styles.column}>Name</Text>
        <Text style={styles.column}>Crime</Text>
        <Text style={styles.column}>Recovered Items</Text>
        <Text style={styles.column}>Location</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {data.map((item) => (
          <View key={item.id} style={styles.row}>
            <CheckBox checked={false} />
            <Text style={styles.column}>{item.name}</Text>
            <Text style={styles.column}>{item.crime}</Text>
            <Text style={styles.column}>{item.recoveredItems}</Text>
            <Text style={styles.column}>{item.location}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 60,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
  },
  column: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
};

export default CheckList;