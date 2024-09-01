const express=require('express');
const router=express.Router();

const {signup,getAllusers, getuserbyid, updateUser, deleteuser}=require('../controllers/signupControllers')

router.post('/signup',signup);
router.get('/signup',getAllusers);
router.get('/signup/:id',getuserbyid);
router.put('/signup/:id',updateUser);
router.delete('/signup/:id',deleteuser);

module.exports=router;
