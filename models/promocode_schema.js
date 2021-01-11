const mongoose=require('mongoose');

const promoSchema=new mongoose.Schema({
    promo_code:{
        type:String, 
        unique:true,
        required:true
    },
    Amount:{
        type:Number, 
        required:true
    },
    Validity:{
        type:String, 
        required:true
    },
    expired_at:{
        type:Date, 
        required:true
    },
    radius:{
        type:String,
        required:true
    }
},
    {
        timestamps: true
    }
);

const Promo=mongoose.model('promo',promoSchema);


module.exports=Promo;