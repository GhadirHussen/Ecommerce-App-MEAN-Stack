const CartModel = require('../models/CartModel');
const Cart = require('../models/CartModel');
const ProductModel = require('../models/ProductModel');


function getOneCart(id) {
    return new Promise((res, rej) => {
        Cart.findOne({ user: id }).populate('cartItems.product').populate('user').exec((err, cart) => {
            if (err) { rej(err) }
            if(cart) {
                cart.cartItems.find(i => {
                    i.totalPrice  =+ (i.quantity * i.product.price);
                    const finalPrice = cart.cartItems.reduce((sum, item) => {
                        return sum + item.totalPrice;
                    },0);
                    cart.finalPrice = finalPrice;
                });
                res(cart);
            } else {
                res(cart);
            }
        }); 
    });   
}  

module.exports = {
    getOneCart
};


