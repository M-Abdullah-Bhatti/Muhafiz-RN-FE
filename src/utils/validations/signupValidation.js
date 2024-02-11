import validator from 'is_js';

const checkMinLength = (data, min) => {
    if(data.trim().length < min) {
        return true;    
    }
    return false;
}

const signupValidation = (data) => {

    if(validator.empty(data.email) || validator.empty(data.password) || validator.empty(data.password)) {
        return 'Please enter all field';
    }
    if(!validator.email(data.email)) {
        return 'Enter a Valid Email';
    }
    if(checkMinLength(data.username, 8)) {
        return 'Username should be of atleast 8 Character';
    }
    if(checkMinLength(data.password, 8)) {
        return 'Password should be of atleast 8 Character';
    }
    if(data.password !== data.confirmPassword) {
        return 'Password doesnot matches';
    }
}

export default signupValidation;