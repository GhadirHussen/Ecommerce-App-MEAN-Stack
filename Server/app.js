global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
require('./data-access-layer/mongodb-dal');
const express = require('express');
const cors = require("cors");
const server = express();
const fileupload = require("express-fileupload");
const port = 3030;
const localhost = 'http://localhost:';
const verifyToken = require('./verifyToken');

const ProductController = require('./controllers/products-categories-controller');
const AuthController = require('./controllers/auth-controller');
const CartController = require('./controllers/cart-controller');
const OrderController = require('./controllers/order-controller');


server.use(express.json());
server.use(cors());
server.use(express.urlencoded({extended: true}));
server.use(fileupload());

// server.use(verifyToken)
server.use('/api/user', AuthController);
server.use('/api', ProductController);
server.use('/api/cart', CartController);
server.use('/api/order', OrderController);



 
server.listen(port, () => console.log(`Listening on ${localhost}${port}`));

 