const mongoose = require("mongoose");
require("./ProductModel");


const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
        minlength: [2, "Name must be at least 2 characters long"],
        maxlength: [100, "Name cannot exceed 100 characters"]
    },

    
},{ versionKey: false, toJSON: {virtuals: true}});



const CategoryModel = mongoose.model('CategoryModel', CategorySchema, 'categories');

module.exports = CategoryModel;    