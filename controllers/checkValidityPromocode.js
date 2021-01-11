const PromoSchema=require('../models/promocode_schema');

//check the validity of promocode and apply
module.exports.checkValidity=async function(req,res){
    try{
        await changeValidity();
        console.log(req.body);
        var promo=await PromoSchema.find({promo_code : req.body.promocode});
        var data1;
        promo.map(function(data){
            console.log(data);
            data1=data;
        })
        if(promo && data1.Validity=="active"){
            var Distance=getDistanceFromLatLonInKm(req.body.lat1,req.body.lon1,req.body.lat2,req.body.lon2);
            console.log(Distance);
            if(Distance<=data1.radius){
                var result=await PromoSchema.updateOne({promo_code : req.body.promocode}, {Validity : "expired"});
                return res.json(200,{
                    message: "Promocode is valid and applied successfully and use only one time(because it expired after one time use)",
                    data:{
                        Promocode : data1
                    }
                    
                });

            }else{
                return res.json(200,{
                    message: "Promocode is not valid because pickup or destination is not within x radius  ",
                });
            }
        }else{
            return res.json(200,{
                message: "Promocode is already expired",
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

//here calculate distance between two points
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return Math.round(d);
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }


//use for change the Validity of coupon as expired when date is gone.
  async function changeValidity(){
    try{
        console.log("dnbdskjvbdkfjvb");
        var data=await PromoSchema.find({})
        data.map(function(d){
            var expired=d.expired_at.setDate(d.expired_at.getDate());
            var dt= new Date();
            var date=dt.setDate(dt.getDate());
            //console.log(expired+"dv"+dt);
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