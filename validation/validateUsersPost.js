const express = require('express');
const validator = require('validator');
const ValidationError = require('../errors/errorsList');

module.exports = function validateCreateUser(data) {
    var errors = {};
  
    if (validator.isEmpty(data.name)) {
        errors.name = 'NameEmpty';
        console.log('no name entered');
    }
    if (validator.isEmpty(data.city)) {
        errors.city = 'CityEmpty';
        console.log('no city entered');
    }

    console.log(errors)

    if(errors[0] !== ''){
        console.log('there`s an error')
        throw new ValidationError('Errors during validation of input fields', errors);
    }
  };