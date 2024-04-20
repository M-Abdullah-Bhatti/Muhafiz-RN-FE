import validator from "is_js";

const postValidation = (body) => {
  if (
    !body.dateAndTime ||
    !body.description ||
    !body.imageUrl ||
    !body.latitude ||
    !body.longitude
  ) {
    return "Field is empty";
  } else {
    return null;
  }
};

export default postValidation;
