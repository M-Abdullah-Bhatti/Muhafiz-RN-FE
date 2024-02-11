import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { verticalScale, scale, moderateScale } from "react-native-size-matters";

//constants
import color from "../../../styles/color";
import { useEffect } from "react";

//component
import SubmitButton from "../../ButtonSubmit";
import RadioButton from "../../RadioButton";

function GoalInfo({onSignup}) {

    const [selected, setSelected] = useState(0);
    const [suggestion, setSuggestion] = useState('');

    function StreamText(delay) {
        const text = `According to our calculation you should choose gain weight cause your bmi score is 18.6 and t0 avoid obesity`;
        let partialText = '';
        let i = 0;
        
        function loopIteration() {
          if (i < text.length) {
            partialText += text[i];
            setSuggestion(partialText);
            i++;
            setTimeout(loopIteration, delay); // Schedule the next iteration
          }
        }
      
        loopIteration(); // Start the loop
      }

    useEffect(() => {
        StreamText(10)
    },[]);
    
    return (
        <View style={styles.container}>
            <Text style={styles.desc}>What is your goal?</Text>
            <RadioButton text = 'Gain weight' setSelected={setSelected} selected = {selected} value={1}/>
            <RadioButton text = 'Maintain weight' setSelected={setSelected} selected = {selected} value={2}/>
            <RadioButton text = 'Loss weight' setSelected={setSelected} selected = {selected} value={3}/>
            <Text style={styles.text}>{suggestion}</Text>
            <View>
                <SubmitButton
                    text='Create Account'
                    onPress={onSignup}
                />
            </View>
        </View>
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

export default GoalInfo;