import { useNavigation, useFocusEffect } from "@react-navigation/core";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { GetAllData, PostData } from "../../axios/NetworkCalls";
import RequestLoader from "../../component/Loader/RequestLoader";
import TextInputField from "../../component/TextInputField";
import userValidation from "../../utils/validations/userValidation";
import { ShowError } from "../../utils/flashMessages";
import { UpdateUser } from "../../configs/urls";

const EditProfile = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleSubmit = async () => {
    const body = {
      username: data?.username,
      email: data?.email,
      address: data?.address,
      phoneNumber: data?.phoneNumber,
    };
    console.log("handle submit called ", body);

    const error = userValidation(body);
    if (!error) {
      try {
        setLoader(true);
        const response = await PostData(UpdateUser, body);
        console.log("response: ", response);

        if (response?.status) {
          setLoader(false);
          Alert.alert("SUCCESS", response?.message, [
            {
              text: "Close",
              onPress: () => navigation.goBack(),
            },
          ]);
        } else {
          ShowError(response);
        }

        setLoader(false);
      } catch (error) {
        console.log("error:", error);

        ShowError(error);
      }
    } else {
      ShowError(error);
      console.log("error:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          setLoading(true);

          const response = await GetAllData(`/users/singleUser`);

          if (response.success) {
            setData(response?.data);
          } else {
            setError(response.message);
          }
        } catch (err) {
          console.error("Error fetching data:", err);
          setError(err.message); // Use err.message for consistency
        } finally {
          setLoading(false);
        }
      };

      getData(); // Execute the function instead of returning it
    }, []) // Include currentPage in the dependency array
  );
  return (
    <View style={styles.container}>
      {/* Top View */}
      {loading ? (
        <View style={{ marginTop: 50 }}>
          <RequestLoader size="large" />
        </View>
      ) : // </div>
      error ? (
        <View style={{ marginTop: 50, paddingHorizontal: 10 }}>
          <Text>{error}</Text>
        </View>
      ) : (
        <>
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
                value={data?.username || ""}
                onChangeText={(text) => setData({ ...data, username: text })}
              />
              {/* <TextInputField
                placeholder="Enter your username"
                value={data.username}
                isSecure={false}
                onChangeText={(text) => setData({ ...data, username: text })}
              /> */}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email I'd</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Enter your email"
                value={data?.email || ""}
                onChangeText={(text) => setData({ ...data, email: text })}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Enter your address"
                // secureTextEntry={true}
                value={data?.address || ""}
                onChangeText={(text) => setData({ ...data, address: text })}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Enter your phone number"
                value={data?.phoneNumber || ""}
                onChangeText={(text) => setData({ ...data, phoneNumber: text })}
              />
            </View>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={handleSubmit}
            >
              {loader ? (
                <RequestLoader />
              ) : (
                <Text style={styles.updateButtonText}>Update</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
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
