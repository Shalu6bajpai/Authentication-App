//Routes 
const express=require('express');
const router=express.Router();
const passport=require('passport');
const usersController=require('../controllers/user_controller');
router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/sign-in',usersController.signIn);
router.post('/create',usersController.create);
//use passport as the middleware as authenticate
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
    ),usersController.createSession);
    

router.get('/sign-out',usersController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),
usersController.createSession);
//forget-password
router.get('/forget-password',usersController.forgetpassword);
router.post('/reset-password',usersController.reset);  
router.post('/changePwd',usersController.changePwd);    
module.exports=router;