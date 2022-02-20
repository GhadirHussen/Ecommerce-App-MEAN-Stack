const mongoose = require('mongoose');
require('./CartModel');

const UserSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "First Name is required."],
        minlength: [4, "First Name must be at least 4 characters long"],
        maxlength: [10, "First Name cannot exceed 10 characters"]

    },
    lastName: {
        type: String,
        required: [true, "Last Name is required."],
        minlength: [4, "Last Name must be at least 4 characters long"],
        maxlength: [10, "Last Name cannot exceed 10 characters"]

    },
    userName: {
        type: String,
        required: [true, "Name is required."],
        minlength: [3, "Name must be at least 2 characters long"],
        maxlength: [15, "Name cannot exceed 100 characters"]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [4, "Password must be at least 6 numbers"],
        min: [0, "Password cannot be negative number"]
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: [true, "City Name is required."],
        minlength: [3, "City Name must be at least 3 characters long"],
        maxlength: [20, "City Name cannot exceed 20 characters"]

    },
    street: {
        type: String,
        required: [true, "Street Name is required."],
        minlength: [3, "Street Name must be at least 3 characters long"],
        maxlength: [20, "Street Name cannot exceed 20 characters"]

    },
    isAdmin: {
        type: Boolean
    },

},{versionKey: false, toJSON: {virtuals: true}});



const UserModel = mongoose.model("UserModel", UserSchema, 'users');

module.exports = UserModel

