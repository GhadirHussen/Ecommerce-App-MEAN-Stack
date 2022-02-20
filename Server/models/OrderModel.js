const mongoose = require("mongoose");
require("./ProductModel");
require("./UserModel");
require("./CartModel");

const OrderSchema = mongoose.Schema({
    
  userId: mongoose.Schema.Types.ObjectId,
  cartId: mongoose.Schema.Types.ObjectId,

  // cart: { type: mongoose.Schema.Types.ObjectId, ref: 'CartModel' },

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

  cardNumber: {
    type: String,
    required: [true, 'the Number is required'],
    minlength: [15, "card number must be at least 15 number"],
    maxlength: [16, "card number can`t be more tha 16 number"],
    min: [0, 'card number can`t be negative']
  },


  month:  {
    type: Number,
    required: [true, 'the month is required,have to be like (01)'],
    minlength: [2, "month must be at least 2 number,have to be like (01)"],
    maxlength: [2, "month can`t be more tha 2 number,have to be like (01)"],
    min: [0, 'the month can`t be negative']
  },
  year:  {
    type: Number,
    required: [true, 'the year is required,have to be like (2020)'],
    minlength: [2, "year must be at least 4 number,have to be like (2020)"],
    maxlength: [2, "year can`t be more tha 4 number,have to be like (2020)"],
    min: new Date().getFullYear()
  },

  cvv: {
    type: String,
    required: [true, 'the cvv is required,have to be like (123)'],
    minlength: [3, "cvv must be at least 2 number,have to be like (123)"],
    maxlength: [3, "cvv can`t be more tha 2 number,have to be like (123)"],
    min: [0, 'the cvv can`t be negative']
  },

  shippingDate: {
    type: String,
    required: true, 
  },

  totalPrice: Number
 
},{ versionKey: false, toJSON: {virtuals: true}});


OrderSchema.virtual("user", { 
    foreignField: "_id", 
    localField: "userId", 
    ref: 'UserModel', 
}); 

 
OrderSchema.virtual("cart", {  
  foreignField: "_id", 
  localField: "cartId", 
  ref: 'CartModel',
  // justOne: true
});



const OrderModel = mongoose.model('OrderModel', OrderSchema, 'orders');
module.exports = OrderModel;

