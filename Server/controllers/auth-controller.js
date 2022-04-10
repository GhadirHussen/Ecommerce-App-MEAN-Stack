const router = require('express').Router();
const UserModel = require('../models/UserModel');
const bl = require('../business logic/auth-logic');
const jwt = require('jsonwebtoken');
const verifyToken = require('../helpers/verifyToken');
const bcrypt = require('bcrypt');
const getToken = require('../helpers/getToken');


router.post("/register", async (request, response) => {
    try{

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(request.body.password, salt);
        const user = new UserModel({
            firstName: request.body.firstName, 
            lastName: request.body.lastName,
            userName: request.body.userName,
            email: request.body.email,
            password: hashPassword,
            city: request.body.city,
            street: request.body.street,
            isAdmin : false,
        });
        const errors = user.validateSync();
        if(errors) return response.send(errors.message);
        const checkUserName = await UserModel.findOne({userName: user.userName});
        if(checkUserName) return response.status(400).json({message: "User Name already exists !"})
         
        // if(checkUserName) return response.status(400).send('User Name already exists');

        const createUser = await bl.register(user)

        response.status(201).json(createUser);
        
        
    }  
    catch {
        response.status(500);
    }
});


router.post("/login", async (request, response) => {
    try{

        const userObj = new UserModel({
            userName: request.body.userName,
            password: request.body.password
        });

        const user = await bl.login(userObj);
        const comparePassword = await bcrypt.compare(userObj.password, user.password)
        if(!user) {
            return response.status(400).send({ message: "The username does not exist" });
        }
        if(!comparePassword) {
            return response.status(400).send({ message: "The password / user name is invalid !" });
        }  
        
        const token = getToken({user: user});

        response.status(200).json({
            userName: user.userName,
            token: token
        });

        response.status(200).json({
            message: "You are logdin",
            user:user
        });
    }
    catch {
        response.status(500);
    }
});



// ///get the token ///
router.get('/user', verifyToken, async(request, response) => {
  
    jwt.verify(request.token, process.env.SECRET, (err, user) => {
        if (err) {
           return response.json(err);
        } else {
            return response.json(user);
        } 
    });
}); 




router.get("/" , async (request, response) => {
    try{
        const users = await bl.getAllUsers()
        response.status(201).json(users);
    }
    catch {
        response.status(500);
    }
   
});
 
 

module.exports = router;







