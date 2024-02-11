import { View, Text, StyleSheet } from 'react-native';

const Profile = () => {
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItem: 'center',
        backgroundColor: '#2c3e50'
    }
})

export default Profile;