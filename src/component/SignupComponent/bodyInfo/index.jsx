import { View, StyleSheet, Text } from "react-native";
import { verticalScale, moderateScale } from "react-native-size-matters";
import signupPhysicsValidation from "../../../utils/validations/signupPhysicValidation";
import { ShowError } from "../../../utils/flashMessages";

//component
import SubmitButton from "../../ButtonSubmit";
import { ScrollView } from "react-native";
//constants
import color from "../../../styles/color";
import TextInputField from "../../TextInputField";

function BodyInfo({ data, setData,setSteps, navigation, onSignup}) {
    
    const handleClick = () => {
        const isvalid = signupPhysicsValidation(data);
        if (!isvalid) {
            setSteps(2);
        } else {
            ShowError(isvalid);
        }
    }

    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.desc}>Enter CNIC & Address</Text>
            <TextInputField
                placeholder='Enter your Cnic Number'
                icon_name='id-card-o'
                value={data.cnic}
                isNumber={true}
                onChangeText={(number) => setData({ ...data, cnic: number })}
             />
             <TextInputField
                placeholder='Enter your address'
                icon_name='location-arrow'
                value={data.address}
                isNumber={false}
                onChangeText={(text) => setData({ ...data, address: text })}
             />
            <View>
                <SubmitButton
                    text='Create Account'
                    onPress={onSignup}
                />
            </View>
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
        paddingHorizontal: moderateScale(20),
        marginVertical: verticalScale(12)
    },
    text: {
        textAlign: 'center',
        color: color.grey,
        fontSize: 16,
        fontWeight: '400',
        paddingHorizontal: moderateScale(15),
        marginVertical: verticalScale(12),
        marginBottom: moderateScale(25)
    },
});

export default BodyInfo;