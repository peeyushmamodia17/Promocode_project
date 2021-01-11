const PromoSchema=require('../models/promocode_schema');
const crypto=require('crypto');


//here we create the promocode and return it
module.exports.create=async function(req,res){
    try{
        await changeValidity();
        console.log(req.body);
        var promo=crypto.randomBytes(2).toString('hex');
        var d= new Date();
        var expired=d.setDate(d.getDate() + 30);
        var Vali='active';
        
        var promocode=await PromoSchema.create({
            promo_code : promo,
            Amount : req.body.amount,
            Validity : Vali,
            expired_at : expired,
            radius : 5
        })     
    

        return res.json(200,{
            message: "Promocode created Successfully",
            data:{
                Promocode : promocode
            }
            
        });

    }catch(err){
        console.log(err);
        return res.json(400,{
            message: "Error",
            error: err
        });
    }
}

//here we deactivate the promocode by change its Validity as expired pass promocode in body
module.exports.deactivate=async function(req,res){
    //console.log(req.body.promocode);
    try{
        await changeValidity();
        var promo=await PromoSchema.find({promo_code : req.body.promocode});
        var data1;
        promo.map(function(data){
            console.log(data);
            data1=data.Validity;
        })
        if(promo && data1=="active"){
            var result=await PromoSchema.updateOne({promo_code : req.body.promocode}, {Validity : "expired"});
            if(result){
                var promo1=await PromoSchema.find({promo_code : req.body.promocode});
                return res.json(200,{
                    message: "Promocode deactivated Successfully",
                    data:{
                        Promocode : promo1
                    }
                    
                });
            }
            
        }else{
            return res.json(200,{
                message: "Promocode doesn't exist or already expired",
                
            });
        }
    }catch(err){
        console.log(err);
        return res.json(400,{
            message: "Error",
            error: err
        });
    }
   

}

//here we update radius of promocode by pass promocode and radius in body
module.exports.updatepromoRadius=async function(req,res){
    //console.log(req.body.promocode);
    try{
       await changeValidity();
        var promo=await PromoSchema.find({promo_code : req.body.promocode});
        var data1;
        promo.map(function(data){
            console.log(data);
            data1=data.Validity;
        })
        if(promo && data1=="active"){
            var result=await PromoSchema.updateOne({promo_code : req.body.promocode}, {radius : req.body.radius});
            if(result){
                var promo1=await PromoSchema.find({promo_code : req.body.promocode});
                return res.json(200,{
                    message: "Promocode radius changed Successfully",
                    data:{
                        Promocode : promo1
                    }
                    
                });
            }
            
        }else{
            return res.json(200,{
                message: "Promocode doesn't exist or already expired",
                
            });
        }
    }catch(err){
        console.log(err);
        return res.json(400,{
            message: "Error",
            error: err
        });
    }
   

}


//here we get all promocodes
module.exports.allPromo=async function(req,res){

    try{
        await changeValidity();
        var promos=await PromoSchema.find();

        if(promos){
            return res.json(200,{
                message: "All Promo Codes",
                data:{
                    Promocode : promos
                }
                
            });
    
        }else{
            return res.json(200,{
                message: "Promo Codes are not available",
                
            });
        }
    }catch(err){
        console.log(err);
        return res.json(400,{
            message: "Error",
            error: err
        });
    }
}

//here we get all active promocodes
module.exports.allActivePromos=async function(req,res){
    try{
        await changeValidity();
        var promos=await PromoSchema.find({Validity : "active"});

        if(promos){
            return res.json(200,{
                message: "All Promo Codes",
                data:{
                    Promocode : promos
                }
                
            });
    
        }else{
            return res.json(200,{
                message: "Promo Codes are not available",
                
            });
        }

    }catch(err){
        console.log(err);
        return res.json(400,{
            message: "Error",
            error: err
        });
    }
}


//use for change the Validity of coupon as expired when date is gone.
changeValidity();

async function changeValidity(){
    try{
        
        var data=await PromoSchema.find({})
        data.map(function(d){
            var expired=d.expired_at.setDate(d.expired_at.getDate());
            var dt= new Date();
            var date=dt.setDate(dt.getDate());
            if(expired<=date){
                PromoSchema.updateOne({_id : d._id}, {Validity : "expired"},function(err,result){
                    if(err){
                        console.log(err);
                    }
                });
            }
        })
    }catch(err){
        console.log(err);
        return res.json(400,{
            message: "Error",
            error: err
        });
    }
    
}
