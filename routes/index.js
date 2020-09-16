const express=require('express');
const router=express.Router();
const userController=require('../controllers/user_controller')
router.get('/',userController.signUp);
//further use for routers
router.use('/users',require('./users'));
// router.use('/routerName', require('./routerfile));



module.exports=router;