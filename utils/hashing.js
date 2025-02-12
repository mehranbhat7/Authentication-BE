const { hash, compare } = require('bcryptjs');

exports.doHash = (value, saltRounds) => bcrypt.hash(value, saltRounds);
exports.doHashValidation = (value, hashedValue) => {
  const result = compare(value, hashedValue);
  return result;
};
