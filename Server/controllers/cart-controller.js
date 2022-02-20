const router = require('express').Router();
const CartModel = require('../models/CartModel');
const ProductModel = require('../models/ProductModel');
const UserModel = require('../models/UserModel');
const userModel = require('../models/UserModel');
const verifyToken = require('../verifyToken');
const jwt = require('jsonwebtoken');
const cartsLogic = require('../business logic/carts-logic');


////Get cart by user id
router.get('/:userId', async (req, res) => {
  try {
      const cart = await cartsLogic.getOneCart(req.params.userId);
      res.status(200).json(cart);
  }
  catch (err) { res.status(500).send(err.message) }
});

////Create cart & insert product to the cart array
router.post("/", verifyToken, async (req, res) => {

    const cart = new CartModel(req.body)
    CartModel.findOne({user: cart.user}).exec((err, myCart) =>{

      if(err) return res.json({err});
      if(myCart) {
        
        const newItem = req.body.cartItems.find(i=> i);
        const oldItem = myCart.cartItems.find(c =>c.product == newItem.product);
        if(oldItem) {
          res.status(400).json({
            message: "You have this product in your cart!"
          }) 

        } else {
          CartModel.findOneAndUpdate({user: cart.user}, {
            "$push": {
              "cartItems": req.body.cartItems
            }
            
          /// test to check if i can show the product in the cart
          }).populate('cartItems.product')
          .exec((err, _cart) => {
            if(err) return res.status(400).json({
              message: 'this product is not found',
              err: err
            });
            if(_cart) {
                return res.status(201).json({Cart: _cart})
            }
          });
        }
      }
    
      else {
        cart.save((err, cart) => {
          if(err) return res.status(400).json({err: 'hjalkdjlksadksd'});
          if(cart) {
            return res.status(201).json({Cart: cart})
          }
        });
      }
    })

});

  ////Update item from the cart array
  router.put("/:cartId/:productId", verifyToken, async (req, res) => {
  try {

    const updatedCart = await CartModel.updateOne(
      {
        _id: req.params.cartId,  "cartItems.product": req.params.productId
      },
      {
        "$set" : {
          "cartItems.$": req.body.cartItems,
        }
      },
    
    );

    res.status(201).json(updatedCart)
  } catch (err) {
    res.status(500).json(err);
  }
});


  ////Delete item from the cart array
  router.put("/removeItem/:cartId/:itemId", verifyToken, async (req, res) => {
    try {

      const removeItem = await CartModel.updateOne(
        {
          _id: req.params.cartId, 
        },
        {
          "$pull" : {
           "cartItems": {"_id": req.params.itemId}
         
          },
        }
     
      );

      res.status(201).json(removeItem);
      console.log(removeItem)
    } catch (err) {
      res.status(500).json(err);
    }
  });

  ////delete all the items from the cart array
  router.put("/:cartId", verifyToken, async (req, res) => {
    try {

      const clearCart = await CartModel.updateOne(
        {
         "_id": req.params.cartId
        },
        {
          "$set": {
            "cartItems": []
          }
        }
     
      ); 

      res.status(201).json(clearCart);
      console.log(clearCart)
    } catch (err) {
      res.status(500).json(err);
    }
  });



  
  module.exports = router; 