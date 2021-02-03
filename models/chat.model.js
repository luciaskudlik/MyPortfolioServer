const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./user.model");
const Message = require('./message.model');



const chatSchema = new Schema({
  participants: [{type: Schema.Types.ObjectId, ref:"User"}],
  messages: [{type: Schema.Types.ObjectId, ref:"Message"}],
  
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});


const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;