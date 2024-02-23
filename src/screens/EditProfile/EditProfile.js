import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

const EditProfile = () => {
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

          <Text style={styles.profileTitle}>Edit Profile</Text>
          <View></View>
        </View>
        {/* Rounded Image */}
        <View style={styles.editImageContainer}>
          <View style={styles.roundedImageContainer}>
            <Image
              source={require("../../assets/images/otpAvatar.png")}
              style={styles.roundedImage}
            />
          </View>
          <Text>Change Picture</Text>
        </View>
      </View>

      {/* Bottom View */}
      <View style={styles.bottomView}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter your username"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email I'd</Text>
          <TextInput style={styles.inputField} placeholder="Enter your email" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter your password"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter your phone number"
          />
        </View>
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
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
  editImageContainer: {
    position: "absolute",
    bottom: -50,
    left: "40%",
    overflow: "hidden",
  },
  roundedImageContainer: {
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom: 8,
  },
  roundedImage: {
    width: 90,
    height: 90,
  },
  bottomView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 14,

    color: "#000",
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: "#000",
    borderRadius: 5,
    marginTop: 40,
    paddingVertical: 12,
    width: "80%",
    alignItems: "center",
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default EditProfile;
