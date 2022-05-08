require('dotenv').config({path: './.env'});
require('./data-access-layer/mongodb-dal');
const express = require('express');
const path = require('path');
const cors = require("cors");
const server = express(); 
const fileupload = require("express-fileupload");
const port =  process.env.PORT || 3030;
const localhost = 'http://localhost:';
const verifyToken = require('./helpers/verifyToken');

const ProductController = require('./controllers/products-categories-controller');
const AuthController = require('./controllers/auth-controller');
const CartController = require('./controllers/cart-controller');
const OrderController = require('./controllers/order-controller');

server.use(express.json());
server.use(cors());
server.use(express.urlencoded({extended: true}));
server.use(fileupload());
server.use('/api/user', AuthController);
server.use('/api', ProductController);
server.use('/api/cart', CartController);
server.use('/api/order', OrderController);

server.use(express.static(__dirname + "/Client"));


 
server.listen(port, () => console.log(`Listening on ${localhost}${port}`));

 