const uuid = require('uuid');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid },
    name: { type: String, required: true },
    login: { type: String, required: true },
    password: { type: String, required: true }
  },
  { versionKey: false }
);

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.validatePassword = async function validatePassword(
  data,
  callback
) {
  bcrypt.compare(data, this.password, (error, result) => {
    if (error) throw error;
    callback(result);
  });
};

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
