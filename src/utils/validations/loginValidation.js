import validator from 'is_js';

const loginValidation = (data) => {

    if(validator.empty(data.email) || validator.empty(data.password)) {
        return 'Field is empty';
    }
    if(!validator.email(data.email)) {
        return 'Enter a Valid Email';
    }
}

export default loginValidation;