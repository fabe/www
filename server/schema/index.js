const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: String,
  name: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = {
  User,
};
