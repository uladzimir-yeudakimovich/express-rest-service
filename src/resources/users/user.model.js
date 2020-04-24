const uuid = require('uuid');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../../common/config.js');

const saltRounds = 10;

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid },
    name: { type: String, required: true, trim: true },
    login: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, minLength: 5 }
  },
  { versionKey: false }
);

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, saltRounds);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.generateAuthToken = async function generateAuthToken(
  data,
  callback
) {
  const { id, login, password } = this;
  bcrypt.compare(data, password, (error, result) => {
    if (error) throw error;
    let token;
    if (result) {
      token = jwt.sign({ id, login }, JWT_SECRET_KEY, { expiresIn: '1h' });
    }
    callback(token);
  });
};

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
