const express=require('express');

const router = express.Router();

//here add all controllers
const promo = require('../controllers/promocode');
const validPromo=require('../controllers/checkValidityPromocode');

//for creating promocode
router.post('/create',promo.create);
//for deactivate promocode
router.post('/deactivate',promo.deactivate);
//for update radius
router.post('/updatepromoRadius',promo.updatepromoRadius);
//for getting all promo codes
router.get('/allPromo',promo.allPromo);
//for getting all active promocodes
router.get('/allactivePromo',promo.allActivePromos);
//for check the validity of promocode
router.post('/checkValidityandApply',validPromo.checkValidity);

module.exports=router;