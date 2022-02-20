const mongoose = require("mongoose");
require("./ProductModel");
require("./UserModel");

const CartSchema = mongoose.Schema({
    
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    cartItems: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "ProductModel" },
        quantity:{ type: Number, default: 1},
        totalPrice: {type: Number, default: 0}, 
    }],

    finalPrice: Number, 
    active: Boolean
},{versionKey: false, toJSON: {virtuals: true}});



CartSchema.virtual("product", {
    localField: "productId",
    ref: "ProductModel", 
    foreignField: "_id"
});
  



const CartModel = mongoose.model('CartModel', CartSchema, 'carts');
module.exports = CartModel;


