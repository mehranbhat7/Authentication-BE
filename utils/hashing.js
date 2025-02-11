const bcrypt = require('bcryptjs');

exports.doHash = (value, saltRounds) => bcrypt.hash(value, saltRounds);
