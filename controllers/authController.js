const { SignupSchema } = require('../middlewares/validator');
const User = require('../models/userModel');
const { doHash } = require('../utils/hashing');

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate input data
    const { error } = SignupSchema.validate({ email, password });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password format' });
    }

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await doHash(password, 12);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const result = await newUser.save();

    // Remove the password from the result before sending the response
    result.password = undefined;
    return res.status(201).json({
      success: true,
      message: 'User successfully created',
      result,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' });
  }
};
