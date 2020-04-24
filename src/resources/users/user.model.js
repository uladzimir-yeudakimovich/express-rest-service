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
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.pre('findOneAndUpdate', async function update() {
  this._update.password = await bcrypt.hash(this._update.password, saltRounds);
});

userSchema.methods.generateAuthToken = async () => {
  const { id, login } = this;
  return jwt.sign({ id, login }, JWT_SECRET_KEY, { expiresIn: '1h' });
};

userSchema.statics.findByCredentials = async (login, password) => {
  const user = await User.findOne({ login });
  if (!user) return 403;
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) return 403;
  return user;
};

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
