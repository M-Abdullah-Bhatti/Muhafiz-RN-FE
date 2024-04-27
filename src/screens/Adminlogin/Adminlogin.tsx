import { SafeAreaView, Text, View, Button } from "react-native";
import { useState } from "react";
import { StyleSheet, Image } from "react-native"; // Import Image from react-native
import { moderateScale } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import { Singin } from "../../store/actions/auth";
import loginValidation from "../../utils/validations/loginValidation";
import TextInputField from "../../component/TextInputField";
import SubmitButton from "../../component/ButtonSubmit";
import { ShowError, ShowSuccess } from "../../utils/flashMessages";
import NewtoApp from "../../component/NewtoApp";
import animationPath from "../../constants/animationPath";
import { ScrollView } from "react-native";
import axios from "axios";
import { LOGIN } from "../../configs/urls";

const Adminlogin = ({ navigation }) => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    departmentName: "",
    password: "",
  });

  const onLogin = ({ navigation }) => {
    // const error = loginValidation(data);
    // if (!error) {
    //   dispatch(Singin({ departmentName: data.departmentName, password: data.password }));
    // } else {
    //   ShowError(error);
    // }
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
            isNumber={undefined} onPress={undefined}          />
          <Button title="Sign in" onPress={navigation.navigate("TotalComplaintsRecords")}  />
          <NewtoApp
            text="Forgot password?"
            onPress={() => navigation.navigate("SendEmail")}
            // onPress={() => navigation.navigate("Signup")}
            screen="Reset Password"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
