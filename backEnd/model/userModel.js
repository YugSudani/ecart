const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    adrs:{type:String , required:true},
    prds:[{type:String, required:true}],
    total:{type:String , required:true},
    status:{type:String, required:true , default: "pending"},
    title:[{type:String, required:true}]
});

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cartPrdID: [{
        type: String,
    }],
    address:{
        type:String
    },
    orders:[orderSchema]
}, {timestamps :true} );

const userModel = mongoose.model("userModel",userSchema);

module.exports = userModel;

