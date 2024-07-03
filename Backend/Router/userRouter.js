const express=require('express');
const user_router=express();
const userController=require('../Controller/userController');
const  upload  = require('../config/multer');
const verifyToken = require('../middleware/verifyToken');

user_router.post('/login',userController.loginUser);
user_router.post('/signup',upload.single('file'),userController.signUpUser);
user_router.get('/user/:userId',userController.getUserData)

module.exports=user_router;