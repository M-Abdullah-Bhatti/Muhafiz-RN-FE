import validator from 'is_js';

const signupPhysicsValidation = (data) => {

    if(validator.empty(data.cnic) || validator.empty(data.address)) {
        return 'Please enter all field';
    }
}

export default signupPhysicsValidation;