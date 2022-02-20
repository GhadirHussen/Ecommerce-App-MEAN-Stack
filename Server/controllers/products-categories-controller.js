const express = require("express");
const router = express.Router();
const bl = require('../business logic/products-categories-logic');
const CategoryModel = require("../models/CategoryModel");
const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/UserModel");
const verifyToken = require("../verifyToken");
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const path = require('path');



///Product Api
const getProducts = async (request,response) => {
    try{
        const products = await bl.getAllProducts();
        response.status(200).json(products);
    
    }catch {
        response.status(500);
    } 
}  

router.get("/products", getProducts);


router.get("/products/:id" ,async(request,response)=> {
    try{
        const id =  request.params.id;
        const product = await bl.getProductById(id);
        response.status(200).json(product);
    }catch {
        response.status(500);
    }  
});

router.get("/products/search",getProducts);

router.get("/products/search/:name", async (request, response) => {
    try{
        const productName = request.params.name;
        const regex = new RegExp(productName, 'i');
        const product = await bl.Search(regex);
        if(!product.length){
            response.send("no product with this letter");;
        }
        response.status(200).json(product);
    }catch {
        response.status(500);
        
    }  
});


router.post("/products", verifyToken, async (request, response) => {
    try{

        jwt.verify(request.token, 'secuerty', (err, authData) => {
            if (authData.user.isAdmin !== true) {
               response.send('You are not admin')
            }
        });
        const product = new ProductModel(request.body);
        const error = product.validateSync();

        if(error) {
            response.status(404).json(error);
        }

        const image = request.files && request.files.image ? request.files.image : null;
        if (!image) return response.status(400).send("Missing image.");
        const products = await bl.addNewProduct(product, image);
        response.status(201).json(products);
    }
    catch {
        response.status(500);
    }
});

//  router.put('/products/:id', verifyToken, async (request ,response) => {

//     try {
//         jwt.verify(request.token, 'secuerty', (err, authData) => {
//             if (authData.user.isAdmin !== true) {
//                response.send('You are not admin')
//             }
//         });
//         const product = new ProductModel(request.body);
//         // const product = new ProductModel({
//         //     _id: request.params.id,
//         //     name: request.body.name,
//         //     price: request.body.peice,
//         //     stock: request.body.stick,
//         //     imageName: request.body.imageName,
//         //     id: request.params.id,
//         // });
//         const id = request.params.id;
//         product.id = id;

//         const image = request.files && request.files.image ? request.files.image : null;
//         if (!image) return response.status(400).send("Missing image.");
//         const productToUpdate = await bl.updateProduct(product, image);
    
//         response.send(productToUpdate).status(204);
//     }
//     catch {
//         response.status(500);
//     } 
//  }); 





router.put('/products/:id', verifyToken, async (request ,response) => {

    try {
        jwt.verify(request.token, 'secuerty', (err, authData) => {
            if (authData.user.isAdmin !== true) {
               response.send('You are not admin')
            }
        });
        const id = request.params.id; 
        const product = new ProductModel(request.body);
        product._id = id;

    
         if (request.files) {
            const file = request.files.image;
            product.imageName = file.name;
            // file.mv('../../Client/src/assets/products/' + product.imageName);
            const absolutePath = path.join(__dirname, "..", "..", "Client", "src", "assets", "products", product.imageName);
            await file.mv(absolutePath);
        }


        const updatedVacation = await bl.updateProduct(product);
        response.json(updatedVacation);
        
    }
    catch {
        response.status(500); 
    } 
 }); 




////Categoires

 router.get('/categories' ,async (request ,response) => {
    try{
       const categories =  await bl.getAllCategories();
        response.status(200).json(categories);
    }
    catch(err) {
        response.status(500).send(err)
    }
 
});

router.get('/categories/:id' ,async (request ,response) => {
    try{
        const id = request.params.id;
        const categories =  await bl.getProductByCategry(id);
        response.status(200).json(categories);
    }
    catch(err) {
        response.status(500).send(err);
    }

}); 



module.exports = router;
