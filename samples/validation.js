// this file contains common method that can be used for validation 
// of req.body parameter

// we want to store common validation in separate file
const { isEmail, isValidPsssword, isEmpty } = require('./common');
// we want to have all errors and messages in on file
const UserEnum = require('../enums/user');
// we want to define errors
const { ValidationError } = require('../errors/Errors');

/*
    data - req.data parameter.
    function will throw error in case of any issues
    this error can be handled on routes part
*/
module.exports = function validateRegisterInput(data) {
  const errors = {};

  if (isEmpty(data.firstname)) {
    errors.firstname = UserEnum.error.firstNameEmpty;
  }
  if (isEmpty(data.lastname)) {
    errors.lastname = UserEnum.error.lastnameEmpty;
  }
  if (isEmpty(data.email)) {
    errors.email = UserEnum.error.emailEmpty;
  } else if (!isEmail(data.email)) {
    errors.email = UserEnum.error.emailInvalid;
  }
  if (isEmpty(data.password)) {
    errors.password = UserEnum.error.passwordEmpty;
  } else if (isValidPsssword(data.password) !== true) {
    errors.password = UserEnum.error.passwordInvalid;
  }
  if (isEmpty(data.password2)) {
    errors.password2 = UserEnum.error.password2Empty;
  } else if (data.password !== data.password2) {
    errors.password2 = UserEnum.error.password2NotMatch;
  }

  if (!isEmpty(errors)) {
    throw new ValidationError('Errors during validation of input fields', errors);
  }
};