import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { moderateScale, scale } from 'react-native-size-matters'
import color from "../../styles/color";

function RadioButton({text, setSelected, selected, value}) {

    return (
        <View style = {styles.cardContainer}>
            <TouchableOpacity 
            style = {styles.card}
            onPress={() => setSelected(value)}
            >
                <Text style = {styles.text}>{text}</Text>
                <View style= {styles.radio}>
                    {selected === value ? <View style = {styles.innerRadio}></View>:null}
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'column',
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: moderateScale(8),
        backgroundColor: color.white,
        borderRadius: 5,
        padding: moderateScale(20)
    },
    radio: {
        backgroundColor: color.lightgrey,
        width: scale(20),
        height: scale(20),
        borderRadius: moderateScale(10)
    },
    innerRadio: {
        backgroundColor: color.orange,
        width: scale(14),
        height: scale(14),
        borderRadius: moderateScale(7),
        margin: moderateScale(3)
    },
    text: {
        textAlign: 'center',
        color: color.grey,
        fontSize: 16,
        fontWeight: '400',
    }
});

export default RadioButton;