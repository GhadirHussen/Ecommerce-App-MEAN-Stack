const mongoose = require('mongoose');
require('./UserModel');

const RestPasswordSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    token: {
        type: String,
        require: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
        expires: 10000 ///after 10 minutes this document will be deleted
    }

},{versionKey: false, toJSON: {virtuals: true}});



const RestPasswordModel = mongoose.model("RestPasswordModel", RestPasswordSchema, 'RestPasswords');

module.exports = RestPasswordModel

