const validator = require("validator");

exports.isValidEmail = (email) => {
  return validator.isEmail(email);
};
