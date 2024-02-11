import { useState } from "react";
import { Text, StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { verticalScale, moderateScale } from "react-native-size-matters";
import LottieView from "lottie-react-native";
import TextInputField from "../../component/TextInputField";
//constants
import color from "../../styles/color";
import animationPath from "../../constants/animationPath";
import SubmitButton from "../../component/ButtonSubmit";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
//inni
const NewContact = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.headingcontainer}>
        <Text style={styles.mainheading}>Create new contact</Text>
      </View>
      {/* 
            <View styles={styles.contact}>
            <FontAwesome name={"simplybuilt"} style={styles.icon}/>
            <Text>saving to SOS contact</Text>
            </View> */}

      <View style={styles.container1}>
        {/* { <LottieView source={animationPath.onBoarding} autoPlay/> } */}

        <TextInputField
          placeholder="Enter your Name"
          icon_name="address-card"
          value={data.name}
          isSecure={false}
          onChangeText={(text) => setData({ ...data, name: text })}
        />
        <TextInputField
          placeholder="Enter your Phone Number"
          icon_name="phone-square"
          value={data.number}
          isSecure={false}
          onChangeText={(text) => setData({ ...data, number: text })}
        />
        <TextInputField
          placeholder="Enter your email"
          icon_name="envelope"
          value={data.email}
          isSecure={false}
          onChangeText={(text) => setData({ ...data, email: text })}
        />
        <TextInputField
          placeholder="Enter their address"
          icon_name="home"
          value={data.address}
          isSecure={false}
          onChangeText={(text) => setData({ ...data, address: text })}
        />

        <View styles={styles.submit}>
          <TouchableOpacity
            style={[styles.btn, color ? styles.btnColor : null]}
            // onPress={onPress}
          >
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: color.white,
    padding: moderateScale(20),
  },
  btn: {
    backgroundColor: color.maincolor,
    padding: 18,
    borderRadius: 10,
    marginTop: 160,
    marginLeft: 30,
    marginRight: 30,
  },

  btnColor: {
    backgroundColor: color.orange,
  },
  btnText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  mainheading: {
    textAlign: "center",
    color: color.blue,
    fontSize: moderateScale(40),
    fontWeight: "900",
    marginVertical: verticalScale(20),
  },
  headingcontainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  contact: {},
  container1: {
    flex: 1,
    marginTop: verticalScale(20),
    borderRadius: 10, // This adds the border radius
    backgroundColor: "#ffffff", // Background color is needed for shadow to be visible
    shadowColor: "#000", // This sets the shadow color
    shadowOffset: { width: 3, height: 1 }, // This sets the shadow offset
    shadowOpacity: 0.5, // This sets the shadow opacity
    shadowRadius: 8, // This sets the shadow blur radius
    elevation: 5, // This adds elevation for Android
  },

  icon: {
    fontSize: 20,
    color: color.black,
    marginRight: moderateScale(10),
  },

  heading: {
    textAlign: "center",
    color: color.blue,
    fontSize: moderateScale(40),
    fontWeight: "900",
    marginVertical: verticalScale(12),
  },
  textLite: {
    textAlign: "center",
    color: color.grey,
    fontSize: 17,
    fontWeight: "500",
    lineHeight: moderateScale(25),
    paddingHorizontal: verticalScale(20),
    marginVertical: verticalScale(12),
  },
  logo: {
    width: 378, // Set the width of the image
    height: 400, // Set the height of the image
    resizeMode: "contain", // You can adjust the resizeMode as needed
  },
});

export default NewContact;
