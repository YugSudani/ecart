const express = require('express');
const router = express.Router();
const prdModel = require("../model/prdModel");
const { getUID } = require("../services/UIDcenter");


//setPrd is moved to admin


router.get("/getprdbycategory", async(req,res)=>{

    try{
        const category = req.query.category;

        // console.log(category)
        const products = await prdModel.find({category});
        if(!products){
            res.json({result:"No products for this category"});
        }else{
            res.json({result:"Category prds found" , productData:products});
    }}catch(err){
        res.status(500).json({error:"went wrong"});
    }
});


// returns products of IDs provided
router.get("/getprdbyprdid" , async(req,res)=>{

    try{
        const idData = req.query.idData;
        const idArray = idData.split(",");

        const cartItems = await prdModel.find({ prdid: { $in: idArray } });
        
        if(!cartItems){
            res.json({result:"failed"})
        }else{
            res.json({result:"succese" , products:cartItems});
    }}catch(err){
        res.status(500).json({error:"went wrong"});
    }
});




//delprd is moved to admin


module.exports = router;