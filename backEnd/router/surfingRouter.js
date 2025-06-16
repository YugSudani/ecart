const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const { getUID } = require("../services/UIDcenter");
  
//here we are using same userModel as user router but it's created differently so we can apply middleware in userAcc operation after signup login
router.get("/userinfo", async (req,res)=>{

    // console.log("taking user info");
  try{
        const UIDCookie = req.cookies?.UID;
        const UIDuserMap = getUID(UIDCookie);
        const _id = UIDuserMap._id;

        const user = await userModel.findOne({_id});
        if(!user){
            res.json({result:"fail"})
        }else{
            res.json({result:"succese", data:user});   
    }}catch(err){
        res.status(500).json({error:"went wrong"});
    }  
});
// Find with _id instad name(can be same)

router.post("/updateEmail", async (req,res)=>{

    // console.log("updating Email");
try{
        const UIDCookie = req.cookies?.UID;
        const UIDuserMap = getUID(UIDCookie);
        const _id = UIDuserMap._id;
        const {email} = req.body;
        
        const user = await userModel.findOneAndUpdate({_id},{email});
        if(!user){
            res.json({result:"fail"})
        }else{
            res.json({result:"succese"});   
    }}catch(err){
        res.status(500).json({error:"went wrong"});
    }  

});


router.post("/updatepwd" , async(req,res)=>{
    // console.log("updating password");
try{
    const { oldPassword,newPassword } = req.body;

    const UIDCookie = req.cookies?.UID;
    const UIDuserMap = getUID(UIDCookie);
    const _iD = UIDuserMap._id;

    const user = await userModel.findOneAndUpdate({_id:_iD,password:oldPassword}, {password:newPassword});

    if(!user){
        res.json({result:"fail"});
    }else{
        res.json({result:"success"});
}}catch(err){
        res.status(500).json({error:"went wrong"});
}
});


// returns cartprdid from user's account
router.get("/getprdbyuser" , async(req,res)=>{
try{
    const UIDCookie = req.cookies?.UID;
    const UIDuserMap = getUID(UIDCookie);
    const _id = UIDuserMap._id;

    const user = await userModel.findOne({_id});

    if(!user){
        res.json({result:"loginToViewCart"});
    }else{
        const user_cart_item_prdid = await user.cartPrdID;
        res.json({result:"succese" , user_cart_prd_ids:user_cart_item_prdid});
}}catch(err){
        res.status(500).json({error:"went wrong"});
}
});


router.post("/removefromcart" , async (req,res)=>{
try{
    const  prdid  = req.query.prdid; //for single prd deletion

    const UIDCookie = req.cookies?.UID;
    const UIDuserMap = getUID(UIDCookie);
    const _id = UIDuserMap._id;

    const response = await userModel.updateOne({_id},
        {
           $pull:({cartPrdID : prdid}) 
        });

        if(response.acknowledged){
            // console.log(response);
            res.json({result:"succese"});
        }else{
            res.json({result:"faild"});
    }}catch(err){
        res.status(500).json({error:"went wrong"});
    }
        // res.json({result:response});
});


router.post("/del_multiple_from_cart" , async (req,res)=>{
try{
    const  prdid  = req.body.prdids   //for multiple prd deletion

    const UIDCookie = req.cookies?.UID;
    const UIDuserMap = getUID(UIDCookie);
    const _id = UIDuserMap._id;

    console.log("prdid : "+prdid);
    const response = await userModel.updateOne({_id},
        {
           $pull:{cartPrdID: { $in: prdid}}
        });

        if(response.acknowledged){
            // console.log(response);
            res.json({result:"succese"});
        }else{
            res.json({result:"faild"});
    }}catch(err){
        res.status(500).json({error:"went wrong"});
    }
        // res.json({result:response});
});

router.post( "/placedorder",async(req,res)=>{
try{
    const {adrs,prds,total,status,title} = req.body;
    const UIDCookie = req.cookies?.UID;
    const UIDuserMap = getUID(UIDCookie);
    const _id = UIDuserMap._id;

    var user = await userModel.findOneAndUpdate({_id},{
        $push:{orders:{adrs,prds,total,status,title}}
    });

    if(!user){
        res.json({result:"failed"});
        console.log("fail")
    }else{
        res.json({result:"succese"});
        console.log("success")
}}catch(err){
        res.status(500).json({error:"went wrong"});
    }
});



router.get("/myorders" , async(req,res)=>{
try{
    const UIDCookie = req.cookies?.UID;
    const UIDuserMap = getUID(UIDCookie);
    const _id = UIDuserMap._id;

    var response = await userModel.find({_id},{"orders.prds":1 , "orders.status":1 , "orders._id":1 , "orders.total":1 , "orders.title":1});

    const orders = response[0]?.orders || [];

    const result = orders.map((ord)=>({
        prds:ord.prds,
        Status:ord.status,
        _id:ord._id,
        total:ord.total,
        title:ord.title
    }))

    // console.log(result)

    if(!response){
        res.json({result:"fail"});
    }else{
        res.json({result:"success" , data:result });
}}catch(err){
        res.status(500).json({error:"went wrong"});
    }
    
});


router.post("/cancelorder" , async (req,res)=>{
    
try{
    const prdid = req.body.prdid;

    const response = await userModel.findOneAndUpdate({ "orders._id": prdid},
        {
            $set:{"orders.$.status":"cancelled"}
        });
    if(response){
        res.json({result:"succese"});
    }else{
        res.json({result:"fail"});
}}catch(err){
    res.status(500).json({error:"went wrong"});
}
    
});


//ordersOfUser & mark_as_delivered is moved to admin


module.exports = router;