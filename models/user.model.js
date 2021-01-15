const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  image: String,
  email: {type: String, required: true, unique: true},
  occupation: {type: String, required: true, unique: true},
  portfolio: [{type: Schema.Types.ObjectId, ref: "Project"}],
  password: {type: String, required: true},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});


const User = mongoose.model('User', userSchema);

module.exports = User;