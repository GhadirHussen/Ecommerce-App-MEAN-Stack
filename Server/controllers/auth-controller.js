const router = require('express').Router();
const UserModel = require('../models/UserModel');
const bl = require('../business logic/auth-logic');
const jwt = require('jsonwebtoken');
const verifyToken = require('../helpers/verifyToken');
const bcrypt = require('bcrypt');
const getToken = require('../helpers/getToken');
const sendEmail = require('../helpers/sendMail');
const uuid = require('uuid');
const TokenModel = require('../models/RestPasswordModel');

router.post("/register", async (request, response) => {
    try{

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(request.body.password, salt);
        const user = new UserModel({...request.body, password: hashPassword});

        const errors = user.validateSync();
        if(errors) return response.send(errors.message);
        const checkUserName = await UserModel.findOne({userName: user.userName});
        if(checkUserName) return response.status(400).json({message: "User Name already exists !"})
         
        const createUser = await bl.register(user)

        response.status(201).json(createUser);
        
        
    }  
    catch {
        response.status(500);
    }
});


router.post("/login", async (request, response) => {
    try{

        const userObj = new UserModel(request.body);
   
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
            token: token,
            message: "You are logdin",
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


router.post('/send-email-reset', async(req, res) => {

    try {

        const user = await UserModel.findOne({email: req.body.email});
        if(!user) return res.send('Email not found');

        let token = await TokenModel.findOne({userId: user._id});
        
        if(!token) {
            token = await new TokenModel({
                userId: user._id,
                token: process.env.SECRET + uuid.v4(),
            }).save(); 
             
        }

        const link = `http://${process.env.CLIENT_URL}/passwordReset/${user._id}/${token.token}`;

        sendEmail(user.email, "Password Reset", link);
        
        res.status(201).json({message: 'Password reset link has been sending to your email account'});
 
    } catch(err) {
        res.status(500).send(err);
    }
});
  
router.post('/reset-password/:userId/:token', async(req, res) => {

    try {

        const user = await UserModel.findById(req.params.userId);
        if(!user) return res.status(400).send('invalid link/expired');

       
        let token = await TokenModel.findOne({
            userId: user._id,
            token: req.params.token
        });

        
        if(!token) return res.status(400).send('invalid link/expired');

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashPassword;
        await user.save();
        await token.delete();
        sendEmail(user.email, "Password Reset", 'Hi dear your password has been changed');
        res.send({message: 'Password has been changed successfully'});

    } catch(err) {
        res.status(500).send(err);
    }
});

router.get('/verify-email-reset', async(req, res) => {

    try {

        let token = await TokenModel.find().exec();

        res.json(token);

    } catch(err) {
        res.status(500).send(err);
    }
});


module.exports = router;




 


 