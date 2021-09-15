const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: Number },
  first_name: { type: String},
  last_name: { type: String},
  email: { type: String},
  gender: { type: String },
  ip_address: { type: String }
});

module.exports = mongoose.model('user', userSchema);
