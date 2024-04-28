import validator from "is_js";

const incidentValidation = (body) => {
  console.log("body: ", body);
  if (
    !body.category ||
    !body.name ||
    !body.dateAndTime ||
    !body.location ||
    !body.description
  ) {
    return "Field is empty";
  } else {
    return null;
  }
};

export default incidentValidation;
