const Joi = require('joi');
exports.SignupSchema = Joi.object({
  email: Joi.string()
    .max(60)
    .required()
    .email({ tlds: { allow: ['com', 'net'] } }),
  password: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')),
});
exports.signinSchema = Joi.object({
  email: Joi.string()
    .max(60)
    .required()
    .email({ tlds: { allow: ['com', 'net'] } }),
  password: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')),
});
