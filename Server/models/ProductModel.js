const mongoose = require("mongoose");
require("./CategoryModel");
require("./UserModel");
require("./CartModel");
require("./OrderModel");

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
        minlength: [2, "Name must be at least 2 characters long"],
        maxlength: [20, "Name cannot exceed 100 characters"]
    },
    price:  { 
        type: Number,
        required: [true, "Price is required."],
        minlength: [0, "Price must be a positive number"],
        maxlength: [1000, "Price must not exceed 1000"]
    },
    stock:  {
        type: Number,
        required: [true, "Stock is required."],
        min: [0, "Stock must be a positive number"],
        maxlength: [1000, "Stock must not exceed 1000"]
    },
    imageName: String,
    categoryId: mongoose.Schema.Types.ObjectId,


},{ versionKey: false, toJSON: {virtuals: true}});




ProductSchema.virtual("category", { 
    foreignField: "_id",
    localField: "categoryId",
    ref: 'CategoryModel', 
    justOne: true
});



 
 
const ProductModel = mongoose.model('ProductModel', ProductSchema, 'products');

module.exports = ProductModel; 

