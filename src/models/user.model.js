const uuid = require('uuid');
const { Schema, model } = require('mongoose');
const { hash, compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../common/config.js');

const saltRounds = 10;

const userSchema = new Schema(
  {
    _id: { type: String, default: uuid },
    name: { type: String, required: true, trim: true },
    login: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true }
  },
  { versionKey: false }
);

userSchema.pre('save', async function save(next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, saltRounds);
  }
  next();
});

userSchema.pre('findOneAndUpdate', async function update() {
  this._update.password = await hash(this._update.password, saltRounds);
});

userSchema.methods.generateAuthToken = async () => {
  const { id, login } = this;
  return sign({ id, login }, JWT_SECRET_KEY, { expiresIn: '1h' });
};

userSchema.statics.findByCredentials = async (login, password) => {
  const user = await User.findOne({ login });
  if (!user) return 403;
  const isPasswordMatch = await compare(password, user.password);
  if (!isPasswordMatch) return 403;
  return user;
};

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = model('User', userSchema);

module.exports = User;
