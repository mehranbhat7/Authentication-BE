// utils/hashing.js
const bcrypt = require('bcryptjs');
const { createHmac } = require('crypto');

exports.doHash = (value, saltRounds) => bcrypt.hash(value, saltRounds);

exports.doHashValidation = (value, hashedValue) =>
  bcrypt.compare(value, hashedValue);

exports.hmacProcess = (value, key) => {
  const result = createHmac('sha256', key).update(value).digest('hex');
  return result;
};
