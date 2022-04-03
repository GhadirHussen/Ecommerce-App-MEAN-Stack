const router = require('express').Router();
const verifyToken = require('../helpers/verifyToken');
const OrderModel = require('../models/OrderModel');
const orderLogic = require('../business logic/order-logic');


// ////Create Order
router.post('/', verifyToken, async(req, res) => {

  try {
    const order = new OrderModel(req.body);
    const newOrder = await orderLogic.createOrder(order);
    res.status(201).json({order: newOrder})

  } catch (err) {
    res.status(500).json(err);
  }
}); 


////Get Order By User ID
router.get('/:userId', verifyToken, async(req, res) => {
 
  try {

    const order = await  orderLogic.getOrderByUserId(req.params.userId);
    res.status(200).json(order);
  } catch (err) {
      res.status(500).json(err); 
  }
});



 
///Get all order 
router.get('/', verifyToken, async(req, res) => {
 
  try {

    const orders = await orderLogic.getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err); 
  }
})
  
module.exports = router;