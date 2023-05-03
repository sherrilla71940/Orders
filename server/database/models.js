const { mongoose } = require("./db");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email."],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email."],
  },
  password: {
    type: String,
    required: [true, "Please enter a password."],
    minlength: [6, "Minimum password length is 6 characters."],
  },
});

// static method
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    // return {error: 'incorrect password'}
    throw new Error("incorrect password");
  }
  // return {error: 'incorrect email'}
  throw new Error("incorrect email");
};

const orderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },

  ourClient: String,
  date: Date,
  quantity: Number,
  charge: Number,
  finalClient: String,
  payment: String,
  fullfilment: String,
  delivery: String,
});

module.exports = {
  userSchema,
  orderSchema,
};
