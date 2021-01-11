const express=require('express');

const router = express.Router();

//here we transfer route to api folder when /api occour
router.use('/promocode',require('./promocode'));

module.exports=router;