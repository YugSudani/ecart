const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const {v4 : uuidv4} = require("uuid")
const { setUID , getUID } = require("../services/UIDcenter");

// Receive & Save Upcoming Signup cradentials 
router.post("/signup" , async (req,res)=>{

    try{

        const {name,email,password} = req.body;
        userModel.create({            
            name,
            email,
            password
        });
        res.json({result:"succese"});
    }catch(err){
        res.status(500).json({error:"went wrong"});
    }
});

// receive & Verify Upcoming Login cradentaials
router.post("/login" , async (req,res)=>{

    try{
        const {email,password} = req.body;
        const user = await userModel.findOne({email,password});
        // generate UID only if user Found in DB
        const UID = uuidv4();
        if(user){
           // console.log("UID Generated : "+UID); 
            res.cookie('UID',UID , 
                         {
                          httpOnly: true,
                          secure: true,  // if deployed over https
                          sameSite: 'None',
                          maxAge: 24 * 60 * 60 * 1000
                         });          // set UID in cookies 
            res.json({result:"succese"});
        }else{
            res.json({result:"fail"});
    }

    // set UID in cookies & local map(in database in future) so we can match inside middleware 

        if(UID){
            setUID(UID,user);    //set UID in Local map
        }else{
            alert("UID Not Generated");
    }}catch(err){
        res.status(500).json({error:"went wrong"});
    }

});

router.post("/add_to_cart" , async(req,res)=>{
    // console.log("Adding Item to cart");
    try{
        const { prdid } = req.body;

        // console.log(prdid);
        const UIDCookie = req.cookies?.UID;
        if(!UIDCookie){
            return res.json({result:"loginToProcced"})
        }
        const UIDuserMap = getUID(UIDCookie);
        // console.log(UIDuserMap);
        var _id = UIDuserMap._id;
        
        
        var user = await userModel.findOneAndUpdate({_id}, { $addToSet: { cartPrdID:prdid } });
        if(!user){
            res.json({result:"fail"});
        }else{
            res.json({result:"succese"})
    }}catch(err){
        res.status(500).json({error:"went wrong"});
    }
});


router.get("/pingTEST",async(req,res)=>{
    res.status(500).send('ok')
})




module.exports = router;
