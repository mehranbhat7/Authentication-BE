const { SignupSchema, signinSchema } = require('../middlewares/validator');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { doHash, doHashValidation } = require('../utils/hashing');

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
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error, value } = signinSchema.validate({ email, password });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password format' });
    }

    const existingUser = await User.findOne({ email }).select('+password');
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: 'User does not exists!' });
    }
    const result = await doHashValidation(password, existingUser.password);
    if (!result) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials!' });
    }
    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        verified: existingUser.verified,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: '8h',
      }
    );

    res
      .cookie('Authorization', 'Bearer ' + token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      })
      .json({
        success: true,
        token,
        message: 'logged in successfully',
      });
  } catch (error) {
    console.log(error);
  }
};
