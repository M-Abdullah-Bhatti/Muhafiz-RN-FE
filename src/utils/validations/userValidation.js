import validator from "is_js";

const userValidation = (body) => {
  // Check if any of the required fields is either explicitly undefined or empty
  if (
    validator.empty(body.username) ||
    validator.empty(body.email) ||
    validator.empty(body.address) ||
    typeof body.phoneNumber === "undefined" ||
    validator.empty(body.phoneNumber)
  ) {
    return "Field is empty";
  }
};

export default userValidation;
