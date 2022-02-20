const OrderModel = require('../models/OrderModel');


const createOrder = (order) => {

    return new Promise((res, rej) => {
      
        order.save((err, newOrder) => {
            if(err) rej(err);
            if(newOrder) {
               res(newOrder);
            }
        });
    });
}

const getOrderByUserId = (userId) => {

    return new Promise((res, rej) => {
        OrderModel.find({ userId: userId }).populate('user')
            .populate({
                path: 'cart',
                populate: {
                    path: "cartItems.product"
                },
            }).exec((err, order) => {
                if(err) rej(err);
                if(order){
                    res(order);
                }
            });
    });
}


const getAllOrders = () => {

    return new Promise((res, rej) => {
      
        OrderModel.find().populate('user').
            populate('cart').exec((err, order) => {
            if(err) rej(err);
            if(order){
                res(order);
            }
        });
    });
}


module.exports = {
    createOrder,
    getOrderByUserId,
    getAllOrders

}