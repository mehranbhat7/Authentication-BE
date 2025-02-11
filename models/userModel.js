const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'email required'],
      trim: true,
      unique: [true, 'email must be unique'],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'password required'],
      trim: true,
      select: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      select: false,
    },
    verificationCodeValidation: {
      type: Number,
      select: false,
    },
    forgotPasscode: {
      type: String,
      select: false,
    },
    forgotPasscodeValidation: {
      type: Number,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('User', userSchema);
