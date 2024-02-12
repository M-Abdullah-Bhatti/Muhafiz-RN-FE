import validator from "is_js";

const postValidation = (body) => {
  if (validator.empty(body.dateAndTime) || validator.empty(body.description)) {
    return "Field is empty";
  }
};

export default postValidation;
