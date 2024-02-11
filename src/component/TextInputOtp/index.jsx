import  {useRef} from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

import color from '../../styles/color';

const TextInputOtp = ({ setOtp, otp, valid, setValid }) => {

    const et1 = useRef();
    const et2 = useRef();
    const et3 = useRef();
    const et4 = useRef();

    return (
        <View style={styles.container}>
            <TextInput
                ref={et1}
                style={[styles.input, valid ? null: styles.wrongOtp]}
                keyboardType='number-pad'
                maxLength={1}
                value={otp.otp1}
                onChangeText={(text) => {
                    setOtp({ ...otp, otp1: text });
                    if(text != '') {
                        et2.current.focus();
                    }
                }}
            />
            <TextInput
                ref={et2}
                style={[styles.input, valid ? null: styles.wrongOtp]}
                keyboardType='number-pad'
                maxLength={1}
                value={otp.otp2}
                onChangeText={(text) => {
                    setOtp({ ...otp, otp2: text });
                    if(text != '') {
                        et3.current.focus();
                    }else if(text === '') {
                        et1.current.focus();
                    }
                }}
            />
            <TextInput
                ref={et3}
                style={[styles.input, valid ? null: styles.wrongOtp]}
                keyboardType='number-pad'
                maxLength={1}
                value={otp.otp3}
                onChangeText={(text) => {
                    setOtp({ ...otp, otp3: text });
                    if(text != '') {
                        et4.current.focus();
                    }else if(text === '') {
                        et2.current.focus();
                    }
                }}
            />
            <TextInput
                ref={et4}
                style={[styles.input, valid ? null: styles.wrongOtp]}
                keyboardType='number-pad'
                maxLength={1}
                value={otp.otp4}
                onChangeText={(text) => {
                    setOtp({ ...otp, otp4: text });
                    if(text != ''){
                        
                    }else if(text === '') {
                        setValid(true);
                        et3.current.focus();
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: scale(40),
        height: verticalScale(40),
        borderWidth: 0.5,
        borderRadius: 10,
        margin: moderateScale(5),
        textAlign: 'center',
        color: color.orange,
        borderColor: color.maincolor
    },
    wrongOtp: {
        borderColor: color.red
    }
});

export default TextInputOtp;