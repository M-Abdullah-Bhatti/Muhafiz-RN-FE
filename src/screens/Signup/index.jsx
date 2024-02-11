import { useState } from 'react';
import { StyleSheet, Image, Alert, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

import { ShowError, ShowSuccess } from '../../utils/flashMessages';
import { SIGNUP } from '../../configs/urls';

//components
import BreadCrumbs from '../../component/SignupComponent/breadCrumbs';
import Info from '../../component/SignupComponent/info';

import BodyInfo from '../../component/SignupComponent/bodyInfo';
import GoalInfo from '../../component/SignupComponent/goal';


const Signup = ({ navigation }) => {

    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        cnic: '',
        address: ''
    });
    const [steps, setSteps] = useState(1);

    //handling api finction
    const onSignup = async () => {

        try {
            const response = await axios.post(SIGNUP, data);
            Alert.alert(
                'SUCCESS',
                response.data.message,
                [
                    {
                        text: 'Login',
                        onPress: () => navigation.navigate('Login')
                    }
                ]
            )
        } catch (error) {
            ShowError(error.response.data.message);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <View style = {styles.imageholder}>
            <Image
                source={imagePath.logo}
                style={styles.image}
            />
            </View> */}
            {/* {console.log(data)} */}
            <BreadCrumbs setSteps={setSteps} steps={steps} />
            {steps === 1 ? <Info data={data} setData={setData} setSteps={setSteps} navigation={navigation} /> : null}
            {/* {steps === 2 ? <Gender data={data} setData={setData} setSteps={setSteps} /> : null} */}
            {steps === 2 ? <BodyInfo data={data} setData={setData} setSteps={setSteps} onSignup={onSignup}/> : null}
            {/*steps === 3 ? <GoalInfo onSignup={onSignup} /> : null*/}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        resizeMode: 'contain',
    },
})

export default Signup;