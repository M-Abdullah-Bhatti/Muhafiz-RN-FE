import { SafeAreaView, Text, View, Button } from "react-native";
import { useEffect, useState } from "react";
import { StyleSheet, Image } from "react-native"; // Import Image from react-native
import { moderateScale } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import { Singin, adminLogin, setCurrentUser } from "../../store/actions/auth";
import loginValidation from "../../utils/validations/loginValidation";
import TextInputField from "../../component/TextInputField";
import SubmitButton from "../../component/ButtonSubmit";
import { ShowError, ShowSuccess } from "../../utils/flashMessages";
import NewtoApp from "../../component/NewtoApp";
import animationPath from "../../constants/animationPath";
import { ScrollView } from "react-native";
import axios from "axios";
import { ADMIN_LOGIN, LOGIN } from "../../configs/urls";
import adminLoginValidation from "../../utils/validations/adminLoginValidation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import setAuthToken from "../../utils/authToken";
import jwtDecode from "jwt-decode";

const Adminlogin = ({ navigation }) => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    departmentName: "",
    password: "",
  });

  const onLogin = ({ navigation }) => {
    const error = adminLoginValidation(data);
    if (!error) {
      dispatch(
        adminLogin({
          departmentName: data.departmentName,
          password: data.password,
        })
      );
    } else {
      ShowError(error);
    }
  };

  const adminLogin = (userData) => async (dispatch) => {
    try {
      const response = await axios.post(ADMIN_LOGIN, userData);
      console.log("response: ", response.data.token);
      const token = response.data.token;
      await AsyncStorage.setItem("jwt-token", token);
      const decode = jwtDecode(token);
      console.log("decode: ", decode);
      await AsyncStorage.setItem("user", JSON.stringify(decode));
      // setAuthToken(token);
      // dispatch(setCurrentUser(decode));
      navigation.navigate("TotalComplaintsRecords");
    } catch (error) {
      ShowError(error.response.data.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Display the text "MUHAFIZ" */}
      <View style={styles.imageholder}>
        <Text style={{ fontSize: 50 }}>MUHAFIZ</Text>
      </View>
      <ScrollView>
        <View style={styles.loginContainer}>
          <TextInputField
            placeholder="Department Name"
            icon_name="users"
            value={data.departmentName}
            isSecure={false}
            onChangeText={(text) => setData({ ...data, departmentName: text })}
            isSignin={undefined}
            onPress={undefined}
            isNumber={undefined}
          />
          <TextInputField
            placeholder="Enter your Password"
            icon_name="lock"
            isSecure={true}
            isSignin={true}
            value={data.password}
            onChangeText={(text) => setData({ ...data, password: text })}
            // onPress={() => navigation.navigate("SendEmail")}
            isNumber={undefined}
            onPress={undefined}
          />
          <Button title="Sign in" onPress={onLogin} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
// navigation.navigate("TotalComplaintsRecords")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(15),
    justifyContent: "center",
  },
  imageholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    flex: 1,
  },
  imageText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
});

export default Adminlogin;
