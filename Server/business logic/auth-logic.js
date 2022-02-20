const UserModel = require('../models/UserModel');
require('../data-access-layer/mongodb-dal');





const getAllUsers = async () => {
    return UserModel.find().exec();
}



const register = async (user) => {
    return user.save();

 
}
 
const login = async (user) => {
     return UserModel.findOne({ userName: user.userName }).exec();
     
}





module.exports = {
    getAllUsers,
    register,
    login

}