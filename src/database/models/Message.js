const { Schema, model, mongoose } = require('mongoose');

const Message = model("Message", new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    }
}, { timestamps : true }));

module.exports = mongoose.model("Message") || Message;