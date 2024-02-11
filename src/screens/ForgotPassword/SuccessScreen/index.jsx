import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, verticalScale } from 'react-native-size-matters';
import LottieView from 'lottie-react-native';
import animationPath from '../../../constants/animationPath'

import SubmitButton from '../../../component/ButtonSubmit';

import color from '../../../styles/color';

const SuccessScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.desc}>Password Changed</Text>
            <View style={styles.imageholder}>
                <LottieView
                    style={styles.image}
                    source={animationPath.SuccessPassword}
                    autoPlay
                />
            </View>
            <View style={styles.Buttoncontainer}>
                <SubmitButton text='Go to login' onPress={() => navigation.navigate('Login')}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: moderateScale(15),
        // backgroundColor: color.yellow,
    },
    imageholder: {
        flex: 1,
        marginVertical: verticalScale(15),
        alignItems: 'center',
        justifyContent: 'center',
    },
    desc: {
        textAlign: 'center',
        color: color.black,
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: moderateScale(40),
        marginVertical: verticalScale(12)
    },
})

export default SuccessScreen;