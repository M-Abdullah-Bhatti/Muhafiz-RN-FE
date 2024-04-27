import validator from "is_js";

const adminLoginValidation = (data) => {
  if (validator.empty(data.departmentName) || validator.empty(data.password)) {
    return "Field is empty";
  }
};

export default adminLoginValidation;
