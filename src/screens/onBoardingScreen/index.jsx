import { useState } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { verticalScale, moderateScale } from 'react-native-size-matters';
import LottieView from 'lottie-react-native';

//constants
import color from '../../styles/color';
import animationPath from '../../constants/animationPath';
import SubmitButton from '../../component/ButtonSubmit';


const OnBoarding = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container1}>
                {/* { <LottieView source={animationPath.onBoarding} autoPlay/> } */}

                <Image
        source={require('../../../src/assets/images/logo.png')} // Use a relative path
        style={styles.logo}/>
            </View>
            <View style={styles.container2}>
                <Text style={styles.heading}>Muhafiz</Text>
                <Text style={styles.textLite}>Welcome to Muhafiz! Your Guardian Against Crime.</Text>
                
                <SubmitButton text='SignIn' onPress={() => navigation.navigate('Login')}/>
                <SubmitButton text='SignUp' onPress={() => navigation.navigate('Signup')}/>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: color.white,
        padding: moderateScale(15),
    },
    container1: {
        flex: 1,
    },
    container2:{    
        flex: 1,
    },
    heading: {
        textAlign: 'center',
        color: color.blue,
        fontSize: moderateScale(40),
        fontWeight: '900',
        marginVertical: verticalScale(12)
    },
    textLite: {
        textAlign: 'center',
        color: color.grey,
        fontSize: 17,
        fontWeight: '500',
        lineHeight: moderateScale(25),
        paddingHorizontal: verticalScale(20),
        marginVertical: verticalScale(12)
    },
    logo: {
        width: 378, // Set the width of the image
        height: 400, // Set the height of the image
        resizeMode: 'contain', // You can adjust the resizeMode as needed
      }
})

export default OnBoarding;