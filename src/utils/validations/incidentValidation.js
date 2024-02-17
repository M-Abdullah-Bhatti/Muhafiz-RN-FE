import validator from "is_js";

const incidentValidation = (body) => {
  if (
    validator.empty(body.category) ||
    validator.empty(body.name) ||
    validator.empty(body.dateAndTime) ||
    validator.empty(body.location) ||
    validator.empty(body.description)
  ) {
    return "Field is empty";
  }
};

export default incidentValidation;
