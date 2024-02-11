import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import Header from "../../component/Header";
import color from "../../styles/color";

const Emergency = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const navigation = useNavigation();

  const navigateToMapWithButtons = () => {
    navigation.navigate("MapWithButtons"); // Ensure 'MapWithButtons' is the name of your target screen
  };

  const navigateToCreateAPost = () => {
    navigation.navigate("CreateAPost"); // Ensure 'MapWithButtons' is the name of your target screen
  };

  const navigateToCimeTracking = () => {
    navigation.navigate("CrimeTracking"); // Ensure 'MapWithButtons' is the name of your target screen
  };

  const navigateToCrimeReportScreen = () => {
    navigation.navigate("CrimeReportScreen"); // Ensure 'MapWithButtons' is the name of your target screen
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header screen={"Home"} />
      <View style={styles.container}>
        <TouchableOpacity onPress={navigateToMapWithButtons}>
          <LinearGradient
            colors={["#FA5D6A", "#DA1B2B"]}
            style={styles.gradientContainer}
          >
            <Text style={styles.topLeftText}>Nearest Police Station</Text>
            <Text style={styles.middleText}>
              Plot No.PS-1 Khyaban-e-Razwan Phase No.7 Ext DHA Main Korangi Road
              Karachi.
            </Text>
            <View style={styles.emergencyContainer}>
              <Text style={styles.bottomRightText}>Emergency</Text>
              <Image
                source={require("../../../src/assets/images/siren.png")} // replace with the path to your image
                style={styles.image}
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToCrimeReportScreen}>
          <View style={styles.customView}>
            <Text style={styles.customViewHeading}>Report an Incident</Text>
            <Text style={styles.customViewText}>
              Report incidents happening around you to the nearest police
              stations or prescient close to you. Remember, the police is here
              to help you.
            </Text>
            <Image
              source={require("../../../src/assets/images/police.png")}
              style={styles.policeimage}
            />
          </View>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={navigateToCreateAPost}
        >
          <Text style={styles.buttonText}>Create A Post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={navigateToCimeTracking}
        >
          <Text style={styles.buttonText}>Search for Crime</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.bottomNavigation}>
          <TouchableOpacity style={styles.navButton}>
            <Image
              source={require('../../../src/assets/images/police.png')} // replace with the path to your image
              style={styles.navIcon}
            />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Image
              source={require('../../../src/assets/images/police.png')} // replace with the path to your image
              style={styles.navIcon}
            />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Image
              source={require('../../../src/assets/images/police.png')} // replace with the path to your image
              style={styles.navIcon}
            />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Image
              source={require('../../../src/assets/images/police.png')} // replace with the path to your image
              style={styles.navIcon}
            />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          
        </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    marginTop: 30,
  },
  gradientContainer: {
    borderRadius: 15,
    margin: 16,
    padding: 16,
    justifyContent: "space-between",
  },
  topLeftText: {
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  middleText: {
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    marginHorizontal: 30,
    marginTop: 20,
  },
  emergencyContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
  bottomRightText: {
    marginRight: 8, // Adds some space between the text and the image
    fontWeight: "bold",
  },
  image: {
    width: 30, // replace with your image's width
    height: 30, // replace with your image's height
  },
  customView: {
    backgroundColor: "#E9F0FF",
    borderRadius: 15,
    margin: 16,
    padding: 10,
    textAlign: "center", // Centers content horizontally
    justifyContent: "center", // Centers content vertically
    paddingBottom: 0, // Adds some space between the bottom edge and the content
  },
  customViewHeading: {
    textAlign: "center", // Centers text horizontally
    fontWeight: "bold",
    fontSize: 18,
  },
  customViewText: {
    textAlign: "center", // Centers text horizontally
    marginTop: 30, // Adds some space between the heading and the text
    marginHorizontal: 30, // Adds some space between the left and right edges
  },
  policeimage: {
    marginLeft: 20,
    marginTop: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 10,
    marginBottom: 80,
  },
  actionButton: {
    backgroundColor: color.maincolor,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  navButton: {
    alignItems: "center",
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  navText: {
    fontSize: 12,
  },
});

export default Emergency;
