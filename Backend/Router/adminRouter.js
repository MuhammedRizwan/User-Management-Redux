const express=require('express')
const admin_router=express()
const adminController=require('../Controller/adminController');
const  upload  = require('../config/multer');

admin_router.post('/',adminController.loginAdmin);
admin_router.get('/fetchUserData',adminController.fetchUserData);
admin_router.post('/updateUser/:userId',upload.single('file'),adminController.updateUser);
admin_router.delete('/deleteUser/:userId',adminController.deleteUser);
admin_router.post('/addUser',upload.single('file'),adminController.addUser)
module.exports=admin_router