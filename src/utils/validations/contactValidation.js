import validator from "is_js";

const checkMinLength = (data, min) => {
  if (data.trim().length < min) {
    return true;
  }
  return false;
};

const contactValidation = (data) => {
  if (
    validator.empty(data.name) ||
    validator.empty(data.phoneNumber) ||
    validator.empty(data.phoneNumber) ||
    validator.empty(data.address)
  ) {
    return "Please enter all field";
  }
  if (!validator.email(data.email)) {
    return "Enter a Valid Email";
  }
  if (checkMinLength(data.name, 4)) {
    return "Username should be of atleast 8 Character";
  }
};

export default contactValidation;
