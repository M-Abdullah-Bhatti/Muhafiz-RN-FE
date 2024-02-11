import { Dimensions, TouchableOpacity, View, StyleSheet, Text } from "react-native";
import color from "../../../styles/color";

const tabs = [
    {
        text: 'Info'
    },
    {
        text: 'Gender'
    },    
]

function BreadCrumbs({setSteps, steps}) {

    return (
        <View style={styles.listTab}>
            {
                tabs.map((data, idx) => (
                    <TouchableOpacity
                     style={[styles.btnTab, steps === idx+1 ? styles.btnTabActive: null]}
                     key={idx}
                     onPress={() => setSteps(idx+1)}
                     >
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    listTab: {
        flexDirection: 'row',
        alignSelf: 'center'
    },  
    btnTab: {
        width: Dimensions.get('window').width / 4.5,
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 0.2,
        borderBlockColor: color.maincolor,
        padding: 3,
    },
    btnTabActive: {
        backgroundColor: color.maincolor,
    },
    text: {
        fontSize: 16,
        fontWeight: '400'
    }
});

export default BreadCrumbs;