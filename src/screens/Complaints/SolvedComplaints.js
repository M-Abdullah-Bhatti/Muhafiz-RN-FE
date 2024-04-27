import React, { useState } from "react";
import { View, Image, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install expo vector icons
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { GetAllData } from "../../axios/NetworkCalls";
import { GetMyIncidents } from "../../configs/urls";
import RequestLoader from "../../component/Loader/RequestLoader";
import { Button } from "react-native-elements";


const SolvedComplaints = ({navigation}) => {
    const [complaints, setComplaints] = useState([
        { id: '1', title: 'Complaint regarding Snatching', resolved: false },
        { id: '2', title: 'Complaint regarding Theft', resolved: true },
        { id: '3', title: 'Complaint regarding Assault', resolved: false },
    ]);

    const [selectedTab, setSelectedTab] = useState('resolved');
    const handleTabPress = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <View style={styles.container}>
            {/* White Section */}

            <View style={styles.blueSection}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButtonContainer}
                >
                    <Ionicons name="arrow-back" size={30} color="white" />
                </TouchableOpacity>
                {/* <View style={styles.headerContainer}>
              <Text style={styles.MainHeading}>Case Assessment</Text>
            </View> */}

                <View style={styles.roundedBox}>
                    <Image
                        source={require(" ../../../src/assets/images/sindhpolice.png")}
                        style={styles.icon}
                    />
                    <View style={styles.statsContainer}>
                        <View style={[styles.statBox, { flex: 1 }]}>
                            <View style={[styles.line, styles.yellowLine]} />
                            <Text style={styles.statNumber}>3</Text>
                            <Text style={styles.statLabel}>Complaint Box</Text>
                        </View>
                        <View style={[styles.statBox, { flex: 1 }]}>
                            <View style={[styles.line, styles.purpleLine]} />
                            <Text style={styles.statNumber}>99</Text>
                            <Text style={styles.statLabel}>Complaints</Text>
                        </View>
                        <View style={[styles.statBox, { flex: 1 }]}>
                            <View style={[styles.line, styles.blueLine]} />
                            <Text style={styles.statNumber}>56</Text>
                            <Text style={styles.statLabel}>Resolved Complaints</Text>
                        </View>

                    </View>
                </View>



            </View>

            <View style={styles.whiteSection}>
                {/* toggle between resolved and unresolved complaints */}
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        onPress={() => handleTabPress('resolved')}
                        style={[
                            styles.toggleButton,
                            selectedTab === 'resolved' && styles.toggleButtonActive,
                        ]}
                    >
                        <Text
                            style={[
                                styles.toggleButtonText,
                                selectedTab === 'resolved' && styles.toggleButtonTextActive,
                            ]}
                        >
                            Resolved Complaints
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleTabPress('unresolved')}
                        style={[
                            styles.toggleButton,
                            selectedTab === 'unresolved' && styles.toggleButtonActive,
                        ]}
                    >
                        <Text
                            style={[
                                styles.toggleButtonText,
                                selectedTab === 'unresolved' && styles.toggleButtonTextActive,
                            ]}
                        >
                            Unresolved Complaints
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* List of complaints */}
                <FlatList
  data={selectedTab === 'resolved' ? complaints.filter(c => c.resolved) : complaints.filter(c => !c.resolved)}
  keyExtractor={item => item.id}
  renderItem={({ item }) => (
    <View style={styles.complaintItem}>
      <Text style={styles.complaintText}>{item.title}</Text>
      {/* Add any additional elements for each complaint here */}
      <Button
                                title="View"
                                type="clear"
                                onPress={() => {navigation.navigate('ComplaintBoxInfo', {complaint: item})}}
                                buttonStyle={styles.viewButton}
                                titleStyle={styles.viewButtonText}
                            />
    </View>
  )}
  style={styles.complaintList}
/>

                <TouchableOpacity
                    style={styles.button}
                //  
                >
                    <Text style={styles.buttonText}>Proceed</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E3EB3",
    },
    backButtonContainer: {
        right: 160,
        top: -25,
    },
    whiteSection: {
        flex: 1,
        backgroundColor: "#1E3EB3",
        justifyContent: "center",
        alignItems: "center",
    },
    viewButton: {
        alignSelf: 'flex-end', // Position button at the end of the container
        marginRight: 10, // Add some margin to the right for spacing
    },
    viewButtonText: {
        color: '#1E3EB3', // Same as the primary color for visual consistency
    },
    
    blueSection: {

        flex: 1,
        backgroundColor: "#29397A",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },
    statsContainer: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    statBox: {
        alignItems: 'center',
        margin: 10,
        padding: 5, // This will allow space for the line above the stats
        backgroundColor: '#1E3EB3', // Semi-transparent white for the "lifted" effect
        borderRadius: 10, // Rounded corners
        shadowColor: '#000', // Black color for the shadow
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // This is for Android shadow
    },
    line: {
        height: 2, // Thickness of the line
        width: '50%', // Full width of the stat box
        borderRadius: 2, // Rounded edges of the line
        position: 'absolute', // Position it absolutely within the statBox
        top: 0, // At the very top of the statBox
    },
    // You would add a specific style for each color line like this:
    yellowLine: {
        backgroundColor: '#C98B91', // Yellow color
    },
    purpleLine: {
        backgroundColor: '#8C6ADE', // Purple color
    },
    blueLine: {
        backgroundColor: '#68CDD1', // Blue color
    },

    statNumber: {
        fontWeight: 'bold',
        fontSize: 18,
        color: "white",
    },
    statLabel: {
        color: "white",
        fontSize: 14,
    },
    whiteHeading: {
        fontSize: 24,
        color: "blue",
        marginBottom: 10,
    },
    whiteText: {
        fontSize: 16,
        textAlign: "left",
        marginHorizontal: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
    roundedBox: {
        justifyContent: "center",
        alignItems: "center",
    },
    blueHeading: {
        fontSize: 20,
        color: "blue",
        marginBottom: 10,
    },
    blueText: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25, // Adjust as needed for your design
    },
    toggleButtonActive: {
        backgroundColor: 'white', // This is the color for the active state
    },
    toggleButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white', // This color is for inactive state
    },
    toggleButtonTextActive: {
        color: '#1E3EB3', // This color is for the active state text, which is the blue background color
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: 'black', // This should be the same as the toggleButtonActive background color
        borderRadius: 25,
        marginHorizontal: 10,
        marginTop:30,
        borderColor: 'white', // Border color
        overflow: 'hidden', // Ensures that the button's background color doesn't bleed out of the container's rounded corners
    },
    complaintList: {
        width: '100%',
        // If you want padding around the list, add it here
      },
      complaintItem: {
        backgroundColor: 'white', // White background for the list items
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10, // Rounded corners for the list items
        shadowColor: '#000', // Shadow color
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Elevation for Android shadow
      },
      complaintText: {
        color: '#1E3EB3', // Text color that contrasts the background of the item
        fontSize: 16, // Adjust the size as needed
        // Add any other text styling here
        width: '80%', // Adjust the width as needed
      },
      

});



export default SolvedComplaints;
