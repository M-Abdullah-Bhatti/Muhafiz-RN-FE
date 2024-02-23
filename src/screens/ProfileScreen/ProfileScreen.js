import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Top View */}
      <View style={styles.topView}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              source={require("../../assets/images/arrow-left.png")}
              //   style={styles.roundedImage}
            />
          </TouchableOpacity>

          <Text style={styles.profileTitle}>Profile</Text>
          <View></View>
        </View>
        {/* Rounded Image */}
        <View style={styles.roundedImageContainer}>
          <Image
            source={require("../../assets/images/otpAvatar.png")}
            style={styles.roundedImage}
          />
        </View>
      </View>

      {/* Bottom View */}
      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditProfile");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        {/* Heading */}
        <Text style={styles.heading}>My Profile</Text>
        {/* Links */}
        <View style={styles.linksContainer}>
          {/* Link 1 */}
          <View style={styles.linkItem}>
            <Text>All Incidents</Text>
            {/* Right Arrow Icon */}
            <Image source={require("../../assets/images/right-arrow.png")} />
          </View>
          {/* Link 2 */}
          <View style={styles.linkItem}>
            <Text>All Posts</Text>
            {/* Right Arrow Icon */}
            <Image source={require("../../assets/images/right-arrow.png")} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topView: {
    flexDirection: "row",
    backgroundColor: "#1E3EB3",
    height: "25%",

    paddingHorizontal: 20,
    // justifyContent: "space-between",
    paddingTop: 40,
    alignItems: "start",
  },
  backButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "start",
  },
  backButton: {},
  profileTitle: {
    color: "#fff",
    fontSize: 20,
    marginRight: 35,
  },
  roundedImageContainer: {
    position: "absolute",
    bottom: -30,
    left: "40%",

    borderRadius: 50,
    overflow: "hidden",
    borderRadius: 45,
    borderWidth: 4,
    borderColor: "#fff",
  },
  roundedImage: {
    width: 90,
    height: 90,
  },
  bottomView: {
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
    marginHorizontal: "auto",
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  heading: {
    marginTop: 30,
    fontSize: 18,
    textAlign: "left", // Align text to the left
    marginBottom: 20,
  },
  linksContainer: {
    width: "90%",
    flex: 1,
    gap: 15,
  },
  linkItem: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default ProfileScreen;
