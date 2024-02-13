import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { StyleSheet, View, Image } from "react-native"; // Import Image from react-native
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

const Login = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  console.log("data-----");
  console.log(data);

  const onLogin = () => {
    const error = loginValidation(data);
    if (!error) {
      dispatch(Singin(data));
    } else {
      ShowError(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Display the PNG image */}
      <View style={styles.imageholder}>
        <Image
          source={require("../../assets/images/fit.png")}
          style={styles.image}
        />
        {/* <LottieView source={animationPath.onBoarding} autoPlay/> */}
      </View>
      <ScrollView>
        <View style={styles.loginContainer}>
          <TextInputField
            placeholder="Enter your email"
            icon_name="envelope"
            value={data.email}
            isSecure={false}
            onChangeText={(text) => setData({ ...data, email: text })}
          />
          <TextInputField
            placeholder="Enter your Password"
            icon_name="lock"
            isSecure={true}
            isSignin={true}
            value={data.password}
            onChangeText={(text) => setData({ ...data, password: text })}
            onPress={() => navigation.navigate("SendEmail")}
          />
          <SubmitButton text="Login" onPress={onLogin} />
          <NewtoApp
            text="New to the app?"
            onPress={() => navigation.navigate("Signup")}
            screen="Register"
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
  },
  loginContainer: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%", // You might want to specify the height as well
    resizeMode: "contain",
  },
});

export default Login;
