import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { verticalScale, scale, moderateScale } from "react-native-size-matters";
import signupValidation from "../../../utils/validations/signupValidation"
import { ShowError } from "../../../utils/flashMessages";

import TextInputField from "../../TextInputField";
import SubmitButton from "../../ButtonSubmit";
import NewtoApp from "../../NewtoApp"
import { ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


import color from "../../../styles/color";

function Info({ data, setData, setSteps, navigation }) {

    
    // const navigation = useNavigation();

    const handleClick = () => {
        const isvalid = signupValidation(data);
        if (!isvalid) {
            setSteps(2);
        } else {
            ShowError(isvalid);
        }
    }

    return (
        <ScrollView>
        <View style={styles.container}>
        <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View>
            <Text style={styles.desc}>Now Let's set up your Info</Text>
            <TextInputField
                placeholder="Username"
                icon_name="user"
                value={data.username}
                isSecure={false}
                onChangeText={(text) => setData({ ...data, username: text })}
            />
            <TextInputField
                placeholder="Email ID"
                icon_name="envelope"
                value={data.email}
                isSecure={false}
                onChangeText={(text) => setData({ ...data, email: text })}
            />
            <TextInputField
                placeholder="Password"
                icon_name="lock"
                isSecure={true}
                isisSignin={false}
                value={data.password}
                onChangeText={(text) => setData({ ...data, password: text })}
            />
            <TextInputField
                placeholder="Confirm Password"
                icon_name="lock"
                isSecure={true}
                isisSignin={false}
                value={data.confirmPassword}
                onChangeText={(text) => setData({ ...data, confirmPassword: text })}
            />
            <SubmitButton
                text="Next"
                onPress={handleClick}
            />
            <NewtoApp 
                    text='Already have Account?'
                    onPress={() => navigation.navigate('Login')}
                    screen='Login' 
            />
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: verticalScale(20)
    },
    desc: {
        textAlign: 'center',
        color: color.black,
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: moderateScale(40),
        marginVertical: verticalScale(12)
    },
    register: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: verticalScale(12)
    },
    text: {
        color: color.orange,
        fontWeight: '700',
    }
});

export default Info;