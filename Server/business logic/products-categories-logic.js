const path = require('path');
const CategoryModel = require('../models/CategoryModel');
const ProductModel = require('../models/ProductModel');
require('../data-access-layer/mongodb-dal');


////Products

const getAllProducts = async () => {
    return ProductModel.find().populate('category').exec();
}

const getProductById = async (id) => {
    return ProductModel.findById(id).populate('category').exec();
}

const Search = async (productName) => {
    return ProductModel.find({name: productName}).exec();
}
 

const addNewProduct = async (product, image) => {


    if(image) {
        product.imageName = image.name;
        const absolutePath = path.join(__dirname, "..", "..", "Client", "src", "assets", "products", product.imageName);
        await image.mv(absolutePath);
       
    }
    return product.save();
}
 


const updateProduct = async (product) => {


    const result = ProductModel.findOneAndUpdate({_id: product._id}, product).exec()
    if (result.matchedCount === 0) {
        return null;
    } else {
        // Check if data was changed
        if (result.modifiedCount === 0) { 
            // Do nothing
        }

        return product;
    }
}

//Categories

const getAllCategories = async () => {
    return await CategoryModel.find().exec();
}



async function getProductByCategry(categoryId) {
    return ProductModel.find({categoryId}).exec();
}



module.exports = {
    getAllProducts,
    getProductById,
    Search,
    addNewProduct,
    updateProduct,
    getAllCategories,
    getProductByCategry

}