import { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, verticalScale } from 'react-native-size-matters';
import axios from 'axios'
import { VerifyOtp, sendEmail } from '../../../configs/urls';
import { ShowError, ShowSuccess } from '../../../utils/flashMessages';

import NewtoApp from '../../../component/NewtoApp';
import TextInputOtp from '../../../component/TextInputOtp';
import SubmitButton from '../../../component/ButtonSubmit';

import imagePath from '../../../constants/imagePath';
import color from '../../../styles/color';


const OtpScreen = ({ navigation, route }) => {

    const { userId, email } = route.params;
    const [otp, setOtp] = useState({
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: ''
    })
    const [valid, setValid] = useState(true);
    const [loader, setLoader] = useState(false);

    const verifyOtp = async () => {
        const conOtp = otp.otp1 + otp.otp2 + otp.otp3 + otp.otp4;
        try {
            const response = await axios.post(VerifyOtp, { userId, otp: conOtp });
            ShowSuccess(response.data.message);
            navigation.navigate('changePasswordScreen', {
                userId: userId
            })
        } catch (error) {
            setValid(false);
            ShowError(error.response.data.message)
        }
    }


    const sendOtp = async () => {
        try {
            setLoader(true);
            const response = await axios.post(sendEmail, { email });
            setLoader(false);
            navigation.navigate('OtpScreen', {
                userId: response.data.details.userId,
                email: email
            })
        } catch (error) {
            setLoader(false);
            ShowError(error.response.data.message);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.desc}>Verification</Text>
            <View style={styles.imageholder}>
                <Image
                    source={imagePath.otpAvatar}
                    style={styles.image}
                />
            </View>
            <View style={styles.Contentcontainer}>
                <Text style={styles.text}>Enter the verification code we just sent you on your email address</Text>
                <View style={styles.OtpContainer}>
                    <TextInputOtp
                        otp={otp}
                        setOtp={setOtp}
                        valid={valid}
                        setValid = {setValid}
                    />
                </View>
                <SubmitButton text={loader ? 'Loading...': 'Verify'} onPress={verifyOtp} />
                <NewtoApp
                    text={`Didn't recieve the OTP?`}
                    onPress={sendOtp}
                    screen='send'
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: moderateScale(15),
    },
    desc: {
        textAlign: 'center',
        color: color.black,
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: moderateScale(40),
        marginVertical: verticalScale(12)
    },
    imageholder: {
        flex: 1,
        marginVertical: verticalScale(15),
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '50%',
        height: undefined,
        aspectRatio: 1,
    },
    Contentcontainer: {
        flex: 2,

    },
    text: {
        textAlign: 'center',
        color: color.black,
        fontSize: 20,
        fontWeight: '500',
        marginVertical: verticalScale(12)
    },

})

export default OtpScreen;