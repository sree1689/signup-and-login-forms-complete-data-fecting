const express=require('express');
const router=express.Router();
const login=require('../controllers/loginControllers')
router.post('/login',login);

module.exports=router;