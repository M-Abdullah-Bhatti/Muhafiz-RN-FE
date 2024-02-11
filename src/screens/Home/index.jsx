import { View, Text, StyleSheet } from 'react-native';
import SubmitButton from '../../component/ButtonSubmit';
import { useDispatch } from 'react-redux';
import { Signout } from '../../store/actions/auth';
import axios from 'axios';
import { CreateGoal } from '../../configs/urls';
import { ShowSuccess } from '../../utils/flashMessages';

const Home = () => {

    const dispatch = useDispatch();
    const data = {
        dailygoal : 400
    }

    const onLogout = () => {
        dispatch(Signout());
    }

    const createGoal = async() => {
        try {

            const response = await axios.post(CreateGoal, data);
            ShowSuccess(response.data.success);

        }catch(error) {

        }
    }

    return (
        <View style={styles.container}>
            <SubmitButton text='Logout' onPress={onLogout}/>
            <SubmitButton text='create goal' onPress={createGoal}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }
})

export default Home;