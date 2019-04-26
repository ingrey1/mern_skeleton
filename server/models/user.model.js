import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },

  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
    required: 'Email is required'
  },

  created: {
    type: Date,
    default: Date.now
  },

  updated: Date,

  hashed_password: {
    type: String,
    required: 'Password is required'
  }
});

// handle password as virtual field
UserSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function(password) {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function(plainText) {
    return bcrypt.compareSync(plainText, this.hashed_password);
  },

  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return bcrypt.hashSync(password, 10);
    } catch (err) {
      return '';
    }
  }
};

// password validation logic

UserSchema.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least six characters');
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required');
  }
}, null);

export default mongoose.model('User', UserSchema);
