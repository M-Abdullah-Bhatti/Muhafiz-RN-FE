import {showMessage} from 'react-native-flash-message';

const ShowError = (message) => {
    showMessage({
        type: 'danger',
        icon: 'danger',
        message
    })
}


const ShowSuccess = (message) => {
    showMessage({
        type: 'success',
        icon: 'success',
        message
    })
}

export {
    ShowError,
    ShowSuccess
}