const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const chatSchema = new Schema({
    chatRoom: {
        type: String,
        require: true
    },
    userId: {
        type: String
    },
    message: {
       type: String,
    }
 
}, {timestamps: true});

module.exports = mongoose.model('chats', chatSchema)