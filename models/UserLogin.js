const mongoose = require('mongoose');

const userLoginSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  token: {type: String, required: true},
  time: {type: Number, required: true}
});

userLoginSchema.index({user: 1});

module.exports = mongoose.model('UserLogin', userLoginSchema);
