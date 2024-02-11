import { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import axios from 'axios'
import {UpdatePassword} from '../../../configs/urls'

import imagePath from '../../../constants/imagePath';
import color from '../../../styles/color';
import TextInputField from '../../../component/TextInputField';
import SubmitButton from '../../../component/ButtonSubmit';
import { ShowError, ShowSuccess } from '../../../utils/flashMessages';
import updatePasswordValidation from '../../../utils/validations/updatePasswordValidation';

const ChangePasswordScreen = ({ navigation, route }) => {

    const {userId} = route.params;
    const [data, setData]  =useState({
        password: '',
        confirmPassword: ''
    })
    const [loader, setLoader]  = useState(false);


    const resetPassword = async () => {
        const isvalid = updatePasswordValidation(data);
        try{
            if(!isvalid) {
                setLoader(true);
                const response = await axios.put(UpdatePassword+`/${userId}`, data);
                setLoader(false);
                ShowSuccess(response.data.message);
                navigation.navigate('SuccessScreen')
            }else {
                ShowError(isvalid);    
            }
        }catch(error) {
            setLoader(false);
            ShowError(error.response.data.message);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {console.log(data)}
            <Text style={styles.desc}>Change Password</Text>
            <View style={styles.imageholder}>
                <Image
                    source={imagePath.changePasswordAvatar}
                    style={styles.image}
                />
            </View>
            <View style={styles.Contentcontainer}>
                <Text style={styles.text}>Choose a password</Text>
                <Text style={styles.textLite}>Password must be of atlest 8 character</Text>
                <TextInputField
                    placeholder="Password"
                    icon_name="lock"
                    value={data.password}
                    isSecure={true}
                    onChangeText={(text) => setData({...data, password: text})}
                />
                <TextInputField
                    placeholder="Confirm Password"
                    icon_name="lock"
                    value={data.confirmPassword}
                    isSecure={true}
                    onChangeText={(text) => setData({...data, confirmPassword: text})}
                />
                <SubmitButton text={loader ? 'Loading...': 'Reset'} onPress={resetPassword} />
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
        alignItems: 'center', // Center the image horizontally
        justifyContent: 'center'
    },
    image: {
        width: '70%', // Reduce the image size to 50% of its original size
        height: undefined, // This keeps the aspect ratio of the image
        aspectRatio: 1, // You may adjust the aspect ratio as needed
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
    textLite: {
        textAlign: 'center',
        color: color.grey,
        fontSize: 12,
        fontWeight: '400',
        paddingHorizontal: verticalScale(20),
        marginVertical: verticalScale(12)
    }
})

export default ChangePasswordScreen;