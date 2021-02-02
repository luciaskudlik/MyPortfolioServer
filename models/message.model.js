const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./user.model")
const Chat = require('./chat.model')


const messageSchema = new Schema({
    chat: {type: Schema.Types.ObjectId, ref:"Chat"},
    sentBy: {type: Schema.Types.ObjectId, ref:"User"},
    text: 'String',

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});


const Message = mongoose.model('Message', messageSchema);

module.exports = Message;