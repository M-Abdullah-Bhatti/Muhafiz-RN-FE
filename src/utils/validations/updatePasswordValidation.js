import validator from 'is_js';

const checkMinLength = (data, min) => {
    if(data.trim().length < min) {
        return true;    
    }
    return false;
}

const updatePasswordValidation = (data) => {

    if(validator.empty(data.password) || validator.empty(data.confirmPassword)) {
        return 'Please enter all field';
    }
    if(checkMinLength(data.password, 8)) {
        return 'Password should be of atleast 8 Character';
    }
    if(data.password !== data.confirmPassword) {
        return 'Password doesnot matches';
    }
}

export default updatePasswordValidation;