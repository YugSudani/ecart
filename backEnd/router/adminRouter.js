const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
// __________________________________________For User Management
//___________________________________________For Product Managment
const prdModel = require("../model/prdModel");




router.get("/ordersOfUser" , async (req,res)=>{

    try{
        const response = await userModel.find({ "orders.0":{ $exists:true}});

        //  console.log("RES : "+response);

        if(response){
            res.json({result:"succese" , data:response});
        }else{
            res.json({result:"fail"});
    }}catch(err){
        res.status(500).json({error:"went wrong"});
    }

});

router.post("/mark_as_delivered" , async (req,res)=>{
    try{
        const orderID = req.body.order_id;

        const response = await userModel.findOneAndUpdate({ "orders._id": orderID},
            {
                $set:{"orders.$.status":"delivered"}
            });

        if(response){
            res.json({result:"succese"});
        }else{
            res.json({result:"fail"});
    }}catch(err){
        res.status(500).json({error:"went wrong"});
    }
    
});



router.post("/setPrd" , async(req,res)=>{

    try{
        const {prdid,title,price,description,category,image,rating} = req.body;

        // console.log(req.body);

        prdModel.create({
            prdid,
            title,
            price,
            description,
            category,
            image,
            rating
        });
        
        res.json({result:"success"});
    }catch(err){
        res.status(500).json({error:"went wrong"});
    }
});


router.get("/delprd" , async (req,res)=>{
    // console.log("Deleting Product From DB")
    try{
        const prdid = req.query.prdid;

        const response = await prdModel.deleteOne({prdid});

        if(response.acknowledged === true &&  response.deletedCount > 0){
            res.json({result:"succese"});
        }else{
            res.json({result:"fail"});
    }}catch(err){
        res.status(500).json({error:"went wrong"});
    }

});


module.exports = router;